// Global
import { LayoutServicePageState } from '@sitecore-content-sdk/nextjs';
import { Decorator } from '@storybook/react';
import { I18nProvider, I18n } from 'next-localization';
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
        console.log('obj', _obj, 'name', name);
        return name;
      },
    }
  );

  // We're overriding the `set` function to not use `Object.assign` because that would break the proxy
  const tree = {};
  const i18n = I18n(tree);
  i18n.set = (lang, table) => {
    tree[lang] = table;
  };

  return (
    <I18nProvider lngDict={dictionaryProxy} locale="en" i18nInstance={i18n}>
      <Story />
    </I18nProvider>
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
