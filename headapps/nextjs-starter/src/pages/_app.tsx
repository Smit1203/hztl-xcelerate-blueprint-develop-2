// Load before anything else
import 'src/lib/preload';

import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { ErrorBoundary } from 'react-error-boundary';
import { CustomSitecorePageProps } from 'lib/page-props';
import Bootstrap from 'src/Bootstrap';
import { Render500Fallback } from 'src/Render500Fallback';
import 'assets/app.css';
import 'src/assets/themes/index.css';
import { JSX, useLayoutEffect } from 'react';
import scConfig from 'sitecore.config';
import { supportedFonts } from 'lib/fonts';

function App({ Component, pageProps, router }: AppProps<CustomSitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const locale = pageProps.page?.locale || scConfig.defaultLanguage;

  // Use LayoutEffect to ensure the body classes are applied immediately after the component is mounted
  useLayoutEffect(() => {
    // Add the supported fonts to the body to ensure they are available for the entire page
    document.body.classList.add(...supportedFonts.map((font) => font.variable));
  }, []);
  return (
    <>
      {/* Add contentStyles inline instead of separate link to avoid separate request blocking rendering*/}

      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider lngDict={dictionary} locale={locale}>
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary, error }) => (
            <Render500Fallback
              router={router}
              locale={locale}
              Component={Component}
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Component {...rest} />
        </ErrorBoundary>
      </I18nProvider>
    </>
  );
}

export default App;
