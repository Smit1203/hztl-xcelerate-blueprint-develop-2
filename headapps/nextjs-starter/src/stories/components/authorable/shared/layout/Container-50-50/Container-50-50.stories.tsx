import type { Meta, StoryObj } from '@storybook/react';
import { Default as Container5050 } from 'components/authorable/shared/layout/Container-50-50';
import { mockData } from './Container-50-50.mock-data';

const meta: Meta<typeof Container5050> = {
  title: 'Components/Authorable/Shared/Layout/Container-50-50',
  component: Container5050,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Overview
The Container-50-50 component is a container for displaying content in a 50% left and 50% right layout. It allows users to display content in a 50% left and 50% right layout.

## Usage
Use the Container-50-50 component to display content in a 50% left and 50% right layout.

## User Experience
- It displays content in a 50% left and 50% right layout.
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
