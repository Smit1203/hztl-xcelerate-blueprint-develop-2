// Global
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@sitecore-content-sdk/nextjs';

// Local
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper.mock-data';

type TextProps = React.ComponentProps<typeof Text>;

const meta: Meta<typeof PlainTextWrapper> = {
  argTypes: {
    editable: {
      control: 'boolean',
      table: {
        category: 'fields',
      },
    },
  },
  component: PlainTextWrapper,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Plain Text Wrapper component is designed to contain and display text in its simplest form, without additional formatting or media elements. It ensures that the text is aligned properly within the layout and can handle responsive scaling for various screen sizes while maintaining readability.

## Usage
Use the Plain Text Wrapper when you need to display basic, unformatted text content such as labels, descriptions, or instructions. It’s ideal for sections where minimal styling is required, ensuring clear and consistent text presentation in any context.`,
      },
    },
  },
  title: 'Helpers/Sitecore Wrappers/Plain Text Wrapper',
};

export default meta;

type Story = StoryObj<typeof PlainTextWrapper>;

export const Default: Story = {
  render: (args) => {
    return <PlainTextWrapper {...(expandObj({ ...args }) as TextProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};
