// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { default as TailwindComponent } from 'stories/foundations/tailwind/Tailwind';

const meta: Meta<typeof TailwindComponent> = {
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
  },
  component: TailwindComponent,
  tags: ['!autodocs'],
  title: 'Foundations/Tailwind',
};

export default meta;

type Story = StoryObj<typeof TailwindComponent>;

export const Tailwind: Story = {
  render: (_) => {
    return <TailwindComponent />;
  },
};
