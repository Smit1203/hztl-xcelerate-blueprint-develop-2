import { renderHook } from '@testing-library/react';
import { useOnRouteChange } from '../useOnRouteChange';
import { useRouter } from 'next/router';
import { RouterEvent } from 'next/router';
import { act } from '@testing-library/react';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useOnRouteChange', () => {
  let mockRouter: {
    events: {
      on: jest.Mock;
      off: jest.Mock;
      emit: jest.Mock;
    };
  };
  let mockCallback: jest.Mock;

  beforeEach(() => {
    // Setup router mock
    mockRouter = {
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Setup callback mock
    mockCallback = jest.fn();

    // Setup window event listener mocks
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe to routeChangeComplete by default', () => {
    renderHook(() => useOnRouteChange(mockCallback));

    expect(mockRouter.events.on).toHaveBeenCalledWith('routeChangeComplete', mockCallback);
    expect(mockRouter.events.on).toHaveBeenCalledTimes(1);
  });

  it('should subscribe to multiple router events when provided', () => {
    const events: RouterEvent[] = ['routeChangeStart', 'routeChangeComplete', 'routeChangeError'];
    renderHook(() => useOnRouteChange(mockCallback, events));

    events.forEach((event) => {
      expect(mockRouter.events.on).toHaveBeenCalledWith(event, mockCallback);
    });
    expect(mockRouter.events.on).toHaveBeenCalledTimes(events.length);
  });

  it('should subscribe to hashchange event when runOnHashChange is true', () => {
    renderHook(() => useOnRouteChange(mockCallback, undefined, true));

    expect(window.addEventListener).toHaveBeenCalledWith('hashchange', mockCallback);
  });

  it('should not subscribe to hashchange event when runOnHashChange is false', () => {
    renderHook(() => useOnRouteChange(mockCallback, undefined, false));

    expect(window.addEventListener).not.toHaveBeenCalledWith('hashchange', mockCallback);
  });

  it('should unsubscribe from router events on unmount', () => {
    const { unmount } = renderHook(() => useOnRouteChange(mockCallback));

    unmount();

    expect(mockRouter.events.off).toHaveBeenCalledWith('routeChangeComplete', mockCallback);
    expect(mockRouter.events.off).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe from multiple router events on unmount', () => {
    const events: RouterEvent[] = ['routeChangeStart', 'routeChangeComplete', 'routeChangeError'];
    const { unmount } = renderHook(() => useOnRouteChange(mockCallback, events));

    unmount();

    events.forEach((event) => {
      expect(mockRouter.events.off).toHaveBeenCalledWith(event, mockCallback);
    });
    expect(mockRouter.events.off).toHaveBeenCalledTimes(events.length);
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

  it('should resubscribe to events when callback changes', () => {
    const newCallback = jest.fn();
    const { rerender } = renderHook(({ callback }) => useOnRouteChange(callback), {
      initialProps: { callback: mockCallback },
    });

    rerender({ callback: newCallback });

    expect(mockRouter.events.off).toHaveBeenCalledWith('routeChangeComplete', mockCallback);
    expect(mockRouter.events.on).toHaveBeenCalledWith('routeChangeComplete', newCallback);
  });

  it('should resubscribe to events when events array changes', () => {
    const initialEvents: RouterEvent[] = ['routeChangeComplete'];
    const newEvents: RouterEvent[] = ['routeChangeStart', 'routeChangeComplete'];
    const { rerender } = renderHook(({ events }) => useOnRouteChange(mockCallback, events), {
      initialProps: { events: initialEvents },
    });

    rerender({ events: newEvents });

    expect(mockRouter.events.off).toHaveBeenCalledWith('routeChangeComplete', mockCallback);
    newEvents.forEach((event) => {
      expect(mockRouter.events.on).toHaveBeenCalledWith(event, mockCallback);
    });
  });

  it('should handle empty events array', () => {
    renderHook(() => useOnRouteChange(mockCallback, []));

    expect(mockRouter.events.on).not.toHaveBeenCalled();
    expect(mockRouter.events.off).not.toHaveBeenCalled();
  });

  // New tests for callback execution
  it('should execute callback when router event is triggered', () => {
    // Setup event handler capture
    let capturedHandler: () => void = () => {};
    mockRouter.events.on.mockImplementation((_event: string, handler: () => void) => {
      capturedHandler = handler;
    });

    renderHook(() => useOnRouteChange(mockCallback));

    // Simulate router event
    act(() => {
      capturedHandler();
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should execute callback when multiple router events are triggered', () => {
    const events: RouterEvent[] = ['routeChangeStart', 'routeChangeComplete'];
    const capturedHandlers: { [key: string]: () => void } = {};

    mockRouter.events.on.mockImplementation((event: string, handler: () => void) => {
      capturedHandlers[event] = handler;
    });

    renderHook(() => useOnRouteChange(mockCallback, events));

    // Simulate both events being triggered
    act(() => {
      events.forEach((event) => capturedHandlers[event]());
    });

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should execute callback when hashchange event is triggered', () => {
    // Setup event handler capture
    let capturedHandler: () => void = () => {};
    window.addEventListener = jest.fn((_event: string, handler: () => void) => {
      capturedHandler = handler;
    });

    renderHook(() => useOnRouteChange(mockCallback, undefined, true));

    // Simulate hashchange event
    act(() => {
      capturedHandler();
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should execute callback for both router and hashchange events', () => {
    // Setup event handler captures
    let routerHandler: () => void = () => {};
    let hashChangeHandler: () => void = () => {};

    mockRouter.events.on.mockImplementation((_event: string, handler: () => void) => {
      routerHandler = handler;
    });

    window.addEventListener = jest.fn((_event: string, handler: () => void) => {
      hashChangeHandler = handler;
    });

    renderHook(() => useOnRouteChange(mockCallback, ['routeChangeComplete'], true));

    // Simulate both events
    act(() => {
      routerHandler();
      hashChangeHandler();
    });

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  it('should not execute old callback after callback change', () => {
    const newCallback = jest.fn();
    let capturedHandler: () => void = () => {};

    mockRouter.events.on.mockImplementation((_event: string, handler: () => void) => {
      capturedHandler = handler;
    });

    const { rerender } = renderHook(({ callback }) => useOnRouteChange(callback), {
      initialProps: { callback: mockCallback },
    });

    rerender({ callback: newCallback });

    // Simulate event after callback change
    act(() => {
      capturedHandler();
    });

    expect(mockCallback).not.toHaveBeenCalled();
    expect(newCallback).toHaveBeenCalledTimes(1);
  });
});
