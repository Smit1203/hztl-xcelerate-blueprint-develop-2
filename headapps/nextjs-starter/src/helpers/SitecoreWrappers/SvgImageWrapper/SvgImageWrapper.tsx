'use client';

import React, { useEffect, useState } from 'react';
import { normalizeImageUrl } from '../ImageWrapper/ImageWrapper';
import { useSvgCache } from 'lib/hooks/sitecore/context';
export interface SvgImageWrapperProps {
  src: string; // URL or path to the SVG
  fallback?: React.ReactNode; // Shown while loading or on error
  alt?: string; // Accessible label
  className?: string; // CSS classes
  sanitize?: boolean; // Enable basic built-in sanitization
}

export const SvgImageWrapper: React.FC<SvgImageWrapperProps> = ({
  src,
  fallback = null,
  alt = '',
  className = '',
  sanitize = true,
}) => {
  const [error, setError] = useState<boolean>(false);

  const svgCache = useSvgCache();

  const normalizedSrc = normalizeImageUrl(src);

  const [svgHtml, setSvgHtml] = useState<string | null>(svgCache?.[normalizedSrc ?? ''] ?? null);

  useEffect(() => {
    const setSvg = async () => {
      if (!normalizedSrc) {
        setError(true);
        setSvgHtml(null);
        return;
      }
      let svgText = svgCache?.[normalizedSrc] ?? (await fetchSvg());

      if (svgText) {
        if (sanitize) {
          svgText = sanitizeHtml(svgText, className);
        }
        setSvgHtml(svgText);
      } else {
        setError(true);
        setSvgHtml(null);
      }
    };
    const fetchSvg = async () => {
      try {
        if (!normalizedSrc) {
          setError(true);
          setSvgHtml(null);
          return;
        }
        const response = await fetch(normalizedSrc);
        if (!response.ok || !response.headers.get('content-type')?.includes('image/svg')) {
          throw new Error('Invalid SVG file or blocked');
        }

        const svgText = await response.text();

        return svgText;
      } catch (err) {
        console.error('Error loading SVG:', err);
        return null;
      }
    };

    if (!svgHtml) {
      setSvg();
    }
  }, [sanitize, className, svgCache, normalizedSrc, svgHtml]);

  if (error || !svgHtml) {
    return <div className={className}>{fallback}</div>;
  }

  return <div role="img" aria-label={alt} dangerouslySetInnerHTML={{ __html: svgHtml }} />;
};
function sanitizeHtml(svgText: string | null | undefined, className: string) {
  return (
    svgText
      ?.replace(/fill=".*?"/g, 'fill="currentColor"')
      .replace(/fill-rule=/gi, 'fillRule=')
      .replace(/clip-rule=/gi, 'clipRule=')
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/on\w+=".*?"/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/<svg([^>]+)?/i, `<svg$1 class="${className}"`)
      .replace(/<path([^>]*?)\/?>/gi, (_match, attrs) => {
        return `<path${attrs} class="${className}" />`;
      }) ?? ''
  );
}
