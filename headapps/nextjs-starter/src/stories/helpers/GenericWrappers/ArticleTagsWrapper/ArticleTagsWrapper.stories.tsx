// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { expandObj, flattenObj } from 'lib/object-parser';
import ArticleTagsWrapper from 'helpers/GenericWrappers/ArticleTagsWrapper/ArticleTagsWrapper';
import { ArticleTagWrapperProps } from 'helpers/GenericWrappers/ArticleTagsWrapper/ArticleTagsWrapper';
import defaultData, { withShowMoreOption } from './ArticleTagsWrapper.mock-data';

const meta: Meta<ArticleTagWrapperProps> = {
  component: ArticleTagsWrapper,
  title: 'Helpers/Article Wrappers/ArticleTagsWrapper',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Article Tags Wrapper component is a container for displaying article tags within a Article card.

## Usage
Use the Article Tags Wrapper when you want to display a list of article tags within a layout.

## User Experience
User will be able to see the article tags with the following contents:
- List of article tags.
- Feasibility to add maximum number of tags to be displayed.
- If more than max tags number on an article, a count tag will display.
- The count tag will reflect the remaining amount of tags.
- Upon hover, the remaining tags will display. When you move away from tooltip, it shall close.
- When you tab to the tooltip, when you click enter, it should expand. When you tab away, it should close.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<ArticleTagWrapperProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <ArticleTagsWrapper {...expandObj({ ...args })} />;
  },
};

export const WithShowMoreOption: Story = {
  args: {
    ...flattenObj(withShowMoreOption),
  },
  name: 'WithShowMoreOption',
  render: (args) => {
    return <ArticleTagsWrapper {...expandObj({ ...args })} />;
  },
};
