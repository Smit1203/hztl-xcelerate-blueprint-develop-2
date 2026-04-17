// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { default as TypographyComponent } from 'stories/foundations/typography/Typography';

const meta: Meta<typeof TypographyComponent> = {
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
  },
  component: TypographyComponent,
  tags: ['!autodocs'],
  title: 'Foundations/Typography',
};

export default meta;

type Story = StoryObj<typeof TypographyComponent>;

export const Typography: Story = {
  render: (_) => {
    return <TypographyComponent />;
  },
};
