// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, CardListProps } from 'components/authorable/shared/lists/CardList';
import defaultData, { twoCards, threeCards, fourCards } from './CardListWithVideo.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/Shared/Lists/CardList With Video',
  component: Default,
  parameters: {
    docs: {
      description: {
        component: ` 

## Overview
The CardListWithVideo component is a container for displaying a list of cards with a video. It allows users to display a list of cards with a video in a grid layout.

## Usage
Use the CardListWithVideo component to display a list of cards with a video in a grid layout.

## User Experience
- If 1 column is selected, then it will display a single card in horizontal format in desktop and vertical format in mobile. (Image will be displayed on the left and content will be displayed on the right.)
- If 2 column is selected, then it will display a two cards in a row in horizontal format in desktop and vertical format in mobile. (Image will be displayed on the left and content will be displayed on the right.)
- If 3 column is selected, then it will display a three cards in a row in vertical format. (Image will be displayed on the left and content will be displayed on the right.)
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const OneCard: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

export const TwoCards: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
  args: {
    ...flattenObj(twoCards),
  },
};

export const ThreeCards: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
  args: {
    ...flattenObj(threeCards),
  },
};

export const FourCards: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CardListProps)} />;
  },
  args: {
    ...flattenObj(fourCards),
  },
};
