import type { Meta, StoryObj } from '@storybook/react';
import { StatsItem } from 'components/authorable/shared/lists/StatsItem';
import { StatsItemA, StatsItemB } from './StatsItem.mock-data';

const meta: Meta<typeof StatsItem> = {
  component: StatsItem,
  title: 'Components/Authorable/Shared/Lists/Stats Item',
  parameters: {
    docs: {
      description: {
        component: `
**StatsItem** displays a single statistic with an animated number, quantifier, and label.  
- Uses \`CountUp\` for animated numbers.
- Label supports rich text.
- Used as a child of the Stats component.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatsItem>;

export const Default: Story = {
  name: 'Default',
  args: {
    ...StatsItemA,
  },
  render: (args) => <StatsItem {...args} />,
};

export const WithoutEyebrow: Story = {
  name: 'Without Eyebrow',
  args: {
    ...StatsItemB,
  },
  render: (args) => <StatsItem {...args} />,
};
