// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default, RTEProps } from 'components/authorable/shared/content/RTE';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  tableData,
  tableDataLeftAlign,
} from 'stories/components/authorable/shared/content/RTE/RTE.mock-data';

import './RTE.stories.css';

const meta: Meta<typeof Default> = {
  argTypes: {
    'fields.text.value': {
      table: {
        category: 'feilds',
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
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The RTE component provides a way to allow content authors enter rich text and HTML via Sitecore and to safely render it into a component or page.

## Table Usage
The RTE component supports tables with the following features:
- Fixed width tables with column sizing
- Tables with or without headers
- Mobile-responsive tables (when headers are present)
- Custom styling through the RTE editor

### Adding a Table
1. Click the table icon in the RTE toolbar
2. Choose the number of rows and columns
3. (Optional) Add headers by selecting the header row and clicking the "Table Header" button
4. Add content to cells

### Table Width and Alignment
Tables can be configured in two ways:

#### Full Width Tables
1. After inserting the table, click and drag the right edge of the table to set the width
2. The table will maintain this width and be responsive
3. Column widths can be adjusted by dragging column borders

#### Aligned Tables (Left, Center, Right)
1. After inserting the table, do NOT drag to resize the width
2. Select the table
3. Use the alignment buttons in the toolbar to position the table:
   - Left align: Table will align to the left and take natural width
   - Center align: Table will center and take natural width
   - Right align: Table will align to the right and take natural width
4. The table will maintain its natural width based on content

### Table Styling
- Use the table properties panel to adjust:
  - Borders
  - Background colors
  - Cell padding
  - Text alignment within cells`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Content/RTE',
};

export default meta;

type Story = StoryObj<typeof Default>;

const RTEWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="basis-full" data-component="authorable/shared/content/rte">
    <div className="p-4">
      <div className="rte" data-component="helpers/fieldwrappers/richtextwrapper">
        <div className="ck-content">{children}</div>
      </div>
    </div>
  </div>
);

export const RTE: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return (
      <RTEWrapper>
        <Default {...(expandObj({ ...args }) as RTEProps)} />
      </RTEWrapper>
    );
  },
};

export const RTETable: Story = {
  args: {
    ...flattenObj(tableData),
  },
  name: 'Table Example',
  render: (args) => {
    return (
      <RTEWrapper>
        <Default {...(expandObj({ ...args }) as RTEProps)} />
      </RTEWrapper>
    );
  },
};

export const RTETableLeftAlign: Story = {
  args: {
    ...flattenObj(tableDataLeftAlign),
  },
  name: 'Table - Left Align',
  render: (args) => {
    return (
      <RTEWrapper>
        <Default {...(expandObj({ ...args }) as RTEProps)} />
      </RTEWrapper>
    );
  },
};
