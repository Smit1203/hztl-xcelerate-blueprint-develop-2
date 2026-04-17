// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, PageTitleProps } from 'components/authorable/shared/content/PageTitle';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/content/PageTitle/PageTitle.mock-data';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Content/PageTitle',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Page Title component displays the main heading of a page along with a background style treatment, either manually via pre-defined options or automatically based on page-level theme settings.

### Key Features:

- **Primary Page Heading:** Displays the main title text for page identification
- **Optional Description:** Supplementary description text for additional context
- **Call-to-Action Support:** Optional CTA button with customizable text and URL navigation
- **Content Alignment:** Left or center alignment options for all content elements
- **Theme Integration:** Complete theme support for background colors, font colors, and CTA styling
- **Background Style Treatment:** Theme-based background styling with consistent visual appeal
- **Responsive Design:** Optimized display across all device sizes with mobile-first approach

### Content Alignment Options:

- **Left Aligned (Default):** All content elements align to the left edge
- **Center Aligned:** All content elements center within the container

*Note: The component defaults to left-aligned text when no alignment is specified*

### User Experience:

- View the page title component when available on the page
- Navigate to the specified destination URL when clicking the CTA button
- Experience consistent theme-based styling across the site

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
    return <Default {...(expandedArgs as unknown as PageTitleProps)} />;
  },
};
