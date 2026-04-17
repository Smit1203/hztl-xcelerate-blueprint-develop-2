import { NextComponentType, NextPageContext } from 'next';
import { useState, useEffect, useCallback } from 'react';
import { useOnRouteChange } from './lib/hooks/useOnRouteChange';
import { AppInitialProps } from 'next/app';
import { CustomSitecorePageProps } from './lib/page-props';
import { FallbackProps } from 'react-error-boundary';
import { Router } from 'next/router';
import { DefaultServerError } from './pages/500';

/** Renders the 500 error page when there's a client-side error */
export function Render500Fallback({
  router,
  locale,
  Component,
  error,
  resetErrorBoundary,
}: {
  /** Note: This `Router` is not the same as `NextRouter` from `useRouter` */
  router: Router;
  locale: string;
  Component: NextComponentType<NextPageContext, CustomSitecorePageProps, CustomSitecorePageProps>;
  error: FallbackProps['error'];
  resetErrorBoundary: FallbackProps['resetErrorBoundary'];
}) {
  const [staticProps, setStaticProps] = useState<AppInitialProps<CustomSitecorePageProps>>();
  const [failedToLoadErrorPage, setFailedToLoadErrorPage] = useState(false);

  const onResetError = useCallback(() => {
    resetErrorBoundary();
    setStaticProps(undefined);
    setFailedToLoadErrorPage(false);
  }, [resetErrorBoundary]);

  // Reset error state when route changes.
  // Without this, the error page will still show even when user navigates
  useOnRouteChange(onResetError);

  // Fetch the data
  useEffect(() => {
    if (!staticProps) {
      try {
        fetchData();
      } catch {
        setFailedToLoadErrorPage(true);
      }
    }
    async function fetchData() {
      // For an Error object (created with `new Error()` just normal stringify doesn't work, this ensures it gets the properties)
      const errorJson = JSON.stringify(error, Object.getOwnPropertyNames(error));
      // Gets the path of 500 page.
      // This needs to be an API call because we can only fetch error page info on the server.
      const query = new URLSearchParams({
        language: locale,
        error: errorJson,
      });
      // Log the error and get path for server error page.
      const errorPathResponse = await fetch(`/api/error/log?${query.toString()}`);
      const errorPath = await errorPathResponse.text();

      // Now that we have the path, gets the href for the data json of the 500 page
      const dataHref = router.pageLoader.getDataHref({ href: errorPath, asPath: errorPath });

      const response = await fetch(dataHref);
      const responseBody = await response.json();
      setStaticProps(responseBody);
    }
  }, [error, locale, router.pageLoader, staticProps]);

  if (failedToLoadErrorPage) {
    return <DefaultServerError />;
  }
  if (!staticProps) {
    return <></>;
  }

  return <Component {...staticProps.pageProps} />;
}
