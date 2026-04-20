import Link from 'next/link';
import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
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
      <Providers page={page}>
        <Layout page={page} />
      </Providers>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}
