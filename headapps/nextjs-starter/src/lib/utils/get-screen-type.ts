// Global
import { useEffect, useState } from 'react';

export type ScreenTypes = 'sm' | 'md' | 'mmd' | 'ml' | 'mml' | 'lg' | 'xl';

export type ScreenSizeProps = {
  screenType: ScreenTypes | null;
  currentScreenWidth: number;
};

const breakpoints: Record<ScreenTypes, number> = {
  xl: 1488,
  lg: 1248,
  mml: 1024,
  ml: 1008,
  mmd: 800,
  md: 672,
  sm: 375,
};

export function useCurrentScreenType() {
  const [screenType, setScreenType] = useState<ScreenSizeProps>({
    screenType: null,
    currentScreenWidth: 0,
  });

  // set screenType on first load
  useEffect(() => {
    setScreenType(getScreenType(window.innerWidth));
  }, []);

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    function handleResize(): void {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (window.innerWidth !== screenType.currentScreenWidth)
          setScreenType(getScreenType(window.innerWidth));
      }, 100);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [screenType]);

  return screenType;
}

export const getScreenType = (currentScreenWidth: number): ScreenSizeProps => {
  if (currentScreenWidth >= 1488) {
    return { screenType: 'xl', currentScreenWidth };
  } else if (currentScreenWidth >= 1248) {
    return { screenType: 'lg', currentScreenWidth };
  } else if (currentScreenWidth >= 1024) {
    return { screenType: 'mml', currentScreenWidth };
  } else if (currentScreenWidth >= 1008) {
    return { screenType: 'ml', currentScreenWidth };
  } else if (currentScreenWidth >= 800) {
    return { screenType: 'mmd', currentScreenWidth };
  } else if (currentScreenWidth >= 672) {
    return { screenType: 'md', currentScreenWidth };
  } else {
    return { screenType: 'sm', currentScreenWidth };
  }
};

export const getBreakpoint = (screenType: ScreenTypes) => {
  return breakpoints[screenType];
};
