// Global

// Local
import { CardListProps } from 'components/authorable/shared/lists/CardList';
import defaultVideoCardData from '../CarditemVideo/VideoCardItem.mock-data';

const defaultData: CardListProps = {
  rendering: {
    componentName: 'CardList',
    dataSource: 'mock-data',
    placeholders: {
      'cardlist-1': [defaultVideoCardData.rendering],
    },
  },
  params: {
    DynamicPlaceholderId: '1',
    Styles: 'cards:cardsPerRow:1',
  },
};

export const twoCards: CardListProps = {
  ...defaultData,
  rendering: {
    ...defaultData.rendering,
    placeholders: {
      'cardlist-1': [defaultVideoCardData.rendering, defaultVideoCardData.rendering],
    },
  },
  params: {
    ...defaultData.params,
    Styles: 'cards:cardsPerRow:2',
  },
};

export const threeCards: CardListProps = {
  ...defaultData,
  rendering: {
    ...defaultData.rendering,
    placeholders: {
      'cardlist-1': [
        defaultVideoCardData.rendering,
        defaultVideoCardData.rendering,
        defaultVideoCardData.rendering,
      ],
    },
  },
  params: {
    ...defaultData.params,
    Styles: 'cards:cardsPerRow:3',
  },
};

export const fourCards: CardListProps = {
  ...defaultData,
  rendering: {
    ...defaultData.rendering,
    placeholders: {
      'cardlist-1': [
        defaultVideoCardData.rendering,
        defaultVideoCardData.rendering,
        defaultVideoCardData.rendering,
        defaultVideoCardData.rendering,
      ],
    },
  },
  params: {
    ...defaultData.params,
    Styles: 'cards:cardsPerRow:4',
  },
};

export default defaultData;
