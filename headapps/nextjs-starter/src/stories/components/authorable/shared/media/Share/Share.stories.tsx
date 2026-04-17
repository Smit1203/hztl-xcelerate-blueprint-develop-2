// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default } from 'components/authorable/shared/media/Share';
import { MockProviders } from 'helpers/Mocks/MockProviders';
import { expandObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/media/Share/Share.mock-data';

export default {
  title: 'Components/Authorable/Shared/Media/Share',
  component: Default,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Share component is a container for displaying share options for a given page. It allows users to share the current page via various social media platforms.

## Usage
Use the Share component when you want to allow users to share a page via various social media platforms.

## User Experience
- When user clicks on the share button, the share options will be displayed.
- When user clicks on the share option, the page will be shared via the selected social media platform.
- When user clicks on the close button, the share options will be closed.
- On fallback of browser, the share options will be displayed in a dropdown menu.
        `,
      },
    },
  },
} as Meta;

export const Share: StoryObj = {
  name: 'Default',
  render: (args) => {
    return (
      <div>
        <MockProviders layoutData={defaultData}>
          <Default {...expandObj({ ...args })} />
        </MockProviders>
      </div>
    );
  },
};
