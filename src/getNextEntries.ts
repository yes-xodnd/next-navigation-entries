import { HistoryState, NavigationEntry, RouteChangeType } from "./types";

export const getNextEntries = (
  entries: NavigationEntry[],
  historyState: HistoryState,
  routeChangeType: RouteChangeType
): NavigationEntry[] => {
  const currentEntry = { url: historyState.url };

  if (routeChangeType === "INIT") {
    return [currentEntry];
  }

  if (routeChangeType === "PUSH") {
    const nextEntries = entries.slice(0);
    nextEntries.push(currentEntry);

    return nextEntries;
  }

  if (routeChangeType === "REPLACE") {
    const nextEntries = entries.slice(0);
    nextEntries[nextEntries.length - 1] = currentEntry;

    return nextEntries;
  }

  if (routeChangeType === "BACK") {
    const entryIndex = entries.findIndex(
      (entry) => entry.url === currentEntry.url
    );
    const nextEntries = entries.slice(0, entryIndex + 1);

    return nextEntries;
  }

  return entries;
};
