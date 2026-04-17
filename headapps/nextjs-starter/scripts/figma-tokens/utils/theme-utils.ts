// Global
import { merge } from 'lodash';
import type { Config } from 'tailwindcss';

export const camelize = (s: string) =>
  s.toLowerCase().replace(/[-. ]./g, (x) => x[1].toUpperCase());

export const objectMap = (
  obj: Record<string, unknown>,
  fn: (v: unknown, k: string, i: number) => unknown
) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [camelize(k), fn(v, k, i)]));

export const mergeConfigs = (...configs: ThemeConfig[]) => {
  const merged = configs.reduce((acc, config) => merge({}, acc, config), {});
  const componentColors = Object.fromEntries(
    Object.entries(merged.component ?? {}).filter(([_, val]) => {
      return typeof val === 'string' && /^#|rgb|hsl|^[a-z]+$/i.test(val);
    })
  );

  return {
    ...merged,
    colors: {
      ...(merged.colors ?? {}),
      ...componentColors,
    },
  };
};

export type ThemeConfig = Partial<Config> & ThemeTokens;

export type ThemeTokens = {
  colors?: Record<string, string>;
  spacing?: Record<string, string | number>;
  borderRadius?: Record<string, string | number>;
  fontSize?: Record<string, string>;
  fontFamily?: Record<string, string>;
  fontWeight?: Record<string, string>;
  general?: Record<string, string>;
  component?: Record<string, string | number>;
};
