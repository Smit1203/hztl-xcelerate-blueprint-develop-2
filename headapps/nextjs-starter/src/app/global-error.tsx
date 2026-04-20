'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ErrorPage, Page } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Providers from 'src/Providers';
import Layout from 'src/Layout';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadErrorPage() {
      try {
        const errorPage = await client.getErrorPage(ErrorPage.InternalServerError, {
          site: scConfig.defaultSite,
          locale: scConfig.defaultLanguage,
        });
        setPage(errorPage);
      } catch (e) {
        console.error('Failed to load Sitecore error page', e);
        setPage(null);
      }
      setLoading(false);
    }
    loadErrorPage();
  }, []);

  if (loading) {
    return (
      <html>
        <body>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  if (page) {
    return (
      <html>
        <body>
          <Providers page={page}>
            <Layout page={page} />
          </Providers>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body>
        <div style={{ padding: 10 }}>
          <h1>500 Internal Server Error</h1>
          <p>There is a problem with the resource you are looking for.</p>
          <button onClick={() => reset()} style={{ marginRight: 10 }}>
            Try Again
          </button>
          <Link href="/">Go to the Home page</Link>
        </div>
      </body>
    </html>
  );
}
