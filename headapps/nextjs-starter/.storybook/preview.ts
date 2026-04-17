// Load before anything else
import 'src/lib/preload';

// Global
import type { Preview } from '@storybook/react';

// Local
import 'assets/app.css';
import 'src/assets/themes/index.css';
import { componentGlobalWrapper, i18nWrapper, themeWrapper } from './decorators';
import './storybook-override.css';

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    tags: ['autodocs'],
    html: {
      prettier: {
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: 'ignore',
      },
      highlighter: {
        showLineNumbers: true,
        wrapLines: false,
      },
    },
  },
  tags: ['autodocs', 'autodocs'],
};

export const globalTypes = {
  siteTheme: {
    name: 'Site',
    description: 'Site level theme',
    defaultValue: 'BrandsBrandX',
    toolbar: {
      // The icon for the toolbar item
      icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'BrandsBrandX', icon: 'circle', title: 'BrandX' },
        { value: 'BrandsHelloWorld', icon: 'circle', title: 'Hello World' },
        { value: 'BrandsNimbusGoods', icon: 'circle', title: 'Nimbus Goods' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },

  componentTheme: {
    name: 'Component',
    description: 'Component level theme',
    defaultValue: 'ThemesWhite',
    toolbar: {
      // The icon for the toolbar item
      icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'ThemesWhite', icon: 'circle', title: 'White' },
        { value: 'ThemesDark', icon: 'circle', title: 'Dark' },
        { value: 'ThemesLight', icon: 'circle', title: 'Light' },
        { value: 'ThemesBrandPrimary', icon: 'circle', title: 'Brand Primary' },
        { value: 'ThemesBrandSecondary', icon: 'circle', title: 'Brand Secondary' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

export const decorators = [componentGlobalWrapper, i18nWrapper, themeWrapper];

export default preview;
