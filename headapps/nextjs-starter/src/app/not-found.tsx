import Link from 'next/link';
import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  // Root-level not-found sits outside the [site]/[locale] segment, so no
  // request locale has been set yet. Seed it from defaults so next-intl
  // hooks (useLocale, useMessages) work inside Layout/Providers.
  setRequestLocale(`${scConfig.defaultSite}_${scConfig.defaultLanguage}`);
  const messages = await getMessages();

  let page = null;

  try {
    page = await client.getErrorPage(ErrorPage.NotFound, {
      site: scConfig.defaultSite,
      locale: scConfig.defaultLanguage,
    });
  } catch (error) {
    console.error('Error fetching 404 page', error);
  }

  if (page) {
    return (
      <NextIntlClientProvider locale={scConfig.defaultLanguage} messages={messages}>
        <Providers page={page}>
          <Layout page={page} />
        </Providers>
      </NextIntlClientProvider>
    );
  }

  return (
    <NextIntlClientProvider locale={scConfig.defaultLanguage} messages={messages}>
      <div style={{ padding: 10 }}>
        <h1>Page not found</h1>
        <p>This page does not exist.</p>
        <Link href="/">Go to the Home page</Link>
      </div>
    </NextIntlClientProvider>
  );
}
