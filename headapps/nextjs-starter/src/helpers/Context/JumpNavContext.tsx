'use client';

import { ComponentRendering } from '@sitecore-content-sdk/nextjs';
import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

// Add custom hook to get header height
export function useMainHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header');
      if (header) {
        const height = header.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);

    // Update on scroll (in case header height changes on scroll)
    window.addEventListener('scroll', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('scroll', updateHeaderHeight);
    };
  }, []);

  return headerHeight;
}

const JumpNavContext = createContext<JumpNavContextProps>({
  intersectionEntries: {},
  updateIntersectionEntry: () => {
    /** Placeholder for real function */
  },
  forceSetActiveEntry: () => {
    /** Placeholder for real function */
  },
});

export function useJumpNavContext() {
  return useContext(JumpNavContext);
}

export function JumpNavContextProvider<TEntry extends ComponentRendering>({
  children,
  entries,
}: JumpNavContextProviderProps<TEntry>) {
  const [intersectionEntries, setIntersectionEntries] = useState<JumpNavContextData>({});
  const [activeEntry, setActiveEntry] = useState<TEntry>(entries[0]);
  const [isLockedWhenClickLink, setIsLockedWhenClickLink] = useState(false);
  const lockedUid = useRef<string | null>(null);
  const hasScrolled = useRef(false);

  const updateIntersectionEntry = useCallback((uid: string, entry: IntersectionObserverEntry) => {
    setIntersectionEntries((prevState) => {
      return {
        ...prevState,
        [uid]: entry,
      };
    });
  }, []);

  const forceSetActiveEntry = useCallback(
    (uid: string) => {
      const entry = entries.find((item) => item.uid === uid);
      if (entry) {
        setActiveEntry(entry);
        setIsLockedWhenClickLink(true);
        lockedUid.current = uid;
        hasScrolled.current = true;
      }
    },
    [entries]
  );

  // Watches changes in entries state and updates the active entry
  useEffect(() => {
    // Don't update active entry if we're locked (clicked a link)
    if (isLockedWhenClickLink) return;
    // Don't update if we haven't scrolled yet and have an active entry
    if (!hasScrolled.current && activeEntry) return;

    let activeSection: TEntry | undefined;
    const viewportMiddle = window.innerHeight / 2;

    for (let i = 0; i < entries.length; i++) {
      const item = entries[i];
      if (item?.uid && intersectionEntries[item.uid]) {
        const entry = intersectionEntries[item.uid];
        const header = document.getElementById('jumpnav-header-' + item.uid);
        const headerHeight = header ? header.getBoundingClientRect().height - 50 : 0;

        // Get the section's position relative to the viewport
        const sectionTop = entry.boundingClientRect.top - headerHeight;
        const sectionBottom = entry.boundingClientRect.bottom - headerHeight;

        // Check if the middle of the viewport is within this section
        if (sectionTop <= viewportMiddle && sectionBottom >= viewportMiddle) {
          activeSection = item;
          break;
        }
      }
    }
    if (activeSection) {
      setActiveEntry(activeSection);
      hasScrolled.current = true;
    }
  }, [entries, intersectionEntries, isLockedWhenClickLink, activeEntry]);

  // Listen for scroll end
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      hasScrolled.current = true;
      if (isLockedWhenClickLink) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsLockedWhenClickLink(false);
          lockedUid.current = null;
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isLockedWhenClickLink]);

  return (
    <JumpNavContext.Provider
      value={{
        intersectionEntries,
        updateIntersectionEntry,
        activeEntry,
        forceSetActiveEntry,
      }}
    >
      {children}
    </JumpNavContext.Provider>
  );
}

/**
 *  .
 * Use together with `JumpNavContextProvider`
 * Watches the target item to update the activeEntry
 * @param itemRef The ref to the item to watch
 * @param uid The UID of the active entry
 */
export function useWatchJumpNavActiveState(
  itemRef: RefObject<HTMLElement | null>,
  uid: string | undefined,
  headerId: string
) {
  const { updateIntersectionEntry } = useJumpNavContext();

  useEffect(() => {
    if (!uid || !itemRef.current) {
      return;
    }

    const handleScroll = () => {
      const element = itemRef.current;
      if (!element) return;

      const header = document.getElementById(headerId);
      const headerHeight = header ? header.getBoundingClientRect().height - 50 : 0;

      const rect = element.getBoundingClientRect();
      const isInView = rect.top <= headerHeight && rect.bottom >= 0;

      // Create a mock IntersectionObserverEntry
      const entry = {
        boundingClientRect: rect,
        intersectionRatio: isInView ? 1 : 0,
        intersectionRect: isInView ? rect : new DOMRect(),
        isIntersecting: isInView,
        rootBounds: null,
        target: element,
        time: Date.now(),
      } as IntersectionObserverEntry;

      updateIntersectionEntry(uid, entry);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateIntersectionEntry, itemRef, uid, headerId]);
}

interface JumpNavContextProviderProps<TEntry> extends React.PropsWithChildren {
  entries: TEntry[];
}

interface JumpNavContextData {
  [id: string]: IntersectionObserverEntry;
}

export interface JumpNavContextProps<TEntry extends ComponentRendering = ComponentRendering> {
  intersectionEntries: JumpNavContextData;
  updateIntersectionEntry: (uid: string, entry: IntersectionObserverEntry) => void;
  activeEntry?: TEntry;
  forceSetActiveEntry: (uid: string) => void;
}
