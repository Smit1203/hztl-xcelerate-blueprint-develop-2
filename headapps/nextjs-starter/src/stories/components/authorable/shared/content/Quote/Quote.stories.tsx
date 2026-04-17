// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, QuoteProps } from 'components/authorable/shared/content/Quote';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/content/Quote/Quote.mock-data';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Content/Quote',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Quote component showcases statements, testimonials, citations, and other quoted content. It can be displayed as a standalone element or integrated into a carousel for a more interactive presentation.

### Key Features:

- **Flexible Display Options:** Can function as a standalone component or within carousel implementations
- **Quote Content:** Displays quoted text with proper semantic markup using blockquote elements
- **Attribution Support:** Includes quotee name (required) and optional title for proper attribution
- **Visual Enhancement:** Required image support for visual context and engagement
- **Theme Integration:** Background color determined by selected theme for brand consistency
- **Pre-defined Styling:** Consistent styling across all quote instances
- **Accessibility Compliant:** Full WCAG compliance with semantic markup and screen reader support
- **Responsive Design:** Maintains readability and operability across all device breakpoints

### User Experience:

- View the quote component when available on the page
- Access properly formatted testimonial or statement content
- Experience consistent theme-based styling across the site
- Navigate quote content with assistive technologies when needed
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Quote: Story = {
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as QuoteProps)} />;
  },
};
