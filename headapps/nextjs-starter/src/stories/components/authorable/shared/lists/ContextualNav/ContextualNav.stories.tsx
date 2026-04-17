// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import ContextualNav from 'components/authorable/shared/lists/ContextualNav';
import defaultData, { simpleNavData, filteredNavData } from './ContextualNav.mock-data';

import 'stories/page.css';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const meta: Meta<typeof ContextualNav> = {
  component: ContextualNav,
  decorators: [
    (Story) => (
      <div className="max-w-md p-4 h-auto">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Contextual Navigation component provides hierarchical navigation that adapts to the current page context. It displays the navigation structure relative to the current page, showing parent and sibling pages with expandable sections for nested content.

## Usage
Use the Contextual Navigation component to help users understand where they are in the site hierarchy and easily navigate to related pages. This component is best suited for:

- **Section Navigation:** Displaying pages within a specific section of the site.
- **Hierarchical Content:** Sites with deep content structures that need contextual wayfinding.
- **Sidebar Navigation:** Providing persistent navigation alongside main content.
- **Mobile-Responsive Navigation:** Collapsible navigation that works across devices.

### Key Features:

- **Hierarchical Structure:** Displays nested navigation with parent-child relationships.
- **Current Page Highlighting:** Active states with blue borders for current page and ancestors.
- **Expandable Sections:** Toggle buttons to show/hide child navigation items.
- **Mobile Optimization:** Collapsible main navigation for smaller screens.
- **Responsive Design:** Adapts layout and behavior for mobile and desktop.
- **Accessibility:** ARIA labels, keyboard navigation, and focus management.
- **Navigation Filters:** Support for filtering navigation items based on their properties.

### Visual States:

- **Active Navigation:** Blue left border indicates current page and expanded ancestors.
- **Hover Effects:** Background color changes and arrow visibility on hover.
- **Expandable Icons:** Chevron-down icons rotate when sections are expanded.
- **Child Indicators:** Arrow-dash-right icons for leaf navigation items.

### Responsive Behavior:

- **Desktop:** Full navigation always visible with hover states.
- **Mobile:** Collapsible main navigation with toggle button.
- **Touch-Friendly:** Larger touch targets for mobile interaction.

### Configuration:

The component automatically handles:
- **Current Page Detection:** Based on URL matching and ancestors.
- **Auto-Expansion:** Expands ancestor paths to show current page context.
- **Dynamic Children Loading:** Lazy loads child navigation items.
- **State Management:** Maintains expansion state across user interactions.
- **Navigation Filters:** Filters out items with specific navigation filter values (e.g., sidebar).
      `,
      },
    },
  },
  title: 'Components/Authorable/Shared/Lists/Contextual Nav',
};

export default meta;

type Story = StoryObj<typeof ContextualNav>;

export const Default: Story = {
  args: defaultData as any,
  name: 'Multi-Level Navigation',
  parameters: {
    docs: {
      description: {
        story: `
**Multi-Level Navigation** demonstrates the full capability of the Contextual Nav with a three-level hierarchy:

- **Main Section:** Products (root level)
- **Categories:** Software, Hardware, Services (second level)  
- **Specific Items:** Analytics, CRM, Servers, etc. (third level)

The current page is set to "Analytics" which shows:
- Products section expanded (ancestor)
- Software subsection expanded (parent)
- Analytics highlighted with blue border (current)
- Other sections collapsed but accessible via toggle buttons

This scenario is ideal for complex sites with deep content hierarchies.`,
      },
    },
  },
};

export const SimpleNavigation: Story = {
  args: simpleNavData as any,
  name: 'Simple Navigation',
  parameters: {
    docs: {
      description: {
        story: `
**Simple Navigation** shows a flatter hierarchy with just two levels:

- **Main Section:** Company
- **Pages:** About Us, Our Team, Careers

The current page is "About Us" with minimal nesting. This pattern works well for:
- Smaller sites with simpler structures
- Section landing pages with direct child pages
- When you want to avoid deep navigation complexity`,
      },
    },
  },
};

export const FilteredNavigation: Story = {
  args: filteredNavData as any,
  name: 'Filtered Navigation',
  parameters: {
    docs: {
      description: {
        story: `
**Filtered Navigation** demonstrates how navigation items can be filtered based on their properties:

- **Main Section:** Admin
- **Pages:** Dashboard (filtered out), Settings, Users

The example shows:
- Dashboard page with 'sidebar' filter (will be hidden)
- Settings page with 'main' filter (will be shown)
- Users page with no filters (will be shown)

This pattern is useful for:
- Controlling which items appear in different navigation contexts
- Implementing role-based navigation visibility
- Creating separate navigation structures for different sections`,
      },
    },
  },
};
