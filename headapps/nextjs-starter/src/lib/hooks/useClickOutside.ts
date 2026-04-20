'use client';

// Global
import { useEffect, RefObject, useCallback } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  condition: boolean,
  callback: () => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    if (condition) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [condition, handleClickOutside]);
};

export default useClickOutside;
