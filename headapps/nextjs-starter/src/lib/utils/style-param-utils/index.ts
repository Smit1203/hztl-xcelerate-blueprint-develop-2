// Global
import { ComponentParams } from '@sitecore-content-sdk/nextjs';

// Local
import {
  StyleProperties,
  StylePropertyValues,
  GetValueType,
  ValidElements,
  GetStyleParamRecord,
} from 'lib/utils/style-param-utils/config';

/**
 * This function parses and looks for styles matching the format `[element?]:[styleType]:[value]`. 
 * @example
 *    // Assuming you have styles coming back from sitecore like
 *    props.params.Styles === 'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta2:ctaVariant:secondary cardsPerRow:1'
 *    // Parse the styles
 *    const styles = parseStyleParams(props.params, ['cta1', 'cta2']);
 *    // Get data
 *    const cardsPerRow = styles.default.cardsPerRow;
 *    // In the component body:
 *    <LinkWrapper field={props.fields?.cta1Link}
              ctaStyle={styles.cta1}
              // or
              ctaVariant={styles.cta1.ctaVariant}
              ctaIcon={styles.cta1.ctaIcon}
              ctaIconAlignment={styles.cta1.ctaIconAlignment}
            />
      <LinkWrapper field={props.fields?.cta2Link}
              ctaStyle={styles.cta2}
              // or
              ctaVariant={styles.cta2.ctaVariant}
              ctaIcon={styles.cta2.ctaIcon}
              ctaIconAlignment={styles.cta2.ctaIconAlignment}
            />
 * @param params The rendering params
 * @param validElements The valid elements to look for in the styles, e.g. for the case above you would pass ['cta1', 'cta2']
 * @returns an object that encapsultes the styles in this rendering.
 * e.g. with the above style, you can use `result.cta1.ctaVariant` and would get the correct typing.
 */
export function parseStyleParams<TElement extends ValidElements>(
  params: ComponentParams | undefined,
  validElements?: TElement[]
): ComponentStyleParams<TElement> {
  const selectedStylesString = params?.Styles?.trim() ?? '';

  const result: ComponentStyleParams<TElement> = {};

  selectedStylesString.split(' ').forEach((rawValue) => {
    const split = rawValue.split(':');

    // This is not one of our styles
    if (split.length != 3) {
      return;
    }

    const targetElement: TElement = split[0] as TElement;

    const styleType = split[1] as StyleProperties;

    const value = split[2];

    if (!StylePropertyValues.includes(styleType)) {
      console.warn(
        `Unknown styleType ${styleType}, expected one of ${JSON.stringify(StylePropertyValues)}`
      );
    }

    if (validElements && !validElements.includes(targetElement)) {
      console.warn(
        `Unknown target element ${targetElement}, expected one of ${JSON.stringify(validElements)}`
      );
    }

    const typedValue = value as GetValueType<TElement, typeof styleType>;
    result[targetElement] = {
      ...result[targetElement],
      [styleType]: typedValue,
    };
  });

  return result;
}

/**
 * Strongly typed version of styles divided into elements.
 * @example
 * // CtaAndCards1 and CtaAndCards2 are the same
 * type CtaAndCards1 = ComponentStyleParams<'cta1' | 'cards'>;
 * type CtaAndCards2 = {
 *  cta1: {
 *    ctaIcon: CtaIcons;
 *    ctaIconAlignment: CtaIconAlignments;
 *    ctaVariant: CtaVariants;
 *  };
 *  cards: {
 *    cardsPerRow: CardListCardsPerRows;
 *  };
 * };
 */
export type ComponentStyleParams<TElement extends ValidElements> = {
  [P in TElement]?: GetStyleParamRecord<P>;
};

/**
 * Strongly typed version of styles for a specific element and set of styles
 * @example
 * // CtaStyles1 and CtaStyles2 are the same
 * type CtaStyles1 = StyleParamRecord<'cta1', 'ctaIcon' | 'ctaIconAlignment' | 'ctaVariant'>;
 * type CtaStyles2 = {
 *    ctaIcon: CtaIcons;
 *    ctaIconAlignment: CtaIconAlignments;
 *    ctaVariant: CtaVariants;
 * };
 * // CardStyles1 and CardStyles2 are the same
 * type CardStyles1 = StyleParamRecord<'cards', 'cardsPerRow'>;
 * type CardStyles2 = {
 *    cardsPerRow: CardListCardsPerRows;
 * };
 */
export type StyleParamRecord<TElement extends ValidElements, TStyleProp extends StyleProperties> = {
  [P in TStyleProp]?: GetValueType<TElement, P>;
};
