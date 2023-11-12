# Next Navigation Entries

this is an experimental library for using browser history stack as a react state in Next.js app.
the term `navigation-entries` is from experimental [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API).

this will work stable under specific conditions:

1. your Next.js app uses pages router
2. each element in the browser history stack is not duplicated

```js
const stableEntries = ["/", "/products", "/products/123", "/cart"]; // ok
const unstableEntries = ["/", "/cart", "/products", "/products/123", "/cart"]; // not ok
```

considering its limitations, I would suggest using it for developing a WebView app.

## Installation

```
yarn add next-navigation-entries
```

or

```
npm install next-navigation-entries
```

## Usage

first, wrap your app with provider component.

```jsx
// _app.js
import { NavigationEntriesProvider } from "next-navigation-entries";

const App = ({ Component, pageProps }) => {
  //...
  return (
    <NavigationEntriesProvider>
      <Component {...pageProps} />
    </NavigationEntriesProvider>
  );
};
```

then use the navigation entries as a state with `useNavigationEntries()` hook in component.

```jsx
// BookingCompleteScreen.js
import { useNavigationEntries } from "next-navigation-entries";

const BookingCompleteScreen = () => {
  const entries = useNavigationEntries();

  const goBackToInitialPage = () => {
    const delta = 1 - entries.length;
    history.go(delta);
  };

  return <button onClick={goBackToInitialPage}>back to home</button>;
};
```
