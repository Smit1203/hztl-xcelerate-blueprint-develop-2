import type { Meta, StoryObj } from '@storybook/react';
import { Default as StatsDefault } from 'components/authorable/shared/lists/Stats';
import { StatsItemProps } from 'components/authorable/shared/lists/StatsItem';
import {
  StatsItemA,
  StatsItemB,
  StatsItemC,
} from 'stories/components/authorable/shared/lists/StatsItem/StatsItem.mock-data';
import { Default as Section } from 'components/authorable/shared/layout/Section';
import { createStatsData, createSectionData } from './Stats.mock-data';

const StatsStoryWrapper = ({
  items = [],
  alignment = 'Left',
}: {
  items?: StatsItemProps[];
  alignment?: 'Left' | 'Center' | 'Right';
}) => {
  const statsData = createStatsData(items);
  const sectionData = createSectionData(statsData);

  const sectionDataWithAlignment = {
    ...sectionData,
    params: {
      ...sectionData.params,
      alignment,
    },
  };

  return (
    <Section {...sectionDataWithAlignment}>
      <StatsDefault {...statsData} />
    </Section>
  );
};

const meta: Meta<typeof StatsDefault> = {
  component: StatsDefault,
  title: 'Components/Authorable/Shared/Lists/Stats',
  parameters: {
    docs: {
      description: {
        component: `\n**Stats** displays a grid of statistical highlights, each rendered as a StatsItem.  

### Features
- Supports dynamic column layout based on the number of items
- Accepts an \`items\` prop (array of stat items) for direct rendering in Storybook
- In Sitecore, renders children via placeholder
- Responsive grid layout that adapts to screen size

### Section Options
The Stats component is wrapped in a Section component that provides:
- Title and description text
- Text alignment options (Left, Center, Right)
- Theme selection (Light, Dark)
- Container width and padding controls

### Alignment Options
The Section component supports the following alignments:
- **Left**: Text and stats are aligned to the left (default)
- **Center**: Text and stats are centered
- **Right**: Text and stats are aligned to the right

### Grid Layout
The Stats component automatically adjusts its grid layout based on the number of items:
- 1 item: Single column
- 2 items: Two columns on medium screens and up
- 3 items: Three columns on medium screens and up
- 4 items: Four columns on medium screens and up
        `,
      },
    },
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Story = StoryObj<any>;

export const Stats1Item: Story = {
  name: '1 Stat Item',
  args: {
    items: [StatsItemA],
  },
  render: (args) => <StatsStoryWrapper {...args} />,
};

export const Stats2Items: Story = {
  name: '2 Stat Items',
  args: {
    items: [StatsItemA, StatsItemB],
    alignment: 'Left',
  },
  render: (args) => <StatsStoryWrapper {...args} />,
};

export const Stats3Items: Story = {
  name: '3 Stat Items',
  args: {
    items: [StatsItemA, StatsItemB, StatsItemC],
    alignment: 'Left',
  },
  render: (args) => <StatsStoryWrapper {...args} />,
};

export const Stats4Items: Story = {
  name: '4 Stat Items',
  args: {
    items: [StatsItemA, StatsItemB, StatsItemC, StatsItemA],
    alignment: 'Left',
  },
  render: (args) => <StatsStoryWrapper {...args} />,
};

export const Stats3ItemsCentered: Story = {
  name: '3 Stat Items (Centered)',
  args: {
    items: [StatsItemA, StatsItemB, StatsItemC],
    alignment: 'Center',
  },
  render: (args) => <StatsStoryWrapper {...args} />,
};
