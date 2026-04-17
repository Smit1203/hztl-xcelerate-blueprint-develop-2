// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, DividerProps } from 'components/authorable/shared/layout/Divider';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/layout/Divider/Divider.mock-data';

const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Layout/Divider',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Divider component provides visual separation between page components and content sections. It displays as a full-width horizontal line that helps organize content and improve page structure.

### Key Features:
- **Content Separation:** Creates clear visual breaks between page components and sections
- **Full-Width Display:** Spans complete width on both desktop and mobile devices
- **Theme Integration:** Adapts to page theme for consistent styling
- **Responsive Design:** Maintains consistent appearance across all device sizes

### User Experience:
- View visual separation between content sections when available
- Experience improved content organization and readability
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Divider: Story = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return (
      <div className="gap-2 flex flex-col" data-component="authorable/shared/layout/section">
        <div>Test component for divider</div>
        <Default {...(expandedArgs as unknown as DividerProps)} />
        <div>Test component for divider</div>
      </div>
    );
  },
};
