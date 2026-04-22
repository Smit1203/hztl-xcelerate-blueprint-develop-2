'use client';

import clsx from 'clsx';
import {
  createContext,
  HTMLAttributes,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

export type Brands =
  | 'BrandsBrandX'
  | 'BrandsHelloWorld'
  | 'BrandsNimbusGoods';

export type Themes =
  | 'ThemesWhite'
  | 'ThemesLight'
  | 'ThemesDark'
  | 'ThemesBrandPrimary'
  | 'ThemesBrandSecondary';

export type SiteName = string;

export const BRAND_MAPPING: Record<Brands, string[]> = {
  BrandsBrandX: ['BrandX'],
  BrandsHelloWorld: ['HelloWorld'],
  BrandsNimbusGoods: ['Nimbus'],
};

export const ALL_BRANDS = Object.keys(BRAND_MAPPING) as Brands[];

export const THEME_MAPPING: Record<Themes, string[]> = {
  ThemesWhite: ['ThemesWhite'],
  ThemesLight: ['ThemesLight'],
  ThemesDark: ['ThemesDark'],
  ThemesBrandPrimary: ['ThemesBrandPrimary'],
  ThemesBrandSecondary: ['ThemesBrandSecondary'],
};

export const ALL_THEMES = Object.keys(THEME_MAPPING) as Themes[];

export interface BrandAndTheme {
  brand: Brands;
  theme: Themes;
  allowThemeSwitching: boolean;
}

export const DefaultBrand: Brands = ALL_BRANDS[0];
export const DefaultTheme: Themes = ALL_THEMES[0];

export const BrandAndThemeContext = createContext<BrandAndTheme>({
  brand: DefaultBrand,
  theme: DefaultTheme,
  allowThemeSwitching: false,
});

export const useBrandAndTheme = () => useContext(BrandAndThemeContext);

export const getBrandForSiteName = (siteName: SiteName): Brands | undefined =>
  (Object.entries(BRAND_MAPPING).find(([, siteNames]) =>
    siteNames.includes(siteName)
  )?.[0] as Brands | undefined);

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
