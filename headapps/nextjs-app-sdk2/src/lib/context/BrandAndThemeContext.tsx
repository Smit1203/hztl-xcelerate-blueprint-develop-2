'use client';

import clsx from 'clsx';
import {
  createContext,
  HTMLAttributes,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ALL_BRANDS,
  ALL_THEMES,
  BrandAndTheme,
  Brands,
  DefaultBrand,
  DefaultTheme,
  Themes,
} from './brand-theme-constants';

// Re-export so existing imports keep working.
export {
  ALL_BRANDS,
  ALL_THEMES,
  BRAND_MAPPING,
  DefaultBrand,
  DefaultTheme,
  THEME_MAPPING,
  getBrandForSiteName,
} from './brand-theme-constants';
export type { BrandAndTheme, Brands, SiteName, Themes } from './brand-theme-constants';

export const BrandAndThemeContext = createContext<BrandAndTheme>({
  brand: DefaultBrand,
  theme: DefaultTheme,
  allowThemeSwitching: false,
});

export const useBrandAndTheme = () => useContext(BrandAndThemeContext);

type BrandAndThemeProviderProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  brand?: Brands;
  theme?: Themes;
  applyToBody?: boolean;
};

export const BrandAndThemeProvider = ({
  children,
  brand,
  theme,
  applyToBody,
  ...props
}: BrandAndThemeProviderProps) => {
  const [selectedTheme] = useState<Themes | undefined>();
  const [selectedBrand] = useState<Brands | undefined>();
  const parent = useContext(BrandAndThemeContext);

  const effectiveBrand = (selectedBrand || brand) ?? parent.brand ?? DefaultBrand;
  const effectiveTheme = (selectedTheme || theme) ?? parent.theme ?? DefaultTheme;

  const value: BrandAndTheme = {
    brand: effectiveBrand,
    theme: effectiveTheme,
    allowThemeSwitching: parent.allowThemeSwitching ?? false,
  };

  const classes = clsx(props.className, value.brand, value.theme, 'brand-root');

  useLayoutEffect(() => {
    if (!applyToBody) return;
    document.body.classList.remove(...ALL_BRANDS, ...ALL_THEMES);
    document.body.classList.add(value.brand, value.theme, 'brand-root');
  }, [applyToBody, value.brand, value.theme]);

  if (applyToBody) {
    return (
      <BrandAndThemeContext.Provider value={value}>
        {children}
      </BrandAndThemeContext.Provider>
    );
  }

  return (
    <BrandAndThemeContext.Provider value={value}>
      <div {...props} className={classes}>
        {children}
      </div>
    </BrandAndThemeContext.Provider>
  );
};
