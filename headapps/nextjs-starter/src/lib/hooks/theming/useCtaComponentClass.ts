'use client';

import { useBrandAndTheme } from 'lib/context/BrandAndThemeContext';
import { brandMap, BrandType, themeMap, ThemeType, globalMap } from 'lib/themes';
import { useMemo } from 'react';
export type CtaButtonStyle = 'primary' | 'white' | 'tonal';

/** Expected to be a class name that resolves to a button type, e.g. 'component-feature-button-color-1'. */
export type CtaComponentClass = keyof BrandType | keyof ThemeType;

// Mapping of the theme enum to the theme type.

export function useCtaComponentClass(
  ctaComponentClass: CtaComponentClass | undefined
): CtaButtonStyle {
  const { brand, theme } = useBrandAndTheme();

  // Memorize the merged mapping object
  const mapping = useMemo(() => {
    // Merge the global, brand, and theme objects.
    const mergedMapping = {
      ...globalMap.GlobalMode1,
      ...brandMap[brand],
      ...themeMap[theme],
    };

    // Resolve the mapping.
    resolveVariableMapping(mergedMapping);
    return mergedMapping;
  }, [brand, theme]);

  const style =
    (ctaComponentClass ? (mapping[ctaComponentClass] as CtaButtonStyle) : undefined) || 'primary';

  return style;
}
/**
 * Resolves variable references in the mapping to resolve the final value.
 * e.g. var(--general-theme-brand-primary-onBG-bg)
 * @param mapping - The mapping to resolve.
 * @returns The resolved mapping.
 */
function resolveVariableMapping<T extends Record<string, string>>(mapping: T) {
  let changed = false;
  // Max depth to prevent infinite loops.
  let maxDepth = 10;
  do {
    maxDepth--;
    changed = false;
    Object.keys(mapping).forEach((key: keyof T) => {
      const value = mapping[key];
      if (!value) {
        return;
      }
      const match = value.match(/var\(--(.*)\)/)?.[1];
      if (match) {
        mapping[key] = mapping[match as keyof T];
        changed = true;
      }
    });
  } while (changed && maxDepth > 0);
  if (maxDepth <= 0) {
    console.error(mapping);
    throw new Error('Max depth reached for resolving variable references');
  }
}
