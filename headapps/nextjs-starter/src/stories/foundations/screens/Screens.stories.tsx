// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { default as ScreensComponent } from 'stories/foundations/screens/Screens';

const meta: Meta<typeof ScreensComponent> = {
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
  },
  tags: ['!autodocs'],
  component: ScreensComponent,
  title: 'Foundations/Screens',
};

export default meta;

type Story = StoryObj<typeof ScreensComponent>;

export const Screens: Story = {
  render: (_) => {
    return <ScreensComponent />;
  },
};
