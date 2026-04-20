'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getValidChildren } from 'lib/utils/navigation-utils';
import { ContextualNavItemInfo } from 'components/authorable/shared/lists/ContextualNav.graphql';

export const useNavigationState = (
  currentPageId: string,
  ancestors: ContextualNavItemInfo[] = [],
  navigationItems: ContextualNavItemInfo[] = [],
  initialNavExpanded: boolean = true
) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isNavExpanded, setIsNavExpanded] = useState(initialNavExpanded);
  const lastProcessedPageId = useRef<string | null>(null);

  // Memoize ancestors IDs to prevent effect re-runs on ancestor array changes
  const ancestorIds = useMemo(() => ancestors.map((a) => a.id).filter(Boolean), [ancestors]);

  // Memoize navigation item IDs to prevent effect re-runs
  const navigationItemIds = useMemo(
    () => navigationItems.map((item) => item.id),
    [navigationItems]
  );

  // Auto-expand ancestors and current page if it has children
  useEffect(() => {
    // Only re-initialize if the current page has changed
    if (!currentPageId || lastProcessedPageId.current === currentPageId) return;

    const expandedSet = new Set<string>();

    // Expand all ancestors
    ancestorIds.forEach((ancestorId) => {
      if (ancestorId) expandedSet.add(ancestorId);
    });

    // Find and expand current page if it has children
    const findItemWithChildren = (items: ContextualNavItemInfo[], targetId: string): boolean => {
      for (const item of items) {
        if (item.id === targetId) {
          const validChildren = getValidChildren(item);
          if (validChildren.length > 0) {
            return true;
          }
        }

        const children = getValidChildren(item);
        if (findItemWithChildren(children, targetId)) {
          return true;
        }
      }
      return false;
    };

    if (findItemWithChildren(navigationItems, currentPageId)) {
      expandedSet.add(currentPageId);
    }

    setExpandedItems(expandedSet);
    lastProcessedPageId.current = currentPageId;
  }, [currentPageId, ancestorIds, navigationItemIds, navigationItems]);

  const handleItemToggle = useCallback(
    (itemId: string) => {
      setExpandedItems((prev) => {
        const newExpanded = new Set(prev);
        const isCurrent = itemId === currentPageId;

        if (isCurrent) {
          // For current pages: toggle collapsed state using special prefix
          const collapsedKey = `collapsed-${itemId}`;
          const isCurrentlyCollapsed = newExpanded.has(collapsedKey);

          if (isCurrentlyCollapsed) {
            newExpanded.delete(collapsedKey);
          } else {
            newExpanded.add(collapsedKey);
          }
        } else {
          // For non-current pages: normal expand/collapse logic
          const wasExpanded = newExpanded.has(itemId);

          if (wasExpanded) {
            newExpanded.delete(itemId);
          } else {
            newExpanded.add(itemId);
          }
        }

        return newExpanded;
      });
    },
    [currentPageId]
  );

  const handleNavToggle = useCallback(() => {
    setIsNavExpanded((prev) => !prev);
  }, []);

  return {
    expandedItems,
    isNavExpanded,
    handleItemToggle,
    handleNavToggle,
  };
};
