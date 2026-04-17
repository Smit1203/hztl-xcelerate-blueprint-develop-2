// Local
import { StyleProperties } from 'lib/utils/style-param-utils/config';

//  ----- Update below as needed -------

// Valid elements
export type CtaElements = 'cta1' | 'cta2';

// Valid style properties
export const CtaStylePropertyValues = [
  'ctaVariant',
  'ctaIcon',
  'ctaIconAlignment',
  'ctaVisibility',
] as const;

// Values
export const CtaVariantValues = ['primary', 'secondary', 'tertiary', 'link'] as const;
export const CtaIconValues = ['arrow-right', 'download'] as const;
export const CtaIconAlignmentValues = ['left', 'right'] as const;
export const CtaVisibilityValues = ['hidden', 'visible'] as const;

// Conditionally determine type based on style property
export type GetCtaValueType<TStyleProp extends StyleProperties> =
  TStyleProp extends 'ctaIconAlignment'
    ? CtaIconAlignments
    : TStyleProp extends 'ctaIcon'
      ? CtaIcons
      : TStyleProp extends 'ctaVariant'
        ? CtaVariants
        : never;

//  ----- No need to update below -------
export type CtaStyleProperties = (typeof CtaStylePropertyValues)[number];
export type CtaVariants = (typeof CtaVariantValues)[number];
export type CtaIcons = (typeof CtaIconValues)[number];
export type CtaIconAlignments = (typeof CtaIconAlignmentValues)[number];
export type CtaVisibility = (typeof CtaVisibilityValues)[number];
