// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import {
  Default,
  ImageLeft,
  FeatureSidebySideProps,
} from 'components/authorable/shared/content/FeatureSidebySide';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/content/FeatureSidebySide/FeatureSidebySide.mock-data';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 m-auto w-full max-w-screen-dimensions-max-width min-w-screen-dimensions-min-width px-general-spacing-margin-x lg:py-padding-less py-spacing-spacing-24 gap-6 lg:gap-11.5">
    {children}
  </div>
);

const meta: Meta<typeof Default> = {
  argTypes: {
    'fields.cta1Link.value.anchor': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.class': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.href': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.id': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.linktype': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.querystring': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.target': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.text': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta1Link.value.title': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.anchor': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.class': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.href': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.id': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.linktype': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.querystring': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.target': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.text': {
      table: {
        category: 'fields',
      },
    },
    'fields.cta2Link.value.title': {
      table: {
        category: 'fields',
      },
    },
    'fields.description.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.heading.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.eyebrow.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.subHeading.value': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.alt': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.height': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.src': {
      table: {
        category: 'fields',
      },
    },
    'fields.image.value.width': {
      table: {
        category: 'fields',
      },
    },
    'params.Styles': {
      table: {
        category: 'params',
      },
    },
    'rendering.dataSource': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.componentName': {
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
The Feature Side by Side component is a versatile content layout that displays text content alongside an image in a balanced, visually appealing format. This component is perfect for showcasing features, products, or services with supporting visual content.

## Usage
The Feature Side by Side component provides a clean, modern layout that balances text content with visual elements. It's ideal for feature showcases, product presentations, or any content that benefits from visual reinforcement.

### Key Features:

- **Flexible Layout:** Two layout variants - content left with image right (default) and image left with content right
- **Rich Content Support:** Eyebrow text, heading, subheading, description, and two call-to-action buttons
- **Responsive Design:** Adapts seamlessly from mobile to desktop with optimized image positioning
- **Image Optimization:** Supports high-quality images with proper aspect ratios and responsive sizing
- **Theme Integration:** Compatible with the design system's theming capabilities

### Layout Variants:

1. **Default (Image Right):** Content appears on the left, image on the right
   - Mobile: Content first, image at bottom
   - Desktop: Side-by-side layout

2. **Image Left:** Image appears on the left, content on the right
   - Mobile: Image first, content below
   - Desktop: Side-by-side layout

### Configuration:

The component can be configured using the following fields:

- **fields.image.value**: Set the image source, alt text, width, and height
- **fields.eyebrow.value**: Small text above the heading (e.g., "FEATURED SOLUTION")
- **fields.heading.value**: Main headline text
- **fields.subHeading.value**: Secondary heading below the main headline
- **fields.description.value**: Rich text description with HTML support
- **fields.cta1Link.value**: Primary call-to-action button configuration
- **fields.cta2Link.value**: Secondary call-to-action button configuration

### Responsive Behavior:

- **Mobile (< 768px):** Stacked layout with controlled image positioning
- **Tablet (768px - 1024px):** Side-by-side with 2/3 content, 1/3 image ratio
- **Desktop (1024px+):** Balanced 50/50 side-by-side layout
- **Large Desktop (1280px+):** Square aspect ratio for images

### Best Practices:

- Use high-quality images with 4:5 aspect ratio for optimal display
- Keep headings concise and impactful
- Use eyebrow text sparingly for emphasis
- Ensure CTAs have clear, action-oriented text
- Test both layout variants to determine the best fit for your content`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Content/FeatureSidebySide',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const DefaultVariant: Story = {
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default (Image Right)',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return (
      <LayoutWrapper>
        <Default {...(expandedArgs as unknown as FeatureSidebySideProps)} />
      </LayoutWrapper>
    );
  },
};

export const ImageLeftVariant: Story = {
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Image Left',
  render: (args) => {
    const expandedArgs = expandObj({ ...args }) as Record<string, unknown>;
    return (
      <LayoutWrapper>
        <ImageLeft {...(expandedArgs as unknown as FeatureSidebySideProps)} />
      </LayoutWrapper>
    );
  },
};
