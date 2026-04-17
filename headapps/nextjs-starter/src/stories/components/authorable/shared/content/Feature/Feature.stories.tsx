// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, FeatureProps } from 'components/authorable/shared/content/Feature';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/content/Feature/Feature.mock-data';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Content/Feature',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Feature component shall highlight important information, promote a product or service, or enhance user engagement.

### Key Features:

- **Flexible Content Structure:** Optional eyebrow text, icon, headline, sub-headline, and description with rich text support
- **Background Imagery:** Full-width background images with customizable overlay for enhanced visual appeal
- **Container Layout:** Component spans the width of the page's content 'container' with fixed maximum width
- **Content Alignment:** Left, center, or right alignment for all content elements
- **Dual CTAs:** Support for primary and secondary call-to-action buttons with distinct styling
- **Theme Integration:** Complete theme support for consistent brand styling and color schemes
- **Responsive Design:** Optimized display across all device sizes with mobile-first approach

### Layout:

**Full (Default):** Component spans the width of the page's content 'container'
- Content 'container' maintains fixed maximum width
- Background and overlay respect 'container' boundaries

### Content Alignment Options:

- **Left Aligned (Default):** All content elements align to the left edge
- **Center Aligned:** All content elements center within the container
- **Right Aligned:** All content elements align to the right edge

*Note: Background image and overlay are not affected by content alignment settings*

### Visual Elements:

- **Background Image:** Displays at 15% opacity when present, centers and fills entire component
- **Overlay:** Theme-dependent background overlay for text readability
- **Icon:** Displays above headline when provided, respects content alignment
- **Typography:** Hierarchical text sizing with theme-based colors
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Feature: Story = {
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as FeatureProps)} />;
  },
};
