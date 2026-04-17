// Global
import { Meta, StoryObj } from '@storybook/react';

// Local
import LanguageSelector from 'components/authorable/shared/site-structure/Header/LanguageSelector';
import { HeaderProvider } from 'components/authorable/shared/site-structure/Header/HeaderContext';
import { defaultData } from '../Header/Header.mock-data';
import { SiteStructure } from '.generated/SiteStructure/Header.model';
import { MockProviders } from 'helpers/Mocks/MockProviders';

// Wrapper component to handle state
const CountrySelectorWithState = () => {
  return (
    <MockProviders>
      <HeaderProvider>
        <div className="relative w-full flex flex-col p-5 border-x border-y shadow">
          <LanguageSelector
            regionList={
              defaultData.rendering?.fields?.regionList as SiteStructure.Header.Region_Item[]
            }
          />
        </div>
      </HeaderProvider>
    </MockProviders>
  );
};

// Storybook meta configuration
const meta: Meta<typeof LanguageSelector> = {
  title: 'Components/Authorable/Shared/Site Structure/Header/Language Selector',
  component: LanguageSelector,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Language Selector component provides a dropdown interface for users to switch between different languages and regions. It displays country flags alongside language names and supports keyboard navigation and accessibility features.

## Features
- Displays current language with flag and name
- Dropdown menu with grouped languages by region
- Country flags for visual identification
- Keyboard navigation support
- Accessible with proper ARIA attributes
- Responsive design for all screen sizes

## Usage
The Language Selector is typically used in the site header to allow users to switch between different language versions of the site. It requires a regionList prop containing the available languages and their associated metadata.

## Props
- \`regionList\`: Array of region objects containing language options
`,
      },
    },
    nextjs: {
      router: {
        basePath: '/',
        locale: 'en',
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => <CountrySelectorWithState {...args} />,
};
