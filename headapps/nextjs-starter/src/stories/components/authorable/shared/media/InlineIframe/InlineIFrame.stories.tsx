import React from 'react';
import { StoryFn as Story, Meta } from '@storybook/react';
import InlineIFrame, { InlineIFrameProps } from 'components/authorable/shared/media/InlineIFrame';
import defaultData, { noEmbedUrl, customDimensions } from './InlineIFrame.mock-data';

export default {
  title: 'Components/Authorable/Shared/Media/InlineIFrame',
  component: InlineIFrame,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The InlineIFrame component is a container for displaying an iframe within a page. It allows users to embed external content such as videos or other web pages within a page.

## Usage
Use the InlineIFrame component when you want to embed external content such as videos or other web pages within a page.

## Features
- Content author can set a value indicating the desired height and width of the iframe.
- If aspect ratio is set by content author, then it will 'resize' to become a height that fits inside the viewport.
- If full width is set by content author, then it will 'resize' to become a height that fits inside the viewport.
- Content author can set a Title for the iframe.

## User Experience
- When provide iframe url, it will display the iframe in the page.
        `,
      },
    },
  },
} as Meta;

const Template: Story = (args: InlineIFrameProps) => <InlineIFrame {...args} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const NoEmbedUrl = Template.bind({});
NoEmbedUrl.args = noEmbedUrl;

export const CustomDimensions = Template.bind({});
CustomDimensions.args = customDimensions;
