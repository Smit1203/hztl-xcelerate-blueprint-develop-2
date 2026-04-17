// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, SectionProps } from 'components/authorable/shared/layout/Section';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  withTitleAndDescription,
  withTitleAndDescriptionCentered,
} from 'stories/components/authorable/shared/layout/Section/Section.mock-data';

const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Layout/Section',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Section component is a flexible layout 'container' that allows you to structure content by placing other components within it. It supports background style treatment, either manually via pre-defined options or automatically based on page-level theme settings.

### Key Features:
- **Flexible Layout Container:** Serves as a structural wrapper for organizing multiple components
- **Optional Content Enhancements:** Optional title and description with alignment control
- **Content Container Width:** Expands to fit the size of content container without full-bleed options
- **Theme Integration:** Complete theme support for background colors and consistent styling
- **Responsive Design:** Maintains proper layout and functionality across all device sizes

### User Experience:

- View the section component and its contained components when available
- Experience organized content structure with consistent theme-based styling
- Navigate through multiple components within a cohesive section layout
- Access properly structured content hierarchy with optional titles and descriptions

### Component Management:
- **Multiple Components:** Section accepts and displays multiple components within its 'container'
- **Component Hierarchy:** Maintains proper content hierarchy and organization
- **Flexible Content:** Accommodates various component types and combinations

### Content Alignment:
- **Title Alignment:** Optional title can be left or center aligned
- **Description Alignment:** Optional description can be left or center aligned
- **Consistent Alignment:** Title and description alignment settings work together for visual cohesion
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Section: Story = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as SectionProps)} />;
  },
};

export const WithTitleAndDescription: Story = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  args: {
    ...flattenObj(withTitleAndDescription as any),
  },
  name: 'With Title and Description',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as SectionProps)} />;
  },
};

export const WithTitleAndDescriptionCentered: Story = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  args: {
    ...flattenObj(withTitleAndDescriptionCentered as any),
  },
  name: 'With Title and Description (Centered)',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as SectionProps)} />;
  },
};
