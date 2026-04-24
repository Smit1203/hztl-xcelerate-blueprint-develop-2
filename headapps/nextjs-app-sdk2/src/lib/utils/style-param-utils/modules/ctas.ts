import { StyleProperties } from 'lib/utils/style-param-utils/config';

export type CtaElements = 'cta1' | 'cta2';

export const CtaStylePropertyValues = [
  'ctaVariant',
  'ctaIcon',
  'ctaIconAlignment',
  'ctaVisibility',
] as const;

export const CtaVariantValues = ['primary', 'secondary', 'tertiary', 'link'] as const;
export const CtaIconValues = ['arrow-right', 'download'] as const;
export const CtaIconAlignmentValues = ['left', 'right'] as const;
export const CtaVisibilityValues = ['hidden', 'visible'] as const;

export type GetCtaValueType<TStyleProp extends StyleProperties> =
  TStyleProp extends 'ctaIconAlignment'
    ? CtaIconAlignments
    : TStyleProp extends 'ctaIcon'
      ? CtaIcons
      : TStyleProp extends 'ctaVariant'
        ? CtaVariants
        : never;

export type CtaStyleProperties = (typeof CtaStylePropertyValues)[number];
export type CtaVariants = (typeof CtaVariantValues)[number];
export type CtaIcons = (typeof CtaIconValues)[number];
export type CtaIconAlignments = (typeof CtaIconAlignmentValues)[number];
export type CtaVisibility = (typeof CtaVisibilityValues)[number];
