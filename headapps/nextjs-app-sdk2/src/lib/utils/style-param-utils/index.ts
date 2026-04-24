import { ComponentParams } from '@sitecore-content-sdk/nextjs';

import {
  StyleProperties,
  StylePropertyValues,
  GetValueType,
  ValidElements,
  GetStyleParamRecord,
} from 'lib/utils/style-param-utils/config';

export function parseStyleParams<TElement extends ValidElements>(
  params: ComponentParams | undefined,
  validElements?: TElement[]
): ComponentStyleParams<TElement> {
  const selectedStylesString = params?.Styles?.trim() ?? '';

  const result: ComponentStyleParams<TElement> = {};

  selectedStylesString.split(' ').forEach((rawValue) => {
    const split = rawValue.split(':');

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

export type ComponentStyleParams<TElement extends ValidElements> = {
  [P in TElement]?: GetStyleParamRecord<P>;
};

export type StyleParamRecord<TElement extends ValidElements, TStyleProp extends StyleProperties> = {
  [P in TStyleProp]?: GetValueType<TElement, P>;
};
