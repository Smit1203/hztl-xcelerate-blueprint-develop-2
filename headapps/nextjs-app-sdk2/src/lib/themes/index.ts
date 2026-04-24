/* prettier-ignore */
import { BrandsBrandX } from './_BrandsBrandX';
import { BrandsHelloWorld } from './_BrandsHelloWorld';
import { BrandsMode } from './_BrandsMode';
import { BrandsNimbusGoods } from './_BrandsNimbusGoods';

import { ThemesBrandPrimary } from './_ThemesBrandPrimary';
import { ThemesBrandSecondary } from './_ThemesBrandSecondary';
import { ThemesDark } from './_ThemesDark';
import { ThemesLight } from './_ThemesLight';
import { ThemesWhite } from './_ThemesWhite';

import { GlobalMode1 } from './_GlobalMode1';

export type BrandType = typeof BrandsBrandX;
export type ThemeType = typeof ThemesBrandPrimary;
export type GlobalType = typeof GlobalMode1;

export const brandMap = {
  BrandsBrandX: BrandsBrandX,
  BrandsHelloWorld: BrandsHelloWorld,
  BrandsMode: BrandsMode,
  BrandsNimbusGoods: BrandsNimbusGoods,
};

export const themeMap = {
  ThemesBrandPrimary: ThemesBrandPrimary,
  ThemesBrandSecondary: ThemesBrandSecondary,
  ThemesDark: ThemesDark,
  ThemesLight: ThemesLight,
  ThemesWhite: ThemesWhite,
};

export const globalMap = {
  GlobalMode1: GlobalMode1,
};
