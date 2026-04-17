import type { Meta, StoryObj } from '@storybook/react';
import { Default as ContainerFullBleed } from 'components/authorable/shared/layout/ContainerFullBleed';
import { mockData } from './ContainerFullBleed.mock-data';

const meta: Meta<typeof ContainerFullBleed> = {
  title: 'Components/Authorable/Shared/Layout/ContainerFullBleed',
  component: ContainerFullBleed,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Overview
The ContainerFullBleed component is a container for displaying content in a full bleed layout.

## Usage
Use the ContainerFullBleed component to display content in a full bleed layout.

## User Experience
- It displays content in a full bleed layout.
- It has a full width and height.
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
