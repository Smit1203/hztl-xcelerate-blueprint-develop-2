import { useState, useEffect, useRef } from 'react';

type UseTooltipVisibilityParams = {
  wrapperRef: React.RefObject<HTMLElement | null>;
  tooltipRef: React.RefObject<HTMLElement | null>;
  timeout?: number;
};

export const useTooltipVisibility = ({
  wrapperRef,
  tooltipRef,
  timeout = 5000,
}: UseTooltipVisibilityParams) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showTooltip, wrapperRef, tooltipRef]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (showTooltip && !isHovering) {
      timerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, timeout);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showTooltip, isHovering, timeout]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!wrapperRef.current?.contains(next) && !tooltipRef.current?.contains(next)) {
      setShowTooltip(false);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return {
    showTooltip,
    setShowTooltip,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  };
};
