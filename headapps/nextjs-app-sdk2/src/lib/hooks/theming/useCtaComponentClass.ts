import { useBrandAndTheme } from 'lib/context/BrandAndThemeContext';
import { brandMap, BrandType, themeMap, ThemeType, globalMap } from 'lib/themes';
import { useMemo } from 'react';

export type CtaButtonStyle = 'primary' | 'white' | 'tonal';

export type CtaComponentClass = keyof BrandType | keyof ThemeType;

export function useCtaComponentClass(
  ctaComponentClass: CtaComponentClass | undefined
): CtaButtonStyle {
  const { brand, theme } = useBrandAndTheme();

  const mapping = useMemo(() => {
    const mergedMapping = {
      ...globalMap.GlobalMode1,
      ...brandMap[brand],
      ...themeMap[theme],
    };

    resolveVariableMapping(mergedMapping);
    return mergedMapping;
  }, [brand, theme]);

  const style =
    (ctaComponentClass ? (mapping[ctaComponentClass] as CtaButtonStyle) : undefined) || 'primary';

  return style;
}

function resolveVariableMapping<T extends Record<string, string>>(mapping: T) {
  let changed = false;
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
