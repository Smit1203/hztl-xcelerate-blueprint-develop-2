import { CtaVariants } from 'lib/utils/style-param-utils/modules/ctas';

interface CtaStyle {
  ctaVariant?: CtaVariants;
}

const getCtaStyle = (ctaStyle: CtaStyle = {}, defaultVariant: CtaVariants) => {
  return {
    ...ctaStyle,
    ctaVariant: ctaStyle?.ctaVariant ?? defaultVariant,
  };
};

export { getCtaStyle };
