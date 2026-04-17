// Global
import type { Meta, StoryObj } from '@storybook/react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, VideoCardItemProps } from 'components/authorable/shared/lists/VideoCardItem';
import defaultData, { noImage, vimeoVideo } from './VideoCardItem.mock-data';

const meta: Meta<typeof Default> = {
  title: 'Components/Authorable/Shared/Lists/Card Item With Video',
  component: Default,
  decorators: [
    (Story) => (
      <ul className="gap-6 grid grid-cols-none px-4 lg:grid-cols-1">
        <li className="flex flex-col gap-4">
          <Story />
        </li>
      </ul>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The VideoCardItem component is a container for displaying a card with a video. It allows users to display a card with a video.

## Usage
Use the VideoCardItem component to display a card with a video.

## User Experience
- Displays card with video icon in horizontal format for desktop and vertical format for mobile.
- When click on card, it opens a modal with the video.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const DefaultVideoCard: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as VideoCardItemProps)} />;
  },
  args: {
    ...flattenObj(defaultData),
  },
};

export const NoImage: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as VideoCardItemProps)} />;
  },
  args: {
    ...flattenObj(noImage),
  },
};

export const VimeoVideo: Story = {
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as VideoCardItemProps)} />;
  },
  args: {
    ...flattenObj(vimeoVideo),
  },
};
