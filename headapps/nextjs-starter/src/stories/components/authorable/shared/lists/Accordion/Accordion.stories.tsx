// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { AccordionProps, Default } from 'components/authorable/shared/lists/Accordion';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  singlePanelOpenData,
  scrollToOpenPanelData,
  openByDefaultData,
} from 'stories/components/authorable/shared/lists/Accordion/Accordion.mock-data';

const meta: Meta<typeof Default> = {
  argTypes: {
    'params.singleOpenPanel': {
      control: 'select',
      default: '0',
      description: 'When enabled, only one accordion panel can be open at a time.',
      options: ['0', '1'],
      table: {
        category: 'params',
      },
    },
    'params.scrollToOpenPanel': {
      control: 'select',
      default: '1',
      description: 'When enabled, the page will scroll to the opened accordion panel.',
      options: ['0', '1'],
      table: {
        category: 'params',
      },
    },
    'params.openByDefault': {
      control: 'select',
      default: '0',
      description: 'When enabled, the first accordion panel will be open by default.',
      options: ['0', '1'],
      table: {
        category: 'params',
      },
    },
    'params.DynamicPlaceholderId': {
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
    'rendering.placeholders.accordion-1': {
      table: {
        category: 'rendering',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: Default,
  title: 'Components/Authorable/Shared/Lists/Accordion',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Accordion component organizes content into collapsible sections, allowing users to expand and collapse each section to reveal or hide the content inside. It supports single panel mode, scroll-to-open functionality, and expand/collapse all controls.

## Features
- **Single Panel Mode**: When enabled, only one panel can be open at a time
- **Scroll to Open Panel**: Automatically scrolls to opened panels
- **Expand/Collapse All**: Buttons to expand or collapse all panels (hidden in single panel mode)
- **Smooth Animations**: CSS grid-based animations for smooth open/close transitions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Internationalization**: Dictionary support for button text
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Accordion: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as AccordionProps)} />;
  },
};

export const SinglePanelOpen: Story = {
  args: {
    ...flattenObj(singlePanelOpenData),
  },
  name: 'Single Panel Open',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as AccordionProps)} />;
  },
};

export const ScrollToOpenPanel: Story = {
  args: {
    ...flattenObj(scrollToOpenPanelData),
  },
  name: 'Scroll to Open Panel',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as AccordionProps)} />;
  },
};

export const OpenByDefault: Story = {
  args: {
    ...flattenObj(openByDefaultData),
  },
  name: 'Open by Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as AccordionProps)} />;
  },
};

// Debug story to test if context is working
export const Debug: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Debug - Test Context',
  render: (args) => {
    console.log('Accordion Debug Story - Args:', args);
    return <Default {...(expandObj({ ...args }) as AccordionProps)} />;
  },
};
