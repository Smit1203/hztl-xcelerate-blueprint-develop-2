// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, InlineVideoProps } from 'components/authorable/shared/media/InlineVideo';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  vimeoData,
} from 'stories/components/authorable/shared/media/InlineVideo/InlineVideo.mock-data';

const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Media/Inline Video',
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Inline Video component is a container for displaying a video within a page. It allows users to embed videos from various platforms such as YouTube and Vimeo.

## Usage
Use the Inline Video component when you want to embed a video from a platform such as YouTube or Vimeo.

## Features
- Content author can set a value indicating the desired height of the video player, or if height is not set it should automatically resize to become a height that fits inside the viewport.Default: auto-resized, min-height: 500px

## User Experience
- When provide video url, it will display the video in the page.
- If full width is set by content author, then it will 'resize' to become a height that fits inside the viewport.
- Play pause button will be displayed.
- User can leverage the controls of youtube or vimeo to play, pause, seek, etc.

      `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const InlineVideo: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Youtube',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as InlineVideoProps)} />;
  },
};

export const InlineVideoVimeo: Story = {
  args: {
    ...flattenObj(vimeoData),
  },
  name: 'Vimeo',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as InlineVideoProps)} />;
  },
};
