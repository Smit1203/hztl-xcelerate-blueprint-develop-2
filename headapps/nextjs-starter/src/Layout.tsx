'use client';

/**
 * This Layout is needed for Starter Kit.
 */

// Global
import { Page, DesignLibrary } from '@sitecore-content-sdk/nextjs';
import React, { useRef, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import Scripts from 'src/Scripts';
import { PlaceholderWrapper } from './helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { SitecoreSearchWidgetsProviderWrapper } from 'widgets/WidgetProviderWrapper';
import { Brands, SiteName } from 'helpers/Constants/Constant';
import { GoogleTagManager } from '@next/third-parties/google';
import { BrandAndThemeProvider, getBrandForSiteName } from 'lib/context/BrandAndThemeContext';
import BackToTop from 'components/authorable/shared/site-structure/BackToTop/BackToTop';
import { useOnRouteChange } from 'lib/hooks/useOnRouteChange';
import { SpeedInsights } from '@vercel/speed-insights/react';

const TAILWIND_VARIANTS = tv({
  slots: {
    footer: ['bg-color-surface-surface'],
    footerContentContainer: ['w-full'],
    main: ['font-typography-body-font-family', 'overflow-x-clip'],
  },
  variants: {
    pageEditing: {
      true: {
        main: ['editing-mode'],
      },
      false: {
        main: ['prod-mode'],
      },
    },
  },
});

interface LayoutProps {
  page: Page;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';

  const { pageEditing } = layout.sitecore.context;
  const siteSettings = layout.sitecore?.context?.siteSettings ?? {};
  const { gtmId } = siteSettings;
  const mainRef = useRef<HTMLDivElement>(null);
  const disableSpeedInsights = process.env.NEXT_PUBLIC_DISABLE_SPEED_INSIGHTS === 'true';

  const siteName = page.siteName;
  const brand =
    (siteSettings?.brandStyle?.value?.trim() as Brands) ||
    getBrandForSiteName(siteName as SiteName);
  const googleTagManagerId = gtmId?.value;

  const importMapDynamic = () => import('.sitecore/import-map.client');

  // Focus on main div when route changes
  useOnRouteChange(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  });

  if (!googleTagManagerId) {
    console.warn('Google Tag Manager ID is missing. Google Analytics will not be rendered.');
  }

  /*
   * RENDERING
   */

  const { footer, footerContentContainer, main } = TAILWIND_VARIANTS({
    pageEditing: !!pageEditing,
  });

  return (
    <>
      <Scripts />
      {!disableSpeedInsights && <SpeedInsights />}
      <SitecoreSearchWidgetsProviderWrapper>
        <BrandAndThemeProvider brand={brand} applyToBody>
          <div className={mainClassPageEditing}>
            {mode.isDesignLibrary ? (
              <DesignLibrary loadImportMap={importMapDynamic} />
            ) : (
              <div className={main()} ref={mainRef} tabIndex={-1}>
                {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}

                {route && (
                  <PlaceholderWrapper
                    helpTextHideIf={true}
                    name="headless-header"
                    rendering={route}
                  />
                )}
                <main>
                  <div id="content">
                    {route && (
                      <PlaceholderWrapper
                        helpTextHideIf={true}
                        name="headless-main"
                        rendering={route}
                      />
                    )}
                  </div>
                </main>
                <footer className={footer()}>
                  <div className={footerContentContainer()}>
                    {route && (
                      <PlaceholderWrapper
                        helpTextHideIf={true}
                        name="headless-footer"
                        rendering={route}
                      />
                    )}
                  </div>
                </footer>
                <BackToTop />
              </div>
            )}
          </div>
        </BrandAndThemeProvider>
      </SitecoreSearchWidgetsProviderWrapper>
    </>
  );
};

export default Layout;
