// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { expandObj, flattenObj } from 'lib/object-parser';
import ArticleLayoutWrapper from 'helpers/GenericWrappers/ArticleLayoutWrapper/ArticleLayoutWrapper';
import { ArticleLayoutWrapperProps } from 'helpers/GenericWrappers/ArticleLayoutWrapper/ArticleLayoutWrapper';
import defaultData from './ArticleLayoutWrapper.mock-data';

const meta: Meta<ArticleLayoutWrapperProps> = {
  component: ArticleLayoutWrapper,
  title: 'Helpers/Article Wrappers/ArticleLayoutWrapper',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Article Layout Wrapper component is a container for displaying article lists with defined columns within a layout. It ensures that article content is scaled appropriately based on screen size, maintaining aspect ratios and alignment for an optimal visual experience across devices.

## Usage
Use the Article Layout Wrapper when you want to display article lists with defined columns within a layout.

## User Experience
- Adjusts width automatically based on the number of cards
- In a 3-column layout, article card images and content are vertically stacked
- In a 2-column layout, article card images and content are aligned horizontally
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<ArticleLayoutWrapperProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <ArticleLayoutWrapper {...expandObj({ ...args })} />;
  },
};
