// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import { Default } from 'components/authorable/shared/site-structure/Footer/Footer';
import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/site-structure/Footer/Footer/Footer.mock-data';

const meta: Meta<typeof Default> = {
  argTypes: {
    'FooterData.item.footerColumns.items': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.footerLogo.alt': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.footerLogo.jsonValue.value.alt': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.footerLogo.jsonValue.value.height': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.footerLogo.jsonValue.value.src': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.footerLogo.jsonValue.value.width': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.id': {
      table: {
        category: 'FooterData',
      },
    },
    'FooterData.item.path': {
      table: {
        category: 'FooterData',
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
The footer component typically appears at the bottom of a page and contains navigation links, legal information, and other essential site details.

## Usage
Use the Footer component to ensure users can easily navigate to key areas of the site from any page. It is particularly effective for:
- **Site Navigation:** Including quick links to major sections or pages, such as Services, Work, or About Us.
- **Contact Information:** Displaying ways to get in touch, such as email, phone, or address details.
- **Legal Information:** Providing links to Privacy Policy, Terms of Service, and other compliance-related pages.
- **Branding:** Showcasing the company logo and social media links to maintain a cohesive brand presence.
- **Social Media Links:** Displaying social media links to maintain a cohesive brand presence.

### User Experience

- **Logo Support:** Displays the company logo with customizable dimensions (src, alt, width, and height).
- **Footer Columns:** Organizes links and content into multiple structured columns for easy navigation.
- **Social Media Integration:** Includes links to social media profiles, such as LinkedIn, Facebook, or Twitter.
`,
      },
    },
  },
  title: 'Components/Authorable/Shared/Site Structure/Footer/Footer',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Footer: Story = {
  args: {
    ...(flattenObj(defaultData) as object),
  },
  name: 'Default',
  render: (args: any) => {
    return <Default {...expandObj({ ...args })} />;
  },
};
