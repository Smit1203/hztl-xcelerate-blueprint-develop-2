import { renderHook } from '@testing-library/react';
import useClickOutside from '../useClickOutside';

describe('useOutsideClick', () => {
  let container: HTMLDivElement;
  let insideElement: HTMLButtonElement;
  let outsideElement: HTMLButtonElement;
  let callback: jest.Mock;

  beforeEach(() => {
    // Setup DOM elements
    container = document.createElement('div');
    insideElement = document.createElement('button');
    outsideElement = document.createElement('button');
    container.appendChild(insideElement);
    document.body.appendChild(container);
    document.body.appendChild(outsideElement);

    // Setup spy
    callback = jest.fn();
  });

  afterEach(() => {
    // Cleanup DOM elements
    container.remove();
    outsideElement.remove();
    jest.clearAllMocks();
  });

  it('should not add mousedown event listener when condition is false', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const ref = { current: container };

    renderHook(() => useClickOutside(ref, false, callback));

    expect(addEventListenerSpy).not.toHaveBeenCalledWith('mousedown', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('should add event listener when condition is true', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const ref = { current: container };

    renderHook(() => useClickOutside(ref, true, callback));

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('should call callback when clicking outside the element', () => {
    const ref = { current: container };

    renderHook(() => useClickOutside(ref, true, callback));

    // Simulate click outside
    outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when clicking inside the element', () => {
    const ref = { current: container };

    renderHook(() => useClickOutside(ref, true, callback));

    // Simulate click inside
    insideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should remove event listener when condition changes from true to false', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const ref = { current: container };

    const { rerender } = renderHook(({ condition }) => useClickOutside(ref, condition, callback), {
      initialProps: { condition: true },
    });

    rerender({ condition: false });

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const ref = { current: container };

    const { unmount } = renderHook(() => useClickOutside(ref, true, callback));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('should handle null ref', () => {
    const ref = { current: null };

    renderHook(() => useClickOutside(ref, true, callback));

    // Simulate click outside
    outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    // Should not throw and callback should not be called
    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle ref changing after initialization', () => {
    const newContainer = document.createElement('div');
    document.body.appendChild(newContainer);

    try {
      const ref = { current: container };

      renderHook(() => useClickOutside(ref, true, callback));

      // Change ref
      ref.current = newContainer;

      // Click outside new container
      outsideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

      expect(callback).toHaveBeenCalledTimes(1);

      // Click inside new container
      newContainer.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

      expect(callback).toHaveBeenCalledTimes(1); // Still 1, no new calls
    } finally {
      newContainer.remove();
    }
  });
});
