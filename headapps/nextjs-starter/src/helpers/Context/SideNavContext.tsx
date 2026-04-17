import { ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { createContext, RefObject, useCallback, useContext, useEffect, useState } from 'react';

const SideNavContext = createContext<SideNavContextProps>({
  intersectionEntries: {},
  updateIntersectionEntry: () => {
    /** Placeholder for real function */
  },
});

export function useSideNavContext() {
  return useContext(SideNavContext);
}

export function SideNavContextProvider<TEntry extends ComponentRendering>({
  children,
  entries,
}: SideNavContextProviderProps<TEntry>) {
  const [intersectionEntries, setIntersectionEntries] = useState<SideNavContextData>({});
  const [activeEntry, setActiveEntry] = useState<TEntry>();

  const updateIntersectionEntry = useCallback((uid: string, entry: IntersectionObserverEntry) => {
    setIntersectionEntries((prevState) => {
      return {
        ...prevState,
        [uid]: entry,
      };
    });
  }, []);

  // Watches changes in entries state and updates the active entry
  useEffect(() => {
    for (let i = 0; i < entries.length; i++) {
      const item = entries[i];
      if (item?.uid && intersectionEntries[item.uid]?.isIntersecting) {
        // Sets the first intersection entry as the active one
        setActiveEntry(item);
        return;
      }
    }
  }, [entries, intersectionEntries]);

  return (
    <SideNavContext.Provider
      value={{
        intersectionEntries,
        updateIntersectionEntry,
        activeEntry,
      }}
    >
      {children}
    </SideNavContext.Provider>
  );
}

/**
 *  .
 * Use together with `SideNavContextProvider`
 * Watches the target item to update the activeEntry
 * @param itemRef The ref to the item to watch
 * @param uid The UID of the active entry
 */
export function useWatchSideNavActiveState(
  itemRef: RefObject<HTMLElement>,
  uid: string | undefined
) {
  const { updateIntersectionEntry } = useSideNavContext();

  useEffect(() => {
    if (!uid || !itemRef.current) {
      return;
    }
    const observer = new IntersectionObserver(function ([entry]) {
      updateIntersectionEntry(uid, entry);
    });
    observer.observe(itemRef.current);
    return () => {
      observer.disconnect();
    };
  }, [updateIntersectionEntry, itemRef, uid]);
}

interface SideNavContextProviderProps<TEntry> extends React.PropsWithChildren {
  entries: TEntry[];
}

interface SideNavContextData {
  [id: string]: IntersectionObserverEntry;
}

export interface SideNavContextProps<TEntry extends ComponentRendering = ComponentRendering> {
  intersectionEntries: SideNavContextData;
  updateIntersectionEntry: (uid: string, entry: IntersectionObserverEntry) => void;

  activeEntry?: TEntry;
}
