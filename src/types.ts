export type NavigationEntry = {
  url: string;
};

export type RouteChangeType = "INIT" | "PUSH" | "REPLACE" | "BACK" | "REFRESH";

export type HistoryState = {
  url: string;
  idx: number;
};

export type JSONStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};
