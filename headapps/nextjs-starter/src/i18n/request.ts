import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import client from 'src/lib/sitecore-client';

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  const requested = await requestLocale;
  const [parsedSite, parsedLocale] = requested?.split('_') || [];
  const locale = hasLocale(routing.locales, parsedLocale) ? parsedLocale : routing.defaultLocale;

  const messages: Record<string, object> = {};

  try {
    const siteDictionary = await client.getDictionary({
      locale,
      site: parsedSite,
    });
    messages[parsedSite] = siteDictionary ?? {};
  } catch (error) {
    console.warn(`Failed to fetch dictionary for site=${parsedSite}, locale=${locale}:`, error);
    messages[parsedSite] = {};
  }

  return {
    locale,
    messages,
    getMessageFallback() {
      return '';
    },
  };
});
