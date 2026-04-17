// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, CarouselItemProps } from 'components/authorable/shared/lists/CarouselItem';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/lists/CarouselItem/CarouselItem.mock-data';

import 'stories/page.css';

const meta: Meta<typeof Default> = {
  argTypes: {
    'fields.description.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.alt': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.height': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.src': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.width': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.anchor': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.class': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.href': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.id': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.linktype': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.querystring': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.target': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.text': {
      table: {
        category: 'fields',
      },
    },
    'fields.primaryCTA.value.title': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.anchor': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.class': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.href': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.id': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.linktype': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.querystring': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.target': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.text': {
      table: {
        category: 'fields',
      },
    },
    'fields.secondaryCTA.value.title': {
      table: {
        category: 'fields',
      },
    },
    'fields.title.value': {
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
The Carousel Item component displays a single slide within a carousel, which is part of a rotating series of content elements. Each item can feature images, text, or multimedia, allowing users to cycle through a curated selection of content in an interactive and space-efficient manner.

## Usage
Use the Carousel Item component to highlight multiple content pieces in a dynamic, space-efficient manner. This component is best suited for:
- **Image Galleries:** Displaying collections of images or photography.
- **Featured Products or Services:** Rotating through key offerings or promotions.
- **Customer Testimonials:** Highlighting user reviews or client feedback.
- **Marketing Campaigns:** Presenting calls-to-action with supporting visuals.

### Key Features:

- **Rich Content Support:** Each slide can include images, titles, descriptions, and CTAs.
- **Primary and Secondary CTAs:** Configurable buttons to drive user actions like "Learn More" or "Contact Us."
- **Responsive Design:** Adapts to various screen sizes for a seamless user experience.
- **Customizable Layouts:** Flexible fields and parameters allow for tailored presentations.

### Configuration:

The Carousel Item component can be configured using the following fields and parameters:

- **fields.image.value:** Define the image source, alt text, width, and height.
- **fields.title.value:** Set the title for the slide, providing a clear and engaging heading.
- **fields.description.value:** Add a brief description to complement the visual content.
- **fields.primaryCTA.value:** Configure the primary call-to-action, including the button text, link, and attributes.
- **fields.secondaryCTA.value:** Add a secondary call-to-action with similar customization options.
- **params.DynamicPlaceholderId:** Manage dynamic placeholders for carousel integration.
- **params.FieldNames:** Define additional field mappings for custom implementations.`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Lists/Carousel Item',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const CarouselItem: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CarouselItemProps)} />;
  },
};
