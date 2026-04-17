import { useEffect, useState } from 'react';

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      setIsTablet(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isTablet;
};
