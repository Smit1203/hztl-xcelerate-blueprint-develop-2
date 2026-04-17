// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { default as ColorsComponent } from 'stories/foundations/colors/Colors';

const meta: Meta<typeof ColorsComponent> = {
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
  },
  component: ColorsComponent,
  tags: ['!autodocs'],
  title: 'Foundations/Colors',
};

export default meta;

type Story = StoryObj<typeof ColorsComponent>;

export const Colors: Story = {
  render: (_) => {
    return <ColorsComponent />;
  },
};
