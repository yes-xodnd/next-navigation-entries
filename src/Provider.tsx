import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { getRouteChangeType } from "./getRouteChangeType";
import { HistoryState, NavigationEntry } from "./types";
import { getNextEntries } from "./getNextEntries";
import { createPersister } from "./createPersister";
import { navigationEntryContext as context } from "./context";

export const NavigationEntriesProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const persister = useRef(
    typeof window === "undefined"
      ? null
      : createPersister<NavigationEntry[]>("navigation-entries", sessionStorage)
  );
  const [entries, setEntries] = useState<NavigationEntry[]>(
    persister.current?.restore() || []
  );

  useEffect(() => {
    const handleRouteChange = () => {
      setEntries((entries) => {
        const historyState = history.state as HistoryState;
        const routeChangeType = getRouteChangeType(entries, historyState);
        const nextEntries = getNextEntries(
          entries,
          historyState,
          routeChangeType
        );
        persister.current?.save(nextEntries);
        return nextEntries;
      });
    };

    router.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, entries, setEntries]);

  return <context.Provider value={entries}>{children}</context.Provider>;
};
