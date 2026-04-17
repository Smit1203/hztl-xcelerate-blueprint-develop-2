import type { Meta, StoryObj } from '@storybook/react';
import { Default as InlineImage } from 'components/authorable/shared/media/InlineImage';
import defaultData, { desktopImageOnly, withoutCaption, largeImage } from './InlineImage.mock-data';

const meta = {
  title: 'Components/Authorable/Shared/Media/InlineImage',
  component: InlineImage,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The InlineImage component displays responsive images using **art direction** with separate desktop and mobile sources. It uses Next.js \`getImageProps()\` for optimal image optimization and proper \`<picture>\` element structure.

### Features
- **Art Direction**: True responsive images with \`<picture>\` and \`<source>\` elements
- **Next.js Optimization**: Uses \`getImageProps()\` for automatic \`srcSet\` generation
- **Accessibility**: Alt text support from media library
- **Performance**: Automatic image optimization with domain validation
- **Fallback**: Uses desktop image as fallback if mobile image is not provided
- **Caption Support**: Optional caption text display
- **Sitecore Integration**: Handles Sitecore media URLs and editing contexts
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InlineImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultData,
};

export const DesktopImageOnly: Story = {
  args: desktopImageOnly,
};

export const WithoutCaption: Story = {
  args: withoutCaption,
};

export const LargeImage: Story = {
  args: largeImage,
};
