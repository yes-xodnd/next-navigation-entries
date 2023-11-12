import { getRouteChangeType } from "./getRouteChangeType";
import { NavigationEntry, RouteChangeType } from "./types";

describe("getRouteChangeType", () => {
  it("detects INIT", () => {
    const type = getRouteChangeType([], { url: "/", idx: 0 });
    const expectation: RouteChangeType = "INIT";

    expect(type).toBe(expectation);
  });

  it("detects PUSH", () => {
    const entries: NavigationEntry[] = [{ url: "/" }];
    const type = getRouteChangeType(entries, { url: "/products", idx: 1 });
    const expectation: RouteChangeType = "PUSH";

    expect(type).toBe(expectation);
  });

  it("detects REFRESH", () => {
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    const type = getRouteChangeType(entries, { url: "/products/123", idx: 0 });
    const expectation: RouteChangeType = "REFRESH";

    expect(type).toBe(expectation);
  });

  it("detects BACK", () => {
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    const type = getRouteChangeType(entries, { url: "/products", idx: 1 });
    const expectation: RouteChangeType = "BACK";

    expect(type).toBe(expectation);
  });

  it("detects REPLACE", () => {
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    const type = getRouteChangeType(entries, { url: "/products/456", idx: 2 });
    const expectation: RouteChangeType = "REPLACE";

    expect(type).toBe(expectation);
  });

  it("detects BACK to idx 0", () => {
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    const type = getRouteChangeType(entries, { url: "/", idx: 0 });
    const expectation: RouteChangeType = "BACK";

    expect(type).toBe(expectation);
  });

  it("detects PUSH after REFRESH", () => {
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    // idx increase from 0 after refresh
    const type = getRouteChangeType(entries, { url: "/cart", idx: 1 });
    const expectation: RouteChangeType = "PUSH";

    expect(type).toBe(expectation);
  });

  it("detects REPLACE after REFRESH", () => {
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    // idx increase from 0 after refresh
    const type = getRouteChangeType(entries, { url: "/cart", idx: 0 });
    const expectation: RouteChangeType = "REPLACE";

    expect(type).toBe(expectation);
  });
});
