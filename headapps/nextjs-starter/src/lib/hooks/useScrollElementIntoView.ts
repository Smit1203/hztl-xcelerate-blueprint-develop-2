// Global
import { useCallback, useEffect, useRef } from 'react';

interface ScrollElementIntoViewOptions {
  /** Since this is a hook, we can't conditionally call it, so we have the option to disable */
  disableScroll?: boolean;
  stickyHeaderId?: string;
  condition?: boolean;
  animationElement?: HTMLElement | null;
  scrollTargetId?: string;
  delay?: number;
  allowScrollOnLoad?: boolean;
}
/**
 * Scrolls an `element` into view.  This can take into account a sticky header,
 *  as well as wait for an element to finish animating if there's a css animation.
 *  It can scroll based on a condition, and/or this hook returns a function to trigger the scroll manually.
 *  See params for details
 * @param element The element to scroll into view
 * @param stickyHeaderId ID of sticky header element, so we can take that height into consideration.
 *    Make sure this element actually has height in the DOM.
 * @param condition When this condition is true, `element` will be scrolled into view automatically
 * @param animationElement If we need to wait for an element to finish animating, pass that here
 * @param delay Optional delay before scrolling.  Prefer to use `animationElement` instead
 * @param allowScrollOnLoad By default, scrolling won't happen on initial load.  If this is true, allow scrolling
 *    immediately on load
 * @returns a function to manually trigger scrolling (recommend passing `false` as `condition` if using, but not required)
 */
export function useScrollElementIntoView<TElement extends HTMLElement>(
  element: TElement | string | null,
  options: ScrollElementIntoViewOptions = {
    disableScroll: false,
    stickyHeaderId: '',
    condition: false,
    animationElement: null,
    delay: 0,
    allowScrollOnLoad: false,
  }
) {
  const {
    disableScroll,
    stickyHeaderId,
    condition,
    scrollTargetId,
    animationElement,
    delay,
    allowScrollOnLoad,
  } = options;
  // Element to scroll to.  This will be positioned absolute with an offset of the header height
  const scrollElementRef = useRef<HTMLDivElement>(undefined);

  useEffect(() => {
    if (disableScroll) {
      return;
    }
    const domElement = typeof element === 'string' ? document.getElementById(element) : element;
    // element from a useRef can be null initially, in which case, don't do anything.
    if (!domElement) {
      return;
    }
    // Element to be scrolled to.  This will be positioned absolute.
    // The `top` will be set right before scrolling happens.
    const scrollElement = document.createElement('div');
    scrollElement.classList.add('absolute', 'left-0');

    if (scrollTargetId) {
      scrollElement.id = scrollTargetId;
    }
    scrollElementRef.current = scrollElement;

    // Need a container that is position relative, so that
    // we can the absolute positioning is relative to this element.
    const container = document.createElement('div');
    container.classList.add('relative');

    container.appendChild(scrollElement);

    // Add the container before our target element so that we scroll to the top of our target element
    domElement.insertAdjacentElement('beforebegin', container);

    return () => {
      container.remove();
    };
  }, [element, disableScroll, scrollTargetId]);

  const scrollToElement = useCallback(() => {
    if (!disableScroll) {
      smoothScrollToElement(
        scrollElementRef.current,
        stickyHeaderId ?? '',
        animationElement,
        delay
      );
    }
  }, [animationElement, delay, disableScroll, stickyHeaderId]);

  // Previous condition so we only scroll if it changed from false to true.
  // If `allowScrollOnLoad` is set, allow scrolling to happen even if `condition` starts out as `true`
  const prevConditon = useRef(allowScrollOnLoad ? false : condition);
  // When condition changes from `false` to `true`, scroll to the element.
  useEffect(() => {
    if (disableScroll) {
      return;
    }

    if (condition && !prevConditon.current) {
      scrollToElement();
    }
    prevConditon.current = condition;
  }, [condition, disableScroll, scrollToElement]);

  return scrollToElement;
}

const smoothScroll = (element: HTMLElement) => {
  element?.scrollIntoView({
    block: 'start',
    inline: 'nearest',
    behavior: 'smooth',
  });
};

export const smoothScrollToElement = (
  scrollElement: HTMLElement | undefined,
  stickyHeaderId?: string,
  animationElement?: HTMLElement | null,
  delay = 0,
  additionalHeight?: number,
  callback?: () => void
) => {
  if (!scrollElement) {
    return;
  }
  // Get the header height
  let height = 0;
  const header = stickyHeaderId && document.getElementById(stickyHeaderId);

  if (header) {
    height = header?.getBoundingClientRect().height || 0;
  }

  if (additionalHeight) {
    height += additionalHeight;
  }

  // Set negative top on our scroll element to account for header
  scrollElement.style.top = `-${height}px`;
  // If we have an animation element, wait for animations to complete before scrolling
  if (animationElement) {
    Promise.all(animationElement.getAnimations().map((anim) => anim.finished)).then(() => {
      smoothScroll(scrollElement);
      if (callback) callback();
    });
  } else {
    // Otherwise just use setTimeout (delay defaults to 0)
    setTimeout(() => {
      smoothScroll(scrollElement);
      if (callback) callback();
    }, delay);
  }
};
