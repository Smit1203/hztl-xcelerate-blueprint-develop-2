// Local
import { CardListProps } from 'components/authorable/shared/lists/CardList';
import {
  CardItemA,
  CardItemB,
  CardItemC,
} from 'stories/components/authorable/shared/lists/CardItem/CardItem.mock-data';

const defaultData: CardListProps = {
  params: {
    DynamicPlaceholderId: '1',
    Styles: 'cards:cardsPerRow:3',
  },
  rendering: {
    componentName: 'Card List',
    dataSource: 'Storybook',
    placeholders: {
      'cardlist-1': [CardItemA.rendering, CardItemB.rendering, CardItemC.rendering],
    },
  },
};

export const oneColData: CardListProps = {
  params: {
    DynamicPlaceholderId: '1',
    Styles: 'cards:cardsPerRow:1',
  },
  rendering: {
    componentName: 'Card List',
    dataSource: 'Storybook',
    placeholders: {
      'cardlist-1': [CardItemA.rendering],
    },
  },
};

export const twoColData: CardListProps = {
  params: {
    DynamicPlaceholderId: '1',
    Styles: 'cards:cardsPerRow:2',
  },
  rendering: {
    componentName: 'Card List',
    dataSource: 'Storybook',
    placeholders: {
      'cardlist-1': [CardItemA.rendering, CardItemB.rendering],
    },
  },
};

export const threeColData: CardListProps = {
  params: {
    DynamicPlaceholderId: '1',
    Styles: 'cards:cardsPerRow:3',
  },
  rendering: {
    componentName: 'Card List',
    dataSource: 'Storybook',
    placeholders: {
      'cardlist-1': [CardItemA.rendering, CardItemB.rendering, CardItemC.rendering],
    },
  },
};

export const fourColData: CardListProps = {
  params: {
    DynamicPlaceholderId: '1',
    Styles: 'cards:cardsPerRow:4',
  },
  rendering: {
    componentName: 'Card List',
    dataSource: 'Storybook',
    placeholders: {
      'cardlist-1': [
        CardItemA.rendering,
        CardItemB.rendering,
        CardItemC.rendering,
        CardItemA.rendering,
      ],
    },
  },
};

export default defaultData;
