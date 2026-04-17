/**
 * Utility functions to lock and unlock body scroll
 * Prevents the page from scrolling when modals are open
 */

let scrollLockCount = 0;
let originalBodyStyle: string | null = null;
let originalBodyPaddingRight: string | null = null;

/**
 * Locks body scroll by setting overflow: hidden
 * Uses a counter to handle multiple modals
 * Prevents layout shift by compensating for scrollbar width
 */
export const lockBodyScroll = (): void => {
  scrollLockCount++;

  if (scrollLockCount === 1) {
    // Store original body styles
    originalBodyStyle = document.body.style.overflow;
    originalBodyPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.setAttribute('data-scroll-locked', 'true');
  }
};

/**
 * Unlocks body scroll by restoring original overflow
 * Only unlocks when all modals are closed
 */
export const unlockBodyScroll = (): void => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);

  if (scrollLockCount === 0) {
    // Restore original body styles
    document.body.style.overflow = originalBodyStyle || '';
    document.body.style.paddingRight = originalBodyPaddingRight || '';
    document.body.removeAttribute('data-scroll-locked');
    originalBodyStyle = null;
    originalBodyPaddingRight = null;
  }
};

/**
 * Force unlock body scroll (useful for cleanup)
 */
export const forceUnlockBodyScroll = (): void => {
  scrollLockCount = 0;
  document.body.style.overflow = originalBodyStyle || '';
  document.body.style.paddingRight = originalBodyPaddingRight || '';
  document.body.removeAttribute('data-scroll-locked');
  originalBodyStyle = null;
  originalBodyPaddingRight = null;
};

/**
 * Check if body scroll is currently locked
 */
export const isBodyScrollLocked = (): boolean => {
  return scrollLockCount > 0;
};
