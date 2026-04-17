// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { AccordionItemProps, Default } from 'components/authorable/shared/lists/AccordionItem';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/lists/AccordionItem/AccordionItem.mock-data';

const meta: Meta<typeof Default> = {
  argTypes: {
    'fields.content.value': {
      description: 'A rich text string that represents the content of the accordion item.',
      table: {
        category: 'fields',
      },
    },
    'fields.heading.value': {
      description: "A plain text string that represents the the accordion item's title.",
      table: {
        category: 'fields',
      },
    },
    'params.DynamicPlaceholderId': {
      table: {
        category: 'params',
      },
    },
    'params.FieldNames': {
      table: {
        category: 'params',
      },
    },
    'rendering.componentName': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.dataSource': {
      table: {
        category: 'rendering',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: Default,
  title: 'Components/Authorable/Shared/Lists/Accordion Item',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Accordion Item component displays collapsible content within an accordion structure. It allows users to expand or collapse sections of related information, optimizing space and reducing cognitive load by presenting only the necessary content at a time.

## Usage
Use the Accordion Item component when you need to display content in a compact and organized manner. It is particularly effective for:
- **FAQs:** Grouping questions and answers under expandable headings.
- **Detailed Content:** Presenting in-depth information in a way that doesn't overwhelm users.
- **Categorized Data:** Allowing users to navigate large amounts of structured content with ease.

### Key Features:

- **Expandable Content:** Users can toggle the visibility of content by clicking on the heading.
- **Rich Text Support:** The content area supports HTML formatting for enhanced styling and structure.
- **Customizable Headings:** Each item can have a unique title to indicate its content.
- **Smooth Animations:** CSS grid-based animations for smooth open/close transitions.
- **Accessibility:** Full keyboard navigation and screen reader support.

### Configuration:

The Accordion Item component can be customized using the following fields and parameters:

- **fields.heading.value:** Define the text for the item's title, which appears as the clickable heading.
- **fields.content.value:** Provide the rich text content that will be shown when the item is expanded.
- **params.DynamicPlaceholderId:** Specify the placeholder ID to differentiate items in a dynamic accordion.
- **params.FieldNames:** Configure the fields used within the accordion for mapping content dynamically.
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const AccordionItem: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as AccordionItemProps)} />;
  },
};
