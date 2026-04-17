// Global
import { SiteName, Brands, Themes } from 'helpers/Constants/Constant';
import { createContext, HTMLAttributes, useContext, useLayoutEffect, useState } from 'react';
import styles from './BrandAndThemeContext.module.scss';
import clsx from 'clsx';

export const BRAND_MAPPING = {
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

export const useBrandAndTheme = () => {
  return useContext(BrandAndThemeContext);
};

export const getBrandForSiteName = (siteName: SiteName) => {
  return Object.entries(BRAND_MAPPING).find(([, siteNames]) =>
    siteNames.includes(siteName)
  )?.[0] as Brands | undefined;
};

type BrandAndThemeProviderProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  /**
   * Optional. The brand to use. Will fallback to the parent brand or the first brand if not provided.
   */
  brand?: Brands;
  /**
   * Optional. The theme to use. Will fallback to the parent theme or the first theme if not provided .
   */
  theme?: Themes;
  /**
   * Optional. Whether to apply the brand and theme to the body element instead.
   * Note: other attributes will be ignored if this is set
   */
  applyToBody?: boolean;
};

const ALLOW_BRAND_THEME_SWITCHING = process.env.NEXT_PUBLIC_ALLOW_BRAND_THEME_SWITCHING === 'true';

export const BrandAndThemeProvider = ({
  children,
  brand,
  theme,
  applyToBody,
  ...props
}: BrandAndThemeProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<Themes>();
  const [selectedBrand, setSelectedBrand] = useState<Brands>();
  const [allowThemeSwitching, setAllowThemeSwitching] = useState<boolean>();
  const parentBrandAndTheme = useContext(BrandAndThemeContext);
  const effectiveBrand = (selectedBrand || brand) ?? parentBrandAndTheme.brand ?? DefaultBrand;
  const effectiveTheme = (selectedTheme || theme) ?? parentBrandAndTheme.theme ?? DefaultTheme;
  const effectiveAllowThemeSwitching =
    allowThemeSwitching ?? parentBrandAndTheme.allowThemeSwitching ?? false;

  const brandAndTheme = {
    brand: effectiveBrand,
    theme: effectiveTheme,
    allowThemeSwitching: effectiveAllowThemeSwitching,
  };

  const classes = clsx(props.className, brandAndTheme.brand, brandAndTheme.theme, 'brand-root');

  // Use LayoutEffect to ensure the body classes are applied immediately after the component is mounted
  useLayoutEffect(() => {
    if (applyToBody) {
      // Clear out other themes in case of theme switching
      document.body.classList.remove(...ALL_BRANDS, ...ALL_THEMES);
      document.body.classList.add(
        ...[brandAndTheme.brand, brandAndTheme.theme, 'brand-root'].filter(Boolean)
      );
    }
  }, [applyToBody, brandAndTheme.brand, brandAndTheme.theme]);

  if (applyToBody) {
    // Don't render an additional div if we're applying to the body
    return (
      <BrandAndThemeContext.Provider value={brandAndTheme}>
        <BrandSelector
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          allowThemeSwitching={allowThemeSwitching}
          setAllowThemeSwitching={setAllowThemeSwitching}
        />
        {children}
      </BrandAndThemeContext.Provider>
    );
  }

  return (
    <BrandAndThemeContext.Provider value={brandAndTheme}>
      <div {...props} className={classes}>
        <ThemeSelector
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          allowThemeSwitching={effectiveAllowThemeSwitching}
        />
        {children}
      </div>
    </BrandAndThemeContext.Provider>
  );
};

function BrandSelector({
  selectedBrand,
  setSelectedBrand,
  allowThemeSwitching,
  setAllowThemeSwitching,
}: {
  selectedBrand: Brands | undefined;
  setSelectedBrand: (brand: Brands) => void;
  allowThemeSwitching?: boolean;
  setAllowThemeSwitching: (allowThemeSwitching: boolean) => void;
}) {
  if (!ALLOW_BRAND_THEME_SWITCHING) return null;
  return (
    <div className={`${styles.brandSelector} printHide`}>
      <div className={styles.selectWrap}>
        <label htmlFor="hyperx-brand-selector">Select a brand:</label>
        <select
          id="hyperx-brand-selector"
          name="hyperx-brand-selector"
          onChange={(e) => setSelectedBrand(e.target.value as Brands)}
          value={selectedBrand}
        >
          <option value=""> -- Default -- </option>
          {ALL_BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.checkboxWrap}>
        <input
          type="checkbox"
          id="hyperx-allow-theme-switching"
          name="hyperx-allow-theme-switching"
          checked={allowThemeSwitching}
          onChange={(e) => setAllowThemeSwitching(e.target.checked)}
        />
        <label htmlFor="hyperx-allow-theme-switching">Allow component theme switching</label>
      </div>
    </div>
  );
}

function ThemeSelector({
  allowThemeSwitching,
  selectedTheme,
  setSelectedTheme,
}: {
  allowThemeSwitching?: boolean;
  selectedTheme: Themes | undefined;
  setSelectedTheme: (theme: Themes) => void;
}) {
  if (!allowThemeSwitching) return null;
  return (
    <div className={styles.themeSelector}>
      <div className={styles.selectWrap}>
        <label htmlFor="hyperx-theme-selector">Select a component theme:</label>
        <select
          id="hyperx-theme-selector"
          name="hyperx-theme-selector"
          onChange={(e) => setSelectedTheme(e.target.value as Themes)}
          value={selectedTheme}
        >
          <option value=""> -- Default -- </option>
          {ALL_THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
