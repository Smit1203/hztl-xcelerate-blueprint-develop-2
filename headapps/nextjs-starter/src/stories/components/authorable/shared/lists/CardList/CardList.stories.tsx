// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, CardListProps } from 'components/authorable/shared/lists/CardList';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  fourColData,
  oneColData,
  threeColData,
  twoColData,
} from 'stories/components/authorable/shared/lists/CardList/CardList.mock-data';

const meta: Meta<CardListProps> = {
  argTypes: {
    'params.cardsPerRow': {
      table: {
        category: 'params',
      },
    },
    'params.DynamicPlaceholderId': {
      table: {
        category: 'params',
      },
    },
    'rendering.componentName': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.dataSource': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.placeholders.cardlist-1': {
      table: {
        category: 'rendering',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: Default,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Card List component displays a collection of individual cards, each representing distinct content or actions. It provides a visually organized layout to help users quickly scan and engage with multiple items, such as products, services, or articles, at once.

## Usage
Use the Card List component to display a collection of individual cards, each representing distinct content or actions.

## User Experience
- It displays a collection of individual cards, each representing distinct content or actions.
- It provides a visually organized layout to help users quickly scan and engage with multiple items, such as products, services, or articles, at once.
- If 3 column is selected, then it will display a three cards in a row in vertical format. (Image will be displayed on the left and content will be displayed on the right.)
- If 2 column is selected, then it will display a two cards in a row in horizontal format in desktop and vertical format in mobile. (Image will be displayed on the left and content will be displayed on the right.)
- If 1 column is selected, then it will display a single card in horizontal format in desktop and vertical format in mobile. (Image will be displayed on the left and content will be displayed on the right.)
`,
      },
    },
  },
  title: 'Components/Authorable/Shared/LIsts/Card List',
};

export default meta;

type Story = StoryObj<CardListProps>;

export const CardList: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
};

export const OneCol: Story = {
  args: {
    ...flattenObj(oneColData),
  },
  name: 'One Column',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
};

export const TwoCol: Story = {
  args: {
    ...flattenObj(twoColData),
  },
  name: 'Two Column',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
};

export const ThreeCol: Story = {
  args: {
    ...flattenObj(threeColData),
  },
  name: 'Three Column',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
};

export const FourCol: Story = {
  args: {
    ...flattenObj(fourColData),
  },
  name: 'Four Column',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
};
