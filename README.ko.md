# Next Navigation Entries

ㅌNext.js 앱에서 브라우저의 히스토리 스택을 상태로 사용할 수 있게 해주는 실험적인 라이브러리입니다.
`navigation-entries`라는 용어는 실험적인 web API인 [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)에서 차용했습니다.

아래의 조건 하에서만 안정적으로 동작합니다.

1. Next.js 앱이 pages 라우터를 사용해야 합니다.
2. 히스토리 스택의 각 요소가 중복되지 않아야 합니다.

```js
const stableEntries = ["/", "/products", "/products/123", "/cart"]; // ok
const unstableEntries = ["/", "/cart", "/products", "/products/123", "/cart"]; // not ok
```

위와 같은 제한사항으로 인해, 웹뷰 앱을 개발할 때만 사용하는 것을 추천합니다.

## Installation

```
yarn add next-navigation-entries
```

또는

```
npm install next-navigation-entries
```

## Usage

먼저 앱을 Provider 컴포넌트로 감싸줍니다.

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

그리고 컴포넌트에서 `useNavigationEntries()` 훅으로 상태를 사용할 수 있습니다.

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
