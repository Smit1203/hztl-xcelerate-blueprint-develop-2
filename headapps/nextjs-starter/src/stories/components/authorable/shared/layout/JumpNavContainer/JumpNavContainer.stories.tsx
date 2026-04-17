// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import {
  JumpNavContainerProps,
  Default,
} from 'components/authorable/shared/layout/JumpNavContainer';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/layout/JumpNavContainer/JumpNavContainer.mock-data';

const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Layout/JumpNavContainer',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Jump Nav component is a UI element that allows users to quickly jump to specific sections of a long page. It provides persistent navigation that remains visible as users scroll through content, with automatic highlighting of the current section.

### Key Features:

- **Sticky Navigation:** Remains 'visible' at any point on the page for persistent access
- **Section Jumping:** Allows users to quickly navigate to specific page sections
- **Current Section Indication:** Dynamically bolds the navigation link corresponding to the current section
- **Smooth Scrolling:** Provides smooth scroll transitions when navigating between sections
- **Dual Layout System:** Desktop sidebar navigation and mobile accordion interface
- **Dynamic Linking:** Automatically links to each section of the page
- **Focus Management:** Proper focus handling after section navigation for accessibility
- **Responsive Design:** Adapts between desktop sidebar and mobile accordion layouts

### Navigation Behavior:

#### Desktop Experience:
- **Sidebar Navigation:** Fixed sidebar with vertical list of section links
- **Sticky Positioning:** Remains positioned relative to main header height
- **Visual Hierarchy:** Clear separation with borders and spacing
- **Active State:** Bold styling for current section link

#### Mobile Experience:
- **Accordion Interface:** Collapsible navigation bar at top of content
- **Toggle Functionality:** Expandable/collapsible with plus/minus icons
- **Sticky Positioning:** Remains at top of viewport during scroll

### User Experience:

- View the jump navigation at any point on the page (sticky positioning)
- Select any navigation link to be smoothly scrolled to the chosen section
- Identify current location on the page through bolded navigation links
- Access navigation through desktop sidebar or mobile accordion interface
- Navigate content efficiently without manual scrolling through long pages


### Navigation Behavior:
- **Section Scrolling:** Jump nav scrolls to specified section when clicked
- **Dynamic Linking:** Automatically links to each section of the page
- **Top Positioning:** Users are taken to the top of target section when link is selected
- **Active Indication:** Current section link is bolded as user scrolls through content
- **Sticky Positioning:** Jump nav remains 'sticky' on page for persistent access
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const JumpNavContainer: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as JumpNavContainerProps)} />;
  },
};
