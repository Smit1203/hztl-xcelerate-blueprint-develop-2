// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper, { LinkWrapperProps } from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData, {
  emailLink,
  externalLink,
  linkWithChildren,
  linkWithTitle,
} from 'stories/helpers/SitecoreWrappers/LinkWrapper/LinkWrapper.mock-data';

const meta: Meta<LinkWrapperProps> = {
  argTypes: {
    children: {
      control: 'select',
      mapping: {
        Image: (
          <ImageWrapper
            field={{
              value: {
                alt: 'A picture of a series of mountains saved in the WebP image format.',
                height: '184',
                src: 'https://placehold.co/275x184',
                width: '275',
              },
            }}
            layout="intrinsic"
            sizes=""
          />
        ),
      },
      options: ['Image'],
    },
    className: { description: 'Can be used to apply custom Tailwind CSS selectors to a link.' },
    editable: { control: 'boolean' },
    'field.value.anchor': {
      description: 'The anchor name segment of the URI for the link.',
      table: {
        category: 'fields',
      },
    },
    'field.value.href': {
      description: 'The URI for the link.',
      optional: false,
      table: {
        category: 'fields',
      },
    },
    'field.value.linktype': {
      control: 'select',
      options: ['external', 'internal', 'media'],
      table: {
        category: 'fields',
      },
    },
    'field.value.querystring': {
      description: 'The querystring segment of the URI for the link.',
      table: {
        category: 'fields',
      },
    },
    'field.value.target': {
      control: 'select',
      description: 'The target for the link.',
      options: ['_blank', '_self', '_parent', '_top'],
      table: {
        category: 'fields',
      },
    },
    'field.value.text': {
      description: 'The text for the link.',
      table: {
        category: 'fields',
      },
    },
    'field.value.title': {
      description: 'The title for the link.',
      table: {
        category: 'fields',
      },
    },
    showLinkTextWithChildrenPresent: { control: 'boolean', default: true },
    srOnlyText: {
      description:
        'Can be used to set text to be specifically and only available to assistive technologies.',
    },
    suppressNewTabIcon: {
      control: 'boolean',
      defaultValue: true,
      description:
        'Can be used to suppress the icon that indicates a link will open in a new browser tab.',
    },
    shouldRenderTitleAttribute: {
      control: 'boolean',
      defaultValue: false,
      description: 'Can be used to render the title attribute for the link.',
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Link Wrapper component serves as a container for links, providing structure, styling, and consistent behavior across a layout. It ensures that hyperlinks are properly formatted, accessible, and responsive to user interactions, while supporting features like tooltips, icons, or button-like appearances.

## Usage
Use the Link Wrapper when you need to organize and style multiple links within a specific section, such as navigation menus, footers, or call-to-action areas. It is ideal for grouping related links together, ensuring they are easy to identify, interact with, and accessible across all devices and screen sizes.`,
      },
    },
    controls: { sort: 'requiredFirst' },
  },
  tags: ['autodocs'],
  title: 'Helpers/Sitecore Wrappers/Link Wrapper',
};

export default meta;

type Story = StoryObj<typeof LinkWrapper>;

export const Default: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const EmailLink: Story = {
  args: {
    ...flattenObj(emailLink),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const ExternalLink: Story = {
  args: {
    ...flattenObj(externalLink),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const LinkWithChildren: Story = {
  args: {
    ...flattenObj(linkWithChildren),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};

export const LinkWithTitleAttribute: Story = {
  args: {
    ...flattenObj(linkWithTitle),
  },
  render: (args) => {
    return <LinkWrapper {...expandObj({ ...args })} />;
  },
};
