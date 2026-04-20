'use client';

// Global
import { useEffect, useRef, useState } from 'react';

type UseVideoWidthProps = {
  width: string | number;
  height?: string;
};

export const useVideoWidth = ({ width, height }: UseVideoWidthProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportWidth = containerRef.current?.clientWidth;

  const calculateWidth = (widthValue: string | number) => {
    const numericWidth = typeof widthValue === 'string' ? parseInt(widthValue) : widthValue;
    if (
      containerRef.current?.clientWidth &&
      numericWidth &&
      numericWidth > containerRef.current?.clientWidth
    ) {
      return '100%';
    }
    return widthValue;
  };

  const [calculatedWidth, setCalculatedWidth] = useState(() => calculateWidth(width));
  const isFullWidth = calculatedWidth === '100%';
  const calculatedHeight = isFullWidth ? '100%' : height;

  useEffect(() => {
    const handleResize = () => {
      setCalculatedWidth(calculateWidth(width));
    };

    // Call immediately to ensure correct initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, viewportWidth]);

  return {
    containerRef,
    calculatedWidth,
    calculatedHeight,
    isFullWidth,
  };
};
