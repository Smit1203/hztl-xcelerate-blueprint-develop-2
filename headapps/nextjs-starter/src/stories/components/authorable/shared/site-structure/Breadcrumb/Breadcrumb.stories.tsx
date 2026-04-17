// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default } from 'components/authorable/shared/site-structure/Breadcrumb/Breadcrumb';
import { flattenObj } from 'lib/object-parser';
import defaultData, {
  withHiddenAncestor,
} from 'stories/components/authorable/shared/site-structure/Breadcrumb/Breadcrumb.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/Shared/Site Structure/Breadcrumb',
  component: Default,
  argTypes: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The **Breadcrumb** component is used to display the hierarchical path of the current page within the site structure. It enhances navigational clarity by allowing users to understand their current position and quickly return to higher-level pages.

## Usage
- Dynamically renders a list of links representing parent pages.
- Designed to be responsive and usable across various screen sizes.

## User Experience

- Highlight a user's current location within nested site sections.
- Provide easy access to parent categories or landing pages.

## Variants

- **Default**: Shows a full breadcrumb trail based on the provided site hierarchy.
- **With Hidden Ancestor**: Demonstrates the ability to hide specific parent items from the breadcrumb display.
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Breadcrumb: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: () => {
    return <Default {...defaultData} />;
  },
};

export const WithHiddenAncestor: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'With Hidden Ancestor',
  render: () => {
    return <Default {...withHiddenAncestor} />;
  },
};
