'use client';

import { useState, useEffect, RefObject, useRef } from 'react';

type UseVisibleTagsProps<T> = {
  items: T[];
  maxItems?: number;
  wrapperRef: RefObject<HTMLElement | null>;
};

export const useVisibleTags = <T>({ items, maxItems, wrapperRef }: UseVisibleTagsProps<T>) => {
  const minVisibleCount = maxItems !== undefined ? maxItems : items.length;
  const [visibleCount, setVisibleCount] = useState(Math.min(items?.length, minVisibleCount));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeout = 100;

  useEffect(() => {
    setVisibleCount(Math.min(items.length, minVisibleCount));
  }, [items, minVisibleCount]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      if (!wrapperRef.current) return;

      const children = Array.from(wrapperRef.current.children);
      if (children.length <= 1) return;

      const firstChild = children[0] as HTMLElement;
      const lastChild = children[children.length - 1] as HTMLElement;

      const firstTop = firstChild.getBoundingClientRect().top;
      const lastTop = lastChild.getBoundingClientRect().top;

      if (lastTop > firstTop + 5 && visibleCount > 0) {
        setVisibleCount((prev) => prev - 1);
      }
    }, timeout);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visibleCount, items, wrapperRef]);

  return visibleCount;
};
