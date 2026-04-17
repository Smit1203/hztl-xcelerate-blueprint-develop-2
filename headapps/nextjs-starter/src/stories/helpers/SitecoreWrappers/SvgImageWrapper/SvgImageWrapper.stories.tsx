// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import {
  SvgImageWrapper,
  SvgImageWrapperProps,
} from 'helpers/SitecoreWrappers/SvgImageWrapper/SvgImageWrapper';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  fallbackIcon,
  originalIcon,
} from 'stories/helpers/SitecoreWrappers/SvgImageWrapper/SvgImageWrapper.mock-data';

const meta: Meta<SvgImageWrapperProps> = {
  title: 'Helpers/Sitecore Wrappers/SVG Image Wrapper',
  component: SvgImageWrapper,
  argTypes: {
    sanitize: {
      control: 'boolean',
      defaultValue: true,
      description:
        'If svg has its own color, and sanitize is false, then it uses svgs own color. If we want to override fill color and give hover effect, then sanitize should be true.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The SVG Image Wrapper component is a container for displaying SVG images within a responsive and well-structured layout. It ensures that SVGs are scaled appropriately based on screen size, maintaining aspect ratios and alignment for an optimal visual experience across devices.   

## Usage
Use the SVG Image Wrapper when you want to embed SVG images within a layout, such as product visuals, banners, or galleries. It ensures that SVGs remain responsive and retain their quality, while providing options for captions, borders, and other design elements. Ideal for media-heavy pages or sections where image clarity and adaptability are essential.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SvgImageWrapper>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  render: (args) => {
    return <SvgImageWrapper {...expandObj({ ...args })} />;
  },
};

export const FallbackIcon: Story = {
  args: {
    ...flattenObj(fallbackIcon),
  },
  render: (args) => {
    return <SvgImageWrapper {...expandObj({ ...args })} />;
  },
};

export const withoutSanitized: Story = {
  args: {
    ...flattenObj(originalIcon),
  },
  render: (args) => {
    return <SvgImageWrapper {...expandObj({ ...args })} />;
  },
};
