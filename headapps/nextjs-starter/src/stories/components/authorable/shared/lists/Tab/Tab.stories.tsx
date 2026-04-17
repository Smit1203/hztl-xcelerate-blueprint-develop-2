// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { TabProps, Default } from 'components/authorable/shared/lists/Tab';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/lists/Tab/Tab.mock-data';

import 'stories/page.css';

const meta: Meta<typeof Default> = {
  component: Default,
  decorators: [
    (Story) => (
      <div className="max-w-7xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Tab component creates a complete tabbed interface that allows users to navigate between different content panels. It manages the overall tab structure, handles active state management, and provides accessibility features including keyboard navigation and ARIA attributes. The component automatically detects TabItem children and creates corresponding tab buttons with scrollable navigation when needed.

## Usage
Use the Tab component to organize multiple related content sections into an efficient, space-saving interface.

### Key Features:

- **Automatic TabItem Detection:** Automatically finds and renders TabItem components placed in its placeholder.
- **Scrollable Navigation:** Provides horizontal scrolling with arrow controls when tabs exceed container width.
- **Active State Management:** Uses TabContext to coordinate active states between tab buttons and content panels.
- **Accessibility Compliant:** Includes full ARIA support, keyboard navigation, and screen reader compatibility.
- **Responsive Design:** Adapts navigation and content layout for various screen sizes and devices.
`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Lists/Tab',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Tab: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as TabProps)} />;
  },
};
