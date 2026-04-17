import { useEffect, useState } from 'react';
import { singletonHook } from 'react-singleton-hook';

export const useIsScrollLocked = singletonHook(false, () => {
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsScrollLocked(document.body.hasAttribute('data-scroll-locked'));
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isScrollLocked;
});
