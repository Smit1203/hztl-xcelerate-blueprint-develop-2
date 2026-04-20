'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollableTabs<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(false);

  const handleScroll = (direction?: 'left' | 'right') => {
    if (containerRef.current) {
      if (direction) {
        const container = containerRef.current;
        const scrollAmount = container.clientWidth;
        const newScrollPosition =
          direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;
        container.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth',
        });
      } else {
        // Just update arrow visibility
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setIsLeftArrowVisible(scrollLeft > 0);
        setIsRightArrowVisible(scrollLeft < scrollWidth - clientWidth - 1);
      }
    }
  };

  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    const onScroll = () => handleScroll();

    checkScrollable();
    handleScroll();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', onScroll);
    }
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      if (container) {
        container.removeEventListener('scroll', onScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return {
    containerRef,
    isScrollable,
    isLeftArrowVisible,
    isRightArrowVisible,
    handleScroll,
  };
}
