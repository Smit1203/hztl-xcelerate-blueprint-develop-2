// Global
import { Decorator } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { MockProviders } from '../src/helpers/Mocks/MockProviders';

// Local
import { BrandAndThemeProvider } from '../src/lib/context/BrandAndThemeContext';

export const componentGlobalWrapper: Decorator = (Story) => (
  <MockProviders>
    <Story />
  </MockProviders>
);

export const i18nWrapper: Decorator = (Story) => {
  // Since we don't have a Sitecore dictionary in Storybook, use a proxy dictionary that just returns the property name.
  const dictionaryProxy = new Proxy(
    {},
    {
      get(_obj, name) {
        return name;
      },
    }
  ) as Record<string, string>;

  // Storybook site name doesn't matter; useDictionary reads the first namespace key.
  const messages = { storybook: dictionaryProxy } as unknown as Record<string, object>;

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Story />
    </NextIntlClientProvider>
  );
};

export const themeWrapper: Decorator = (Story, configuration) => {
  const { siteTheme, componentTheme } = configuration.globals;
  return (
    <BrandAndThemeProvider brand={siteTheme} theme={componentTheme}>
      <Story />
    </BrandAndThemeProvider>
  );
};
