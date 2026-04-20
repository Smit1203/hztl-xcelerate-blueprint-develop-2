'use client';

import { useCallback, useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

export const useIsScrolled = singletonHook(false, () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return isScrolled;
});
