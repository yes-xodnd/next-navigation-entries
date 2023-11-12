import { HistoryState, NavigationEntry, RouteChangeType } from "./types";

export const getRouteChangeType = (
  entries: NavigationEntry[],
  { url, idx }: HistoryState
): RouteChangeType => {
  const lastIdx = entries.length - 1;
  const isInEntries = entries.some((entry) => entry.url === url);

  if (entries.length === 0) {
    return "INIT";
  }

  if (idx === 0) {
    if (entries[lastIdx].url === url) {
      return "REFRESH";
    }
    if (isInEntries) {
      return "BACK";
    }
    return "REPLACE";
  }

  if (idx < lastIdx) {
    if (isInEntries) {
      return "BACK";
    }

    return "PUSH";
  }

  if (idx === lastIdx) {
    return "REPLACE";
  }

  return "PUSH";
};
