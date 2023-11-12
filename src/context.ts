import { createContext, useContext } from "react";
import { NavigationEntry } from "./types";

export const navigationEntryContext = createContext<NavigationEntry[]>([]);

/**
 * Disclaimer: 이 기능은 history stack 내에 중복되는 요소가 없는 상황을 가정하고 동작하도록 구현되어 있습니다.
 */
export const useNavigationEntries = () => {
  return useContext(navigationEntryContext);
};
