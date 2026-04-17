import type { Meta, StoryObj } from '@storybook/react';
import { Default as ContainerCenter75 } from 'components/authorable/shared/layout/ContainerCenter-75';
import { mockData } from './ContainerCenter-75.mock-data';

const meta: Meta<typeof ContainerCenter75> = {
  title: 'Components/Authorable/Shared/Layout/ContainerCenter-75',
  component: ContainerCenter75,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Overview
The ContainerCenter-75 component is a container for displaying content in a 75% layout. It allows users to display content in a 75% layout.

## Usage
Use the ContainerCenter-75 component to display content in a 75% layout.

## User Experience
- It displays content in a 75% layout.
- It has a center column.
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
