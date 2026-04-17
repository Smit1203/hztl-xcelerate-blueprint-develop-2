import type { Meta, StoryObj } from '@storybook/react';
import { Default as FileList, FileListProps } from 'components/authorable/shared/lists/FileList';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from './FileList.mock-data';

const meta: Meta<typeof FileList> = {
  title: 'Components/Authorable/Shared/Lists/FileList',
  component: FileList,
  parameters: {
    docs: {
      description: {
        component: `
## FileList Component

The FileList component displays a list of downloadable files, each with an icon, file name, extension, and size. It supports theming via its own BrandAndThemeProvider and is fully accessible.

### Features
- Responsive two-column layout on desktop, stacked on mobile
- Themed using BrandAndThemeProvider (Light/Dark themes)
- Accessible: keyboard navigation, aria-labels, and decorative icons
- Customizable via design tokens for padding, border, color, etc.
- Includes a CTA button for bulk actions (e.g., Download All)

### Usage
- Use the Storybook controls panel to preview the component in different themes by editing the selectTheme parameter in the mock data.
- Add or remove files in the mock data to test various scenarios.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FileList>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  render: (args, { globals }) => {
    // Use the global theme switcher to dynamically set the theme
    const componentProps = expandObj(args) as FileListProps;
    componentProps.params = {
      ...componentProps.params,
      selectTheme: globals.componentTheme || 'ThemesLight',
    };
    return <FileList {...componentProps} />;
  },
};
