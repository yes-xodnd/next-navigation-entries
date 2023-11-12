import { getNextEntries } from "./getNextEntries";
import { NavigationEntry, RouteChangeType } from "./types";

describe("getNextEntries", () => {
  it("returns entries with entry on INIT event", () => {
    const event: RouteChangeType = "INIT";
    const entries: NavigationEntry[] = [];
    const nextEntries = getNextEntries(entries, { url: "/", idx: 0 }, event);
    const expectedEntries: NavigationEntry[] = [{ url: "/" }];

    expect(nextEntries).toEqual(expectedEntries);
  });

  it("returns entries with entry appended on PUSH event", () => {
    const event: RouteChangeType = "PUSH";
    const entries: NavigationEntry[] = [{ url: "/" }];
    const nextEntries = getNextEntries(
      entries,
      { url: "/products", idx: 1 },
      event
    );
    const expectedEntries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
    ];

    expect(nextEntries).toEqual(expectedEntries);
  });

  it("returns entries with last entry replaced on REPLACE event", () => {
    const event: RouteChangeType = "REPLACE";
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];

    const nextEntries = getNextEntries(
      entries,
      { url: "/products/456", idx: 2 },
      event
    );

    const expectedEntries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/456" },
    ];

    expect(nextEntries).toEqual(expectedEntries);
  });

  it("returns sliced entries on BACK event", () => {
    const event: RouteChangeType = "BACK";
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    const nextEntries = getNextEntries(entries, { url: "/", idx: 0 }, event);
    const expectedEntries: NavigationEntry[] = [{ url: "/" }];

    expect(nextEntries).toEqual(expectedEntries);
  });

  it("returns same entries on REFRESH event", () => {
    const event: RouteChangeType = "BACK";
    const entries: NavigationEntry[] = [
      { url: "/" },
      { url: "/products" },
      { url: "/products/123" },
    ];
    const nextEntries = getNextEntries(
      entries,
      { url: "/products/123", idx: 2 },
      event
    );

    expect(nextEntries).toEqual(entries);
  });
});
