// Global
import type { Meta, StoryObj } from '@storybook/react';
import { RichTextProps } from '@sitecore-content-sdk/nextjs/types/components/RichText';

// Local
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper.mock-data';

const meta: Meta<typeof RichTextWrapper> = {
  argTypes: {
    editable: { control: 'boolean' },
    'field.value': {
      table: {
        category: 'fields',
      },
    },
  },
  component: RichTextWrapper,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Rich Text Wrapper component is a container for displaying formatted text with advanced styling, including bold, italics, hyperlinks, headings, lists, and embedded media. It allows for rich, dynamic content that enhances readability and engagement through various text styling options.

## Usage
Use the Rich Text Wrapper when you need to present content that requires complex formatting, such as articles, blog posts, product descriptions, or any text-heavy sections where emphasis, structure, and multimedia integration are important. It’s ideal for creating visually appealing and easy-to-read content while maintaining flexibility in design.`,
      },
    },
  },
  title: 'Helpers/Sitecore Wrappers/Rich Text Wrapper',
};

export default meta;

type Story = StoryObj<typeof RichTextWrapper>;

export const Default: Story = {
  render: (args) => {
    return <RichTextWrapper {...(expandObj({ ...args }) as RichTextProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};
