// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { expandObj, flattenObj } from 'lib/object-parser';
import SearchArticleCardWrapper, {
  SearchArticleCardItemCardProps,
} from 'helpers/GenericWrappers/SearchArticleCardWrapper/SearchArticleCardWrapper';
import defaultData, { noImageSearchResultCard } from './SearchArticleCardWrapper.mock-data';

const meta: Meta<SearchArticleCardItemCardProps> = {
  component: SearchArticleCardWrapper,
  title: 'Helpers/Search Article Wrappers/SearchArticleCardWrapper',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
  The Search Article Card Wrapper component is a container for displaying search article cards within a responsive and well-structured layout. It ensures that search article cards are scaled appropriately based on screen size, maintaining aspect ratios and alignment for an optimal visual experience across devices.

## Usage
Use the Search Article Card Wrapper when you want to embed search article cards within a layout of search article results. It ensures that search article cards remain responsive and retain their quality, while providing options for captions, borders, and other design elements. Ideal for media-heavy pages or sections where image clarity and adaptability are essential.

## User Experience
User will be able to see the search article card with the following contents:
- **Article Category**: The category of the search article card.
- **URL**: The URL of the search article card. (Not visible but will be used to navigate to the article page.)
- **Description**: The description of the search article card.
- **Image**: The image of the search article card. (Optional)
- **Name**: The name of the search article card.
- **Published Date**: The published date of the search article card.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<SearchArticleCardItemCardProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <SearchArticleCardWrapper {...expandObj({ ...args })} />;
  },
};

export const NoImageResultCard: Story = {
  args: {
    ...flattenObj(noImageSearchResultCard),
  },
  name: 'NoImageResultCard',
  render: (args) => {
    return <SearchArticleCardWrapper {...expandObj({ ...args })} />;
  },
};
