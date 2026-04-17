// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, CarouselProps } from 'components/authorable/shared/lists/Carousel';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  withAutoLoop,
  withAutoPlay,
  withAutoPlayAndAutoLoop,
} from 'stories/components/authorable/shared/lists/Carousel/Carousel.mock-data';

import 'stories/page.css';

const meta: Meta<typeof Default> = {
  argTypes: {
    'params.autoPlay': {
      control: 'select',
      default: '0',
      description:
        'A flag indicating wether or not the carousel will play automatically on page load.',
      options: ['0', '1'],
      table: {
        category: 'params',
      },
    },
    'params.autoLoop': {
      control: 'select',
      default: '0',
      description:
        'A flag indicating wether or not the carousel will automatically loop or return to the beginning on reaching the last slide.',
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
    'rendering.placeholders.carousel-1': {
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
The Carousel component displays a series of content items, such as images or cards, in a horizontal sliding format. It allows users to navigate through multiple pieces of content without overwhelming them by showing everything at once. Carousels can include navigation controls like arrows or dots to guide the user through the slides.

## Usage
Use the Carousel component to display a series of content items in a horizontal sliding format.

## Features
- Content author can set the value for auto play and auto loop.
- When autoloop is enable, the previous and next button never get disabled. And if disabled, then it will have a disabled state.
- When autoplay is enable, the carousel will play automatically.

## User Experience
- It displays a series of content items in a horizontal sliding format.
- It has pagination controls in form of dots.
- It has play/pause button to control the playing of the carousel.
- If has previuos and next button, then it will have navigation controls to navigate to the previous and next slide.
`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Lists/Carousel',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Carousel: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CarouselProps)} />;
  },
};

export const WithAutoLoop: Story = {
  args: {
    ...flattenObj(withAutoLoop),
  },
  name: 'With Auto-Loop Enabled',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CarouselProps)} />;
  },
};

export const WithAutoPlay: Story = {
  args: {
    ...flattenObj(withAutoPlay),
  },
  name: 'With Auto-Play Enabled',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CarouselProps)} />;
  },
};

export const WithAutoPlayAndAutoLoop: Story = {
  args: {
    ...flattenObj(withAutoPlayAndAutoLoop),
  },
  name: 'With Auto-Play and Auto-Loop Enabled',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CarouselProps)} />;
  },
};
