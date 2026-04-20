import { act, renderHook } from '@testing-library/react';
import { useOnRouteChange } from '../useOnRouteChange';
import { usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useOnRouteChange', () => {
  let mockCallback: jest.Mock;
  let originalAdd: typeof window.addEventListener;
  let originalRemove: typeof window.removeEventListener;

  const setRoute = (pathname: string, search = '') => {
    (usePathname as jest.Mock).mockReturnValue(pathname);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(search));
  };

  beforeEach(() => {
    setRoute('/');
    mockCallback = jest.fn();
    originalAdd = window.addEventListener;
    originalRemove = window.removeEventListener;
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.addEventListener = originalAdd;
    window.removeEventListener = originalRemove;
  });

  it('should not fire callback on initial mount', () => {
    renderHook(() => useOnRouteChange(mockCallback));
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should fire callback when pathname changes', () => {
    const { rerender } = renderHook(() => useOnRouteChange(mockCallback));
    setRoute('/about');
    rerender();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should fire callback when search params change', () => {
    setRoute('/search', 'q=one');
    const { rerender } = renderHook(() => useOnRouteChange(mockCallback));
    setRoute('/search', 'q=two');
    rerender();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should subscribe to hashchange event when runOnHashChange is true', () => {
    renderHook(() => useOnRouteChange(mockCallback, undefined, true));
    expect(window.addEventListener).toHaveBeenCalledWith('hashchange', mockCallback);
  });

  it('should not subscribe to hashchange event when runOnHashChange is false', () => {
    renderHook(() => useOnRouteChange(mockCallback, undefined, false));
    expect(window.addEventListener).not.toHaveBeenCalledWith('hashchange', mockCallback);
  });

  it('should unsubscribe from hashchange event on unmount when enabled', () => {
    const { unmount } = renderHook(() => useOnRouteChange(mockCallback, undefined, true));
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('hashchange', mockCallback);
  });

  it('should not unsubscribe from hashchange event on unmount when not enabled', () => {
    const { unmount } = renderHook(() => useOnRouteChange(mockCallback, undefined, false));
    unmount();
    expect(window.removeEventListener).not.toHaveBeenCalledWith('hashchange', mockCallback);
  });

  it('should not fire callback when events array is empty', () => {
    const { rerender } = renderHook(() => useOnRouteChange(mockCallback, []));
    setRoute('/about');
    rerender();
    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should execute callback when hashchange event is triggered', () => {
    let capturedHandler: () => void = () => {};
    window.addEventListener = jest.fn(
      (_event: string, handler: EventListenerOrEventListenerObject) => {
        capturedHandler = handler as () => void;
      }
    );

    renderHook(() => useOnRouteChange(mockCallback, undefined, true));

    act(() => {
      capturedHandler();
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not fire old callback after callback changes', () => {
    const newCallback = jest.fn();
    const { rerender } = renderHook(({ callback }) => useOnRouteChange(callback), {
      initialProps: { callback: mockCallback },
    });

    setRoute('/next');
    rerender({ callback: newCallback });

    expect(mockCallback).not.toHaveBeenCalled();
    expect(newCallback).toHaveBeenCalledTimes(1);
  });
});
