// Local
import {
  CardListStylePropertyValues,
  CardListElements,
  CardListStyleProperties,
  GetCardListValueType,
} from 'lib/utils/style-param-utils/modules/cards';
import {
  CtaStylePropertyValues,
  CtaElements,
  CtaStyleProperties,
  GetCtaValueType,
} from 'lib/utils/style-param-utils/modules/ctas';
import { StyleParamRecord } from 'lib/utils/style-param-utils';

//  ----- Update below if new module added -------

export const StylePropertyValues = [
  ...CtaStylePropertyValues,
  ...CardListStylePropertyValues,
] as const;

export type ValidElements = CtaElements | CardListElements;

export type GetStyleProperties<TElement extends ValidElements> = TElement extends CtaElements
  ? CtaStyleProperties
  : TElement extends CardListElements
    ? CardListStyleProperties
    : StyleProperties;

export type GetValueType<
  TElement extends ValidElements,
  TStyleProp extends StyleProperties,
> = TElement extends CtaElements
  ? GetCtaValueType<TStyleProp>
  : TElement extends CardListElements
    ? GetCardListValueType<TStyleProp>
    : string;

//  ----- No need to update below -------

export type GetStyleParamRecord<TElement extends ValidElements> = StyleParamRecord<
  TElement,
  GetStyleProperties<TElement>
>;

export type StyleProperties = (typeof StylePropertyValues)[number];
