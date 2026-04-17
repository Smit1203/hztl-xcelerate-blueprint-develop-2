// Local
import { StyleProperties } from 'lib/utils/style-param-utils/config';

//  ----- Update below as needed -------

// Valid elements
export type CardListElements = 'cards';

// Valid style properties
export const CardListStylePropertyValues = ['cardsPerRow'] as const;

// Values
export const CardListCardsPerRowValues = ['1', '2', '3', '4'] as const;

// Conditionally determine type based on style property
export type GetCardListValueType<TStyleProp extends StyleProperties> =
  TStyleProp extends 'cardsPerRow' ? CardListCardsPerRows : never;

//  ----- No need to update below -------
export type CardListStyleProperties = (typeof CardListStylePropertyValues)[number];
export type CardListCardsPerRows = (typeof CardListCardsPerRowValues)[number];
