// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import SvgIcon, { SvgIconProps } from 'helpers/SvgIcon/SvgIcon';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/helpers/SvgIcon/SvgIcon.mock-data';

const meta: Meta<SvgIconProps> = {
  argTypes: {
    className: {
      description: 'Arbitrary CSS classes to be applied to the SVG.',
    },
    fill: {
      control: 'radio',
      defaultValue: 'currentColor',
      description: 'The fill color to be applied to the SVG.',
      options: ['currentColor', 'none'],
    },
    icon: {
      control: 'select',
      defaultValue: 'arrow-left',
      description: 'The SVG asset to be presented to the user.',
      options: [
        'arrow-left',
        'arrow-right',
        'chevron-down',
        'chevron-up',
        'close',
        'download',
        'facebook',
        'instagram',
        'magnifier',
        'new-tab',
        'new-window',
        'outline-search',
        'icon-pause',
        'pause',
        'pinterest',
        'play',
        'plus',
        'refine',
        'sorting',
        'tiktok',
        'youtube',
      ],
    },
    size: {
      control: 'select',
      defaultValue: 'sm',
      description: 'The rendered size of the SVG.',
      options: ['xxs', 'xs', 'sm', 'md', 'em', 'lg'],
    },
  },
  component: SvgIcon,
  parameters: {
    docs: {
      description: {
        component: `
## Overview

The SVG Icon Wrapper component is designed to contain and display Scalable Vector Graphics (SVG) icons, ensuring they remain sharp and responsive across various screen sizes and devices. It allows for easy integration of vector-based icons with support for customization such as sizing, coloring, and animation.
## Usage

Use the SVG Icon Wrapper when you need to embed vector icons within your design, such as in buttons, navigation menus, or status indicators. It’s ideal for ensuring that icons maintain clarity and scalability, while offering flexibility in terms of style, interaction, and responsiveness.`,
      },
    },
    controls: { sort: 'requiredFirst' },
  },
  tags: ['autodocs'],
  title: 'Helpers/SVG Icon Wrapper',
};

export default meta;

type Story = StoryObj<SvgIconProps>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <SvgIcon {...expandObj({ ...args })} />;
  },
};
