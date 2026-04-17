// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { JumpNavSectionProps, Default } from 'components/authorable/shared/layout/JumpNavSection';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  jumpNavItem2,
} from 'stories/components/authorable/shared/layout/JumpNavSection/JumpNavSection.mock-data';

const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Layout/JumpNavSection',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The JumpNavSection component is a section for displaying a jump navigation item.

## Usage
Use the JumpNavSection component to display a jump navigation item.

## User Experience
- It shows the section title in the jump navigation.
- It has a rich text field for the title.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const JumpNavItem1: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Jump nav item 1',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as JumpNavSectionProps)} />;
  },
};

export const JumpNavItem2: Story = {
  args: {
    ...flattenObj(jumpNavItem2),
  },
  name: 'Jump nav item 2',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as JumpNavSectionProps)} />;
  },
};
