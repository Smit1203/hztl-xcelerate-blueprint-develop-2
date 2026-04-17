// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { expandObj, flattenObj } from 'lib/object-parser';
import ArticleCardWrapper from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';
import { ArticleCardWrapperProps } from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';
import defaultData from './ArticleCardWrapper.mock-data';

const meta: Meta<ArticleCardWrapperProps> = {
  component: ArticleCardWrapper,
  title: 'Helpers/Article Wrappers/ArticleCardWrapper',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Article Card Wrapper component is a container for displaying article content within a card.

## Usage
Use the Article Card Wrapper when you want to display article content within a card.

## User Experience
- **Article Category**: The category of the article card.
- **Article Tags**: The tags of the article card.
- **Article URL**: The URL of the article card. (Not visible but will be used to navigate to the article page.)
- **Article Description**: The description of the article card.
- **Article Image**: The image of the article card.
- **Article Title**: The title of the article card.
- **Article Published Date**: The published date of the article card.
- **Read more** Button will be displayed to navigate.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<ArticleCardWrapperProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <ArticleCardWrapper {...expandObj({ ...args })} />;
  },
};
