import type { Meta, StoryObj } from '@storybook/react';
import { Default as Container7525 } from 'components/authorable/shared/layout/Container-75-25';
import { mockData } from './Container-75-25.mock-data';

const meta: Meta<typeof Container7525> = {
  title: 'Components/Authorable/Shared/Layout/Container-75-25',
  component: Container7525,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Overview
The Container-75-25 component is a container for displaying content in a 75% left and 25% right layout. It allows users to display content in a 75% left and 25% right layout.

## Usage
Use the Container-75-25 component to display content in a 75% left and 25% right layout.

## User Experience
- It displays content in a 75% left and 25% right layout.
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
