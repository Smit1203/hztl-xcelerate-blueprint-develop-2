import { StyleProperties } from 'lib/utils/style-param-utils/config';

export type CardListElements = 'cards';

export const CardListStylePropertyValues = ['cardsPerRow'] as const;

export const CardListCardsPerRowValues = ['1', '2', '3', '4'] as const;

export type GetCardListValueType<TStyleProp extends StyleProperties> =
  TStyleProp extends 'cardsPerRow' ? CardListCardsPerRows : never;

export type CardListStyleProperties = (typeof CardListStylePropertyValues)[number];
export type CardListCardsPerRows = (typeof CardListCardsPerRowValues)[number];
