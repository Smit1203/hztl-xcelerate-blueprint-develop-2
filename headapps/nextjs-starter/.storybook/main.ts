// Global
import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

declare const __dirname: string;

const config: StorybookConfig = {
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-onboarding',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-styling-webpack',
  ],

  docs: {},

  env: (config) => ({
    ...config,
    IS_STORYBOOK: 'true',
  }),

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  staticDirs: ['../public', '../src/stories/assets'],
  stories: [
    '../src/docs/Overview.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  // Needed to fix error with react imports for some reason.
  // https://github.com/storybookjs/storybook/issues/23295
  async webpackFinal(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      react: path.resolve('node_modules/react'),
      '.sitecore': path.resolve(__dirname, '../.sitecore'),
    };
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '..')];

    // Ignore "Critical dependency: the request of a dependency is an expression" warnings
    // This is common with dynamic requires and doesn't affect functionality in Storybook
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Critical dependency: the request of a dependency is an expression/,
    ];

    return config;
  },
};

export default config;
