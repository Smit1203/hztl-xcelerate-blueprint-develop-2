// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, HeroProps } from 'components/authorable/shared/content/Hero';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/content/Hero/Hero.mock-data';

const meta: Meta<typeof Default> = {
  argTypes: {
    'fields.cta1Link.value.anchor': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.class': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.href': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.id': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.linktype': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.querystring': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.target': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.text': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.title': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.anchor': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.class': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.href': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.id': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.linktype': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.querystring': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.target': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.text': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.title': {
      table: {
        category: 'fields',
      },
    },
    'fields.Description.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.Heading.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.Image.value.alt': {
      table: {
        category: 'fields',
      },
    },
    'fields.Image.value.height': {
      table: {
        category: 'fields',
      },
    },
    'fields.Image.value.src': {
      table: {
        category: 'fields',
      },
    },
    'fields.Image.value.width': {
      table: {
        category: 'fields',
      },
    },
    'params.Styles': {
      table: {
        category: 'params',
      },
    },
    'rendering.dataSource': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.componentName': {
      table: {
        category: 'rendering',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: Default,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Hero component is a prominent, visually impactful section often placed at the top of a page. It typically contains a large background image or video, a bold headline, supporting text, and a call-to-action (CTA). The Hero section is designed to immediately grab the user's attention and convey the main message or purpose of the page.

## Usage
The Hero component is a highly customizable, visually dominant section designed to make a powerful first impression on users. It is ideal for showcasing key messages, such as promotional campaigns, brand value propositions, or guiding users towards primary actions.

### Key Features:

- **Image Support:** Allows adding a high-quality background image (or placeholder), with customizable dimensions (src, alt, width, and height).
- **Dynamic Headline:** A bold, attention-grabbing Heading to clearly communicate your main message.
- **Description:** A text field supporting basic HTML styles for descriptive content.
- **Calls-to-Action:** Two separate, configurable buttons (cta1Link and cta2Link), which can serve primary and secondary actions, respectively.

### Configuration:

The Hero component can be easily configured using the fields and params arguments:

- **fields.Image.value**: Customize the src, alt, width, and height to display a specific image.
- **fields.Heading.value**: Provide the headline text.
- **fields.Description.value**: Include a brief description of the highlighted content, styled for clarity and visual impact.
- **fields.cta1Link.value**: Define the primary button's text, href, target, and other attributes.
- **fields.cta2Link.value**: Define the secondary button's configuration similarly to the primary button.`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Content/Hero',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Hero: Story = {
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return <Default {...(expandedArgs as unknown as HeroProps)} />;
  },
};
