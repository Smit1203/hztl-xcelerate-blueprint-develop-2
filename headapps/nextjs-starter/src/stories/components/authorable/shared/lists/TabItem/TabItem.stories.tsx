// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { TabItemProps, Default } from 'components/authorable/shared/lists/TabItem';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/lists/TabItem/TabItem.mock-data';
import { TabContextProvider } from 'helpers/Context/TabContext';

const meta: Meta<typeof Default> = {
  component: Default,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Tab Item component represents a single panel of content within a tabbed interface. It displays rich content including text, images, and HTML that becomes visible when its associated tab is selected. The component works in conjunction with the Tab Context to manage active states and user interactions.

### Key Features:

- **Rich Content Support:** Each tab panel can include formatted text, images, lists, and other HTML elements.
- **Context-Aware:** Integrates with TabContext to manage active states and accessibility features.
- **Dynamic Loading:** Supports opening specific tabs on page load and controlling auto-close behavior.
`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Lists/Tab Item',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const TabItem: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return (
      <TabContextProvider tabs={[defaultData.rendering]}>
        <Default {...(expandObj({ ...args }) as TabItemProps)} />
      </TabContextProvider>
    );
  },
};
