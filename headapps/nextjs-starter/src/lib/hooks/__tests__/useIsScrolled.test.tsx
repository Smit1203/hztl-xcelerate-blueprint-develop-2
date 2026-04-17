import { renderHook, act } from '@testing-library/react';
import { useIsScrolled } from '../useIsScrolled';

describe('useIsScrolled', () => {
  let originalScrollY: number;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    // Store original scrollY value
    originalScrollY = window.scrollY;

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Setup spies
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    // Restore original scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: originalScrollY,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Cleanup spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
    jest.clearAllMocks();
  });
  it('should initialize with false when scrollY is 0', () => {
    const { result } = renderHook(() => useIsScrolled());
    expect(result.current).toBe(false);
  });

  it('should return true when scrollY is greater than 0', () => {
    // Set scrollY to a value greater than 0
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    });

    const { result } = renderHook(() => useIsScrolled());

    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should update state when scroll position changes', () => {
    const { result: result1 } = renderHook(() => useIsScrolled());
    expect(result1.current).toBe(false);

    // Simulate scroll down
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result1.current).toBe(true);

    // Simulate scroll back to top
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    const { result: result2 } = renderHook(() => useIsScrolled());
    expect(result2.current).toBe(false);
  });
});
