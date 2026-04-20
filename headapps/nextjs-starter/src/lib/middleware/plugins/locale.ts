import { LocaleMiddleware } from '@sitecore-content-sdk/nextjs/middleware';
import sites from '.sitecore/sites.json';
import { locales } from 'src/i18n/config';
import scConfig from 'sitecore.config';

export const localeMiddleware = new LocaleMiddleware({
  sites,
  locales: [...locales],
  ...scConfig.api.edge,
});
