import { renderHook, act } from '@testing-library/react';
import { useScrollElementIntoView } from '../useScrollElementIntoView';

describe('useScrollElementIntoView', () => {
  let targetElement: HTMLDivElement;
  let stickyHeader: HTMLDivElement;
  let animationElement: HTMLDivElement;
  let scrollIntoViewMock: jest.Mock;

  beforeEach(() => {
    // Mock setTimeout to execute immediately
    jest.spyOn(window, 'setTimeout').mockImplementation((fn) => {
      if (typeof fn === 'function') fn();
      return {
        clear: jest.fn(),
      } as unknown as NodeJS.Timeout;
    });

    // Create test elements
    targetElement = document.createElement('div');
    targetElement.id = 'target';
    document.body.appendChild(targetElement);

    stickyHeader = document.createElement('div');
    stickyHeader.id = 'header';
    document.body.appendChild(stickyHeader);

    animationElement = document.createElement('div');
    document.body.appendChild(animationElement);

    // Mock scrollIntoView
    scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    // Mock getComputedStyle
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      position: 'fixed',
    } as CSSStyleDeclaration);

    // Mock getBoundingClientRect
    jest.spyOn(stickyHeader, 'getBoundingClientRect').mockReturnValue({
      height: 100,
    } as DOMRect);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should create a scroll element before the target element', () => {
    renderHook(() => useScrollElementIntoView(targetElement, {}));

    const container = targetElement.previousElementSibling;
    expect(container).toBeTruthy();
    expect(container?.classList.contains('relative')).toBe(true);

    const scrollElement = container?.firstElementChild;
    expect(scrollElement?.classList.contains('absolute')).toBe(true);
    expect(scrollElement?.classList.contains('left-0')).toBe(true);
  });

  it('should set scroll target ID if provided', () => {
    renderHook(() => useScrollElementIntoView(targetElement, { scrollTargetId: 'scroll-target' }));

    const scrollElement = targetElement.previousElementSibling?.firstElementChild;
    expect(scrollElement?.id).toBe('scroll-target');
  });

  it('should not create scroll element if disableScroll is true', () => {
    renderHook(() => useScrollElementIntoView(targetElement, { disableScroll: true }));

    const container = targetElement.previousElementSibling;
    expect(container).toBeFalsy();
  });

  it('should scroll to element when condition changes from false to true', async () => {
    const { rerender } = renderHook(
      ({ condition }) =>
        useScrollElementIntoView(targetElement, {
          condition,
          stickyHeaderId: 'header',
        }),
      { initialProps: { condition: false } }
    );

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
    await act(async () => {
      rerender({ condition: true });
    });
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  });

  it('should account for sticky header height when scrolling', async () => {
    await act(async () => {
      renderHook(() =>
        useScrollElementIntoView(targetElement, {
          stickyHeaderId: 'header',
          condition: true,
          allowScrollOnLoad: true,
        })
      );
    });

    const scrollElement = targetElement.previousElementSibling?.firstElementChild as HTMLElement;
    expect(scrollElement?.style.top).toBe('-100px'); // Header height is mocked to 100px
  });

  it('should not scroll on initial load by default', () => {
    renderHook(() => useScrollElementIntoView(targetElement, { condition: true }));
    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  it('should scroll on initial load if allowScrollOnLoad is true', async () => {
    await act(async () => {
      renderHook(() =>
        useScrollElementIntoView(targetElement, {
          condition: true,
          allowScrollOnLoad: true,
        })
      );
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it('should wait for animation to complete before scrolling', async () => {
    const animationFinished = Promise.resolve();
    const getAnimationsMock = jest.fn().mockReturnValue([{ finished: animationFinished }]);
    animationElement.getAnimations = getAnimationsMock;

    await act(async () => {
      renderHook(() =>
        useScrollElementIntoView(targetElement, {
          condition: true,
          allowScrollOnLoad: true,
          animationElement,
        })
      );
      await animationFinished;
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it('should handle string element ID', () => {
    renderHook(() => useScrollElementIntoView('target', {}));

    const container = targetElement.previousElementSibling;
    expect(container).toBeTruthy();
  });

  it('should return a function to manually trigger scrolling', async () => {
    const { result } = renderHook(() => useScrollElementIntoView(targetElement, {}));

    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    await act(async () => {
      result.current();
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it('should cleanup scroll element on unmount', () => {
    const { unmount } = renderHook(() => useScrollElementIntoView(targetElement, {}));

    const container = targetElement.previousElementSibling;
    expect(container).toBeTruthy();

    unmount();
    expect(targetElement.previousElementSibling).toBeFalsy();
  });
});
