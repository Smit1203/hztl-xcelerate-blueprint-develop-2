/**
 * Makes a target element focusable if it's not by setting tabindex to 0, then focus on it.
 * Restores the original tab index after focusing.
 * Use this to move the focus so that tab will go to the next focusable element
 * @param elem The element to focus
 * @param preventScroll prevent scrolling on focus.  Useful if we are doing some other scrolling
 */
export function focusUnfocusableElement(elem?: HTMLElement, preventScroll?: boolean) {
  if (!elem) {
    return;
  }
  const originalTabIndex = elem.tabIndex;
  if (originalTabIndex === -1) {
    // If it's not focusable, make it temporarily focusable
    elem.tabIndex = 0;
  }
  elem.focus({ preventScroll: preventScroll });

  // Then restore the original tab index.
  elem.tabIndex = originalTabIndex;
}
