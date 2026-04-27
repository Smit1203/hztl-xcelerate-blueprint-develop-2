// Server-safe constants for the brand/theme system.
// Kept separate from BrandAndThemeContext.tsx (which is `'use client'`) so
// these can be imported from server components like app/layout.tsx.

export type Brands = 'BrandsBrandX' | 'BrandsHelloWorld' | 'BrandsNimbusGoods';

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

export const THEME_MAPPING: Record<Themes, string[]> = {
  ThemesWhite: ['ThemesWhite'],
  ThemesLight: ['ThemesLight'],
  ThemesDark: ['ThemesDark'],
  ThemesBrandPrimary: ['ThemesBrandPrimary'],
  ThemesBrandSecondary: ['ThemesBrandSecondary'],
};

export const ALL_BRANDS = Object.keys(BRAND_MAPPING) as Brands[];
export const ALL_THEMES = Object.keys(THEME_MAPPING) as Themes[];

export const DefaultBrand: Brands = ALL_BRANDS[0];
export const DefaultTheme: Themes = ALL_THEMES[0];

export interface BrandAndTheme {
  brand: Brands;
  theme: Themes;
  allowThemeSwitching: boolean;
}

export const getBrandForSiteName = (siteName: SiteName): Brands | undefined =>
  (Object.entries(BRAND_MAPPING).find(([, siteNames]) =>
    siteNames.includes(siteName)
  )?.[0] as Brands | undefined);
