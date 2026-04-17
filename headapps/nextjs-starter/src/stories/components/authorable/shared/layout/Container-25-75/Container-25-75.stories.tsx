import type { Meta, StoryObj } from '@storybook/react';
import { Default as Container2575 } from 'components/authorable/shared/layout/Container-25-75';
import { mockData } from './Container-25-75.mock-data';

const meta: Meta<typeof Container2575> = {
  title: 'Components/Authorable/Shared/Layout/Container-25-75',
  component: Container2575,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Overview
The Container-25-75 component is a container for displaying content in a 25% left and 75% right layout. It allows users to display content in a 25% left and 75% right layout.

## Usage
Use the Container-25-75 component to display content in a 25% left and 75% right layout.

## User Experience
- It displays content in a 25% left and 75% right layout.
- It has a left and right column.
- In mobile it displays as a stack layout.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rendering: mockData.rendering,
    params: mockData.params,
  },
};

export const WithContent: Story = {
  args: {
    rendering: mockData.renderingWithContent,
    params: mockData.params,
  },
};
