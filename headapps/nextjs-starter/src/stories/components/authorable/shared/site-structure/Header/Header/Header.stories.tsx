// Global
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Local
import { Default } from 'components/authorable/shared/site-structure/Header/Header';

import { expandObj, flattenObj } from 'lib/object-parser';
import defaultData from 'stories/components/authorable/shared/site-structure/Header/Header/Header.mock-data';
import { MockProviders } from 'helpers/Mocks/MockProviders';

const queryClient = new QueryClient();

const meta: Meta<typeof Default> = {
  argTypes: {
    'HeaderData.item.country.targetItems': {
      description: 'Array of regions and their associated languages for the language selector.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logo.jsonValue.value.alt': {
      description: 'Alternative text for the logo image for accessibility.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logo.jsonValue.value.height': {
      description: 'Height of the logo image in pixels.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logo.jsonValue.value.src': {
      description: 'Source URL of the logo image.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logo.jsonValue.value.width': {
      description: 'Width of the logo image in pixels.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.anchor': {
      description: 'Anchor link for the logo (e.g., #section).',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.class': {
      description: 'CSS class names for the logo link.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.href': {
      description: 'Destination URL for the logo link.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.id': {
      description: 'Unique identifier for the logo link.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.linktype': {
      description: 'Type of link (internal, external, etc.).',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.querystring': {
      description: 'Query string parameters for the logo link.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.target': {
      description: 'Target window for the logo link (e.g., _blank).',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.text': {
      description: 'Display text for the logo link.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.logoLink.jsonValue.value.title': {
      description: 'Title attribute for the logo link.',
      table: {
        category: 'HeaderData',
      },
    },
    'HeaderData.item.navigationList.items': {
      description: 'Array of navigation items with optional mega menus.',
      table: {
        category: 'HeaderData',
      },
    },
    'rendering.componentName': {
      description: 'Name of the component being rendered.',
      table: {
        category: 'rendering',
      },
    },
    'rendering.dataSource': {
      description: 'Data source for the component.',
      table: {
        category: 'rendering',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  component: Default,
  decorators: [
    (Story) => (
      <MockProviders>
        <div className="min-h-80">
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </div>
      </MockProviders>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Header component is a prominent section located at the top of a webpage that typically contains branding elements, primary navigation links, and sometimes user account controls (e.g., login/logout, profile settings). It serves as the first point of interaction for users, helping them navigate the website and understand the brand identity.

## Usage
The Header component is designed to improve user navigation while maintaining brand identity across all pages. It can be configured to display navigation links, dropdown menus, and language or region selectors for a tailored user experience.

### Key Features:

- **Logo Support:** Allows adding a company logo with customizable dimensions (src, alt, width, and height) and an associated homepage link.
- **Primary Navigation:** Includes a list of navigation links, each supporting text, internal/external URLs, and optional dropdowns (mega menus).
- **Mega Menus:** Dropdowns can organize links into categories, enhancing usability for websites with extensive content.
- **Language Selector:** Displays available languages or regions with flags and relevant configuration options.
  - Supports multiple regions (e.g., North America, South America, Asia Pacific)
  - Each region contains multiple languages with their respective flags
  - Language properties include:
    - Iso: Language code (e.g., 'en', 'fr')
    - Regional Iso Code: Full regional code (e.g., 'en-US', 'fr-CA')
    - countryCode: Country code for flag display (e.g., 'US', 'CA')
    - Other language-specific fields (Charset, Encoding, etc.)

### Configuration:

The Header component can be easily configured using the fields and params arguments:

- **HeaderData.item.logo.value:** Set the source, alt text, width, and height of the logo image.
- **HeaderData.item.logoLink.value:** Define the link URL for the logo, typically pointing to the homepage.
- **HeaderData.item.navigationList.items:** Provide a list of navigation links with optional dropdowns (mega menus).
  - **navigationTitle.value:** Set the display name for the navigation link.
  - **navigationLink.value:** Define the URL, text, and other attributes for the link.
  - **megaMenuList.items:** Add categories and links to create dropdown menus.
- **HeaderData.item.regionList:** Configure available regions and languages with corresponding flags and language codes.`,
      },
    },
    nextjs: {
      router: {
        basePath: '/',
        locale: 'en',
      },
    },
  },
  title: 'Components/Authorable/Shared/Site Structure/Header/Header',
};

export default meta;

type Story = StoryObj<typeof Default>;

export const Header: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...expandObj({ ...args })} />;
  },
};
