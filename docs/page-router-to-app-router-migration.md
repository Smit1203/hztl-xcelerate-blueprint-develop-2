# Page Router to App Router Migration Document

## Context

This document describes every change needed to migrate the `nextjs-starter` project from Next.js **Page Router** (`src/pages/`) to **App Router** (`src/app/`). The project uses Next.js 15.3.6, React 19.2.1, and `@sitecore-content-sdk/nextjs` 1.3.2 with Sitecore XM Cloud.

**Current branch**: `feature/content-sdk-app-router-transfer`

---

## Table of Contents

1. [Phase 0: Pre-Migration Preparation](#phase-0-pre-migration-preparation)
2. [Phase 1: App Directory Structure + Route Switch](#phase-1-app-directory-structure--route-switch)
3. [Phase 2: Middleware Migration](#phase-2-middleware-migration)
4. [Phase 3: API Routes Migration](#phase-3-api-routes-migration)
5. [Phase 4: i18n Migration](#phase-4-i18n-migration)
6. [Phase 5: Component Client/Server Boundaries](#phase-5-component-clientserver-boundaries)
7. [Phase 6: ISR/Revalidation + Cleanup](#phase-6-isrrevalidation--cleanup)
8. [File-by-File Change Reference](#file-by-file-change-reference)

---

## Phase 0: Pre-Migration Preparation

All additive changes. Build must still pass with Page Router intact.

### 0.1 Install Dependencies

```bash
npm install next-intl@^4.3.5
```

Keep `next-localization` in `package.json` during transition.

### 0.2 Create i18n Config Files

**CREATE** `src/i18n/config.ts`

Why: It defines exactly which languages your application supports.
The Change: Instead of hardcoding language strings everywhere, you now have a single constant (locales). This ensures that if you add a new language (like de-DE), you update it in one place, and the TypeScript types (Locale) automatically update across your whole project.

```typescript
export const locales = ['en', 'es-MX', 'fr-CA', 'ar-AE'] as const;

export type Locale = (typeof locales)[number];
```

**CREATE** `src/i18n/routing.ts`

Why: It configures how URLs are handled (e.g., ://example.com).
The Change: By setting localeDetection: false, they are likely handing over the "logic" of choosing a language to Sitecore or a custom middleware. This prevents Next.js from accidentally redirecting a user based on their browser settings when Sitecore's CMS rules should take priority.

```typescript
import { defineRouting } from 'next-intl/routing';
import { locales } from './config';

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: 'en',
  localeDetection: false,
});
```

**CREATE** `src/i18n/request.ts`

request.ts: The "Data Fetcher" (The Big Shift)
This is the most important file for Sitecore developers.
The Sitecore Link: It uses client.getDictionary to pull translations directly from Sitecore.
The _ Logic: Notice the requested?.split('_') part. In the App Router, Sitecore often uses a "Composite Key" (like mySite_en) to pass both the Site Name and the Locale through the routing system.
Why it's here: In the Page Router, dictionary data was often fetched in getStaticProps. In the App Router, request.ts acts as a global configuration hook. It fetches the Sitecore Dictionary entries once per request on the server, making those translations available to any Server or Client component without props drilling.

```typescript
import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import client from 'src/lib/sitecore-client';

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  // Format: {site}_{locale} set by catch-all route via setRequestLocale
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
```

### 0.3 Create enrichPageContext Wrapper

**CREATE** `src/lib/page-props-factory/enrich-page-context.ts`

This reuses the existing plugins (`pageLanguagesPlugin`, `siteSettingsPlugin`, `svgCachePlugin`) without modification.

```typescript
import { Page } from '@sitecore-content-sdk/nextjs';
import { CustomSitecorePageProps } from 'lib/page-props';
import { pageLanguagesPlugin } from './plugins/page-languages';
import { siteSettingsPlugin } from './plugins/site-settings';
import { svgCachePlugin } from './plugins/svg-cache';
import { Plugin } from '.';

export type EnrichPageContextOptions = {
  site: string;
  locale: string;
};

export async function enrichPageContextForAppRouter(
  page: Page,
  options: EnrichPageContextOptions
): Promise<Page> {
  const enrichedPage = {
    ...page,
    siteName: page.siteName ?? options.site,
    locale: page.locale ?? options.locale,
  };

  let props: CustomSitecorePageProps = {
    page: enrichedPage,
    notFound: false,
  };

  const plugins: Plugin[] = [pageLanguagesPlugin, svgCachePlugin, siteSettingsPlugin];

  for (const plugin of plugins.sort((a, b) => a.order - b.order)) {
    try {
      props = await plugin.exec(props);
    } catch (error) {
      console.warn(`Plugin ${plugin.constructor.name} failed:`, error);
    }
  }

  const resultPage = props.page!;
  const context = resultPage.layout.sitecore.context as Record<string, unknown>;

  // Default variantId when not personalized
  if (context.variantId === undefined || context.variantId === null) {
    context.variantId = '_default';
  }

  return resultPage;
}
```

### 0.4 Create Component-Map / Import-Map Splits

The current `.sitecore/component-map.ts` and `.sitecore/import-map.ts` are auto-generated by the Content SDK. For App Router, we need client/server variants.

**CREATE** `.sitecore/component-map.client.ts`

```typescript
'use client';
// Re-export the full component map for client-side use (Providers.tsx)
export { default } from './component-map';
```

**CREATE** `.sitecore/import-map.client.ts`

```typescript
'use client';
// Re-export the full import map for client-side use
// This contains all imports including hooks, browser APIs, next/router, etc.
export { default } from './import-map';
```

**CREATE** `.sitecore/import-map.server.ts`

```typescript
// Server-safe import map - excludes browser APIs and hooks
// For Design Library server rendering
import {
  combineImportEntries,
  defaultImportEntries,
  ImportEntry,
} from '@sitecore-content-sdk/nextjs/codegen';

import { Placeholder, CdpHelper, useSitecore, Text, Image } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import { tv } from 'tailwind-variants';
import { getTestProps } from 'lib/testing/utils';
import { findComponent } from 'lib/utils/object-utils';
import { capitalizeFirstLetter } from 'lib/utils/string-utils';
import { toValidId } from 'lib/utils/validate-id-utils';
import formatDate from 'lib/utils/date-formatter';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';
import { createLinkField, isValidNavigationItem, getValidChildren } from 'lib/utils/navigation-utils';
import clsx from 'clsx';

const serverImportMap = [
  {
    module: '@sitecore-content-sdk/nextjs',
    exports: [
      { name: 'Placeholder', value: Placeholder },
      { name: 'CdpHelper', value: CdpHelper },
      { name: 'useSitecore', value: useSitecore },
      { name: 'Text', value: Text },
      { name: 'Image', value: Image },
    ],
  },
  {
    module: 'sitecore.config',
    exports: [{ name: 'default', value: scConfig }],
  },
  {
    module: 'tailwind-variants',
    exports: [{ name: 'tv', value: tv }],
  },
  {
    module: 'lib/testing/utils',
    exports: [{ name: 'getTestProps', value: getTestProps }],
  },
  {
    module: 'lib/utils/object-utils',
    exports: [{ name: 'findComponent', value: findComponent }],
  },
  {
    module: 'lib/utils/string-utils',
    exports: [{ name: 'capitalizeFirstLetter', value: capitalizeFirstLetter }],
  },
  {
    module: 'lib/utils/validate-id-utils',
    exports: [{ name: 'toValidId', value: toValidId }],
  },
  {
    module: 'lib/utils/date-formatter',
    exports: [{ name: 'default', value: formatDate }],
  },
  {
    module: 'lib/utils/style-param-utils',
    exports: [{ name: 'parseStyleParams', value: parseStyleParams }],
  },
  {
    module: 'lib/utils/cta-utils',
    exports: [{ name: 'getCtaStyle', value: getCtaStyle }],
  },
  {
    module: 'lib/utils/navigation-utils',
    exports: [
      { name: 'createLinkField', value: createLinkField },
      { name: 'isValidNavigationItem', value: isValidNavigationItem },
      { name: 'getValidChildren', value: getValidChildren },
    ],
  },
  {
    module: 'clsx',
    exports: [{ name: 'default', value: clsx }],
  },
] as ImportEntry[];

export default combineImportEntries(defaultImportEntries, serverImportMap);
```

> **Note**: The server import map excludes: `react` hooks, `next/router`, `next/head`, `next/navigation`, browser-only libraries (`@sitecore-cloudsdk/events/browser`, `js-cookie`, `country-flag-icons`), and all custom hooks that use browser APIs.

### 0.5 Validation

```bash
npm run build
```

Build must pass. No routing changes yet — Page Router is still active.

---

## Phase 1: App Directory Structure + Route Switch

**CRITICAL**: Next.js does NOT allow the same route in both `pages/` and `app/`. The catch-all `[[...path]]` route must be switched atomically — create the app structure AND delete the pages route files in the same step.

### 1.1 Root Layout

**CREATE** `src/app/layout.tsx` (replaces `src/pages/_document.tsx`)

```typescript
import 'assets/app.css';
import 'src/assets/themes/tokens.css';
import { supportedFonts } from 'lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClasses = supportedFonts.map((font) => font.variable).join(' ');
  const bodyClasses = [fontClasses, 'brand-root'].join(' ');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClasses} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

**What it replaces**: `src/pages/_document.tsx` which renders `<Html>`, `<Head>`, `<body className={fontClasses + ' brand-root'}>`, `<Main>`, `<NextScript>`.

### 1.2 Site Layout

**CREATE** `src/app/[site]/layout.tsx`

```typescript
// Load before anything else
import 'src/lib/preload';

import { draftMode } from 'next/headers';
import { ReactNode } from 'react';
import Bootstrap from 'src/Bootstrap';

type Props = {
  children: ReactNode;
  params: Promise<{
    site: string;
  }>;
};

export default async function SiteLayout({ children, params }: Props) {
  const { site } = await params;
  const { isEnabled } = await draftMode();

  return (
    <>
      <Bootstrap siteName={site} isPreviewMode={isEnabled} />
      {children}
    </>
  );
}
```

**What it replaces**: The `Bootstrap` rendering and `preload` import from `src/pages/_app.tsx`.

### 1.3 Locale Layout

**CREATE** `src/app/[site]/[locale]/layout.tsx`

```typescript
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: Promise<{
    site: string;
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { site, locale } = await params;

  // Tell next-intl which site+locale to use for dictionary fetching
  setRequestLocale(`${site}_${locale}`);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
```

**What it replaces**: The `<I18nProvider lngDict={dictionary} locale={locale}>` wrapper from `src/pages/_app.tsx`.

### 1.4 Main Page

**CREATE** `src/app/[site]/[locale]/[[...path]]/page.tsx` (replaces `src/pages/[[...path]].tsx`)

```typescript
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import { SiteInfo } from '@sitecore-content-sdk/nextjs';
import sites from '.sitecore/sites.json';
import { routing } from 'src/i18n/routing';
import scConfig from 'sitecore.config';
import client from 'src/lib/sitecore-client';
import { enrichPageContextForAppRouter } from 'src/lib/page-props-factory/enrich-page-context';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import graphqlClientFactory from 'lib/graphql-client-factory';
import GetParentItemQuery, {
  GetParentItemQueryResult,
} from 'components/authorable/shared/content/Metadata.graphql';

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();

  // Fetch page data
  let page;
  if (draft.isEnabled) {
    const editingParams = await searchParams;
    if (isDesignLibraryPreviewData(editingParams)) {
      page = await client.getDesignLibraryData(editingParams);
    } else {
      page = await client.getPreview(editingParams);
    }
  } else {
    page = await client.getPage(path ?? [], { site, locale });
  }

  if (!page) {
    notFound();
  }

  // Enrich context (languages, svgCache, siteSettings)
  page = await enrichPageContextForAppRouter(page, { site, locale });

  // Fetch parent item for Article Detail Pages (same logic as current getStaticProps)
  const route = page.layout.sitecore.route;
  let parentItem = null;
  if (route?.templateName === 'Article Detail Page' && route.itemId) {
    try {
      const graphQLClient = graphqlClientFactory({});
      const result = await graphQLClient.request<GetParentItemQueryResult>(GetParentItemQuery, {
        itemID: route.itemId,
        language: route.itemLanguage ?? page.locale ?? '',
      });
      parentItem = result?.item?.parent;
    } catch (e) {
      console.error('Error fetching parent item', e);
    }
  }

  // Get component data
  const components = (await import('.sitecore/component-map')).default;
  const componentProps = await client.getComponentData(page.layout, {}, components);

  return (
    <Providers page={page} componentProps={componentProps}>
      <Layout page={page} parentItem={parentItem} />
    </Providers>
  );
}

// Replaces getStaticPaths
export const generateStaticParams = async () => {
  if (process.env.NODE_ENV === 'development') return [];
  if (process.env.GENERATE_STATIC_PATHS?.toLowerCase() !== 'true') return [];

  try {
    return await client.getAppRouterStaticParams(
      sites.map((site: SiteInfo) => site.name),
      routing.locales.slice()
    );
  } catch (error) {
    console.error('Error fetching static params:', error);
    return [];
  }
};
```

**What it replaces**: `src/pages/[[...path]].tsx` — the `getStaticPaths`, `getStaticProps`, and `SitecorePage` component.

### 1.5 generateMetadata Export

**ADD to** `src/app/[site]/[locale]/[[...path]]/page.tsx` (or create as separate helper)

```typescript
// Add this export to page.tsx
export const generateMetadata = async ({ params, searchParams }: PageProps): Promise<Metadata> => {
  const { path, site, locale } = await params;
  const draft = await draftMode();

  let page = draft.isEnabled
    ? await client.getPreview(await searchParams)
    : await client.getPage(path ?? [], { site, locale });

  if (!page) return { title: 'Page' };

  page = await enrichPageContextForAppRouter(page, { site, locale });
  const route = page.layout.sitecore.route;
  const fields = route?.fields ?? {};
  const siteSettings = page.layout.sitecore?.context?.siteSettings ?? {};
  const faviconUrl = siteSettings?.favicon?.value?.src || '/favicon.ico';
  const isArticle = route?.templateName === 'Article Detail Page';

  return {
    title: fields.pageTitle?.value?.toString() || 'Page',
    description: fields.MetaDescription?.value,
    keywords: fields.MetaKeywords?.value,
    icons: { icon: faviconUrl },
    robots: fields.robotsMetaTag?.value || 'index',
    alternates: fields.canonicalUrl?.value ? { canonical: fields.canonicalUrl.value } : undefined,
    openGraph: {
      title: fields.OpenGraphTitle?.value,
      description: fields.OpenGraphDescription?.value,
      images: fields.OpenGraphImageUrl?.value?.src
        ? [{ url: fields.OpenGraphImageUrl.value.src }]
        : undefined,
      type: isArticle ? 'article' : 'website',
      siteName: fields.OpenGraphSiteName?.value,
    },
    twitter: {
      title: fields.TwitterTitle?.value,
      site: fields.TwitterSite?.value,
      description: fields.TwitterDescription?.value,
      images: fields.TwitterImage?.value?.src ? [fields.TwitterImage.value.src] : undefined,
      card: fields.TwitterCardType?.fields?.Value?.value || 'summary',
    },
  };
};
```

**What it replaces**: `src/components/authorable/shared/content/Metadata.tsx` which uses `next/head`.

### 1.6 Error Pages

**CREATE** `src/app/not-found.tsx` (replaces `src/pages/404.tsx`)

```typescript
import Link from 'next/link';
import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

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
```

**CREATE** `src/app/global-error.tsx` (replaces `src/pages/500.tsx` and `src/Render500Fallback.tsx`)

```typescript
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

export default function GlobalError({ error: _error, reset }: GlobalErrorProps) {
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

  if (loading) return <div>Loading...</div>;

  if (page) {
    return (
      <Providers page={page}>
        <Layout page={page} />
      </Providers>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>500 Internal Server Error</h1>
      <p>There is a problem with the resource you are looking for.</p>
      <button onClick={() => reset()} style={{ marginRight: 10 }}>
        Try Again
      </button>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}
```

### 1.7 Modify Existing Files

**MODIFY** `src/Bootstrap.tsx` — Add `'use client'`, change props interface:

Here's the diff:

Old (Page Router):

- No 'use client' directive
- Props: SitecorePageProps (full page object with page.mode, page.siteName, etc.)
- Checks page.mode.isNormal to decide if it's editing mode
- Depends on page?.siteName in the useEffect dependency

New (App Router):

- Has 'use client' — required because it uses useEffect (a React hook), and in App Router all hook-using components must be explicitly marked as client components
- Props: `{ siteName: string; isPreviewMode: boolean }` — only receives what it needs, because the site layout (src/app/[site]/layout.tsx) is a Server Component that calls draftMode() and reads the site param, then passes just these two values down
- Checks isPreviewMode directly instead of page.mode.isNormal
- No longer needs the full SitecorePageProps import

Why the change: In the Page Router, _app.tsx had the full page props and passed them to Bootstrap. In App Router, the site layout is a Server Component — it can't pass a complex serializable Page object as props to a client component easily. Instead it extracts just the two pieces Bootstrap actually needs (siteName from the URL param, isPreviewMode from draftMode()) and passes those as simple strings/booleans. This is cleaner and follows the App Router pattern of keeping the client boundary minimal.

```typescript
'use client';
import { useEffect, JSX } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import scConfig from 'sitecore.config';

const Bootstrap = ({
  siteName,
  isPreviewMode,
}: {
  siteName: string;
  isPreviewMode: boolean;
}): JSX.Element | null => {
  useEffect(() => {
    if (isPreviewMode) {
      console.debug('Browser Events SDK is not initialized in edit and preview modes');
      return;
    }
    if (scConfig.api.edge?.clientContextId) {
      CloudSDK({
        sitecoreEdgeUrl: scConfig.api.edge.edgeUrl,
        sitecoreEdgeContextId: scConfig.api.edge.clientContextId,
        siteName: siteName || scConfig.defaultSite,
        enableBrowserCookie: true,
        cookieDomain: window.location.hostname.replace(/^www\./, ''),
      })
        .addEvents()
        .initialize();
    }
  }, [siteName, isPreviewMode]);

  return null;
};

export default Bootstrap;
```

**MODIFY** `src/Providers.tsx` — Add `'use client'`, use client component-map:

```typescript
'use client';
import React from 'react';
import {
  ComponentPropsCollection,
  ComponentPropsContext,
  Page,
  SitecoreProvider,
} from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import components from '.sitecore/component-map.client';

export default function Providers({
  children,
  componentProps,
  page,
}: {
  children: React.ReactNode;
  componentProps?: ComponentPropsCollection;
  page: Page;
}) {
  return (
    <ComponentPropsContext value={componentProps || {}}>
      <SitecoreProvider
        componentMap={components}
        api={scConfig.api}
        page={page}
        loadImportMap={() => import('.sitecore/import-map.client')}
      >
        {children}
      </SitecoreProvider>
    </ComponentPropsContext>
  );
}
```

**MODIFY** `src/Layout.tsx` — Remove `Metadata` component usage, remove `next/head` based `SitecoreStyles`. Add `'use client'` since it uses `useRef` and `useOnRouteChange`:

- Remove: `import Metadata from 'components/authorable/shared/content/Metadata';`
- Remove: `import SitecoreStyles from 'components/content-sdk/SitecoreStyles';`
- Remove: `{route && <Metadata route={route} parentItem={parentItem} />}`
- Remove: `<SitecoreStyles layoutData={layout} />`
- Add: `'use client'` at top of file
- Change `DesignLibrary` import map to use `import-map.client`

**MODIFY** `src/Scripts.tsx` — Add `'use client'` at top of file.

### 1.8 Delete Page Router Files

- **DELETE** `src/pages/[[...path]].tsx`
- **DELETE** `src/pages/_app.tsx`
- **DELETE** `src/pages/_document.tsx`
- **DELETE** `src/pages/404.tsx`
- **DELETE** `src/pages/500.tsx`
- **KEEP** `src/pages/api/` (migrated in Phase 3)
- **KEEP** `src/pages/feaas/render.tsx` (migrated in Phase 3)

---

## Phase 2: Middleware Migration

### 2.1 Update Multisite Middleware

**MODIFY** `src/lib/middleware/plugins/multisite.ts`

```typescript
// BEFORE:
import { MultisiteMiddleware } from '@sitecore-content-sdk/nextjs/middleware';

// AFTER:
import { AppRouterMultisiteMiddleware } from '@sitecore-content-sdk/nextjs/middleware';

export const multisiteMiddleware = new AppRouterMultisiteMiddleware({
  sites,
  ...scConfig.api.edge,
  ...scConfig.multisite,
  skip: () => false,
});
```

### 2.2 Create Locale Middleware

**CREATE** `src/lib/middleware/plugins/locale.ts`

```typescript
import { LocaleMiddleware } from '@sitecore-content-sdk/nextjs/middleware';
import sites from '.sitecore/sites.json';
import { locales } from 'src/i18n/config';
import scConfig from 'sitecore.config';

export const localeMiddleware = new LocaleMiddleware({
  sites,
  locales: [...locales],
  defaultLanguage: scConfig.defaultLanguage || 'en',
  skip: () => false,
});
```

### 2.3 Update Middleware Chain

**MODIFY** `src/middleware.ts`

```typescript
import { type NextRequest, type NextFetchEvent, NextResponse } from 'next/server';
import { defineMiddleware } from '@sitecore-content-sdk/nextjs/middleware';
import scConfig from 'sitecore.config';
import { localeMiddleware } from 'lib/middleware/plugins/locale';
import { multisiteMiddleware } from 'lib/middleware/plugins/multisite';
import { redirectsMiddleware } from 'lib/middleware/plugins/redirects';
import { personalizeMiddleware } from 'lib/middleware/plugins/personalize';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!scConfig.api?.edge?.contextId && !scConfig.api?.local?.apiHost) {
    return NextResponse.next();
  }

  return defineMiddleware(
    localeMiddleware,       // NEW: must be BEFORE multisite
    multisiteMiddleware,    // CHANGED: AppRouterMultisiteMiddleware
    redirectsMiddleware,
    personalizeMiddleware
    // smallCaseMiddleware removed — review if still needed for App Router
  ).exec(req, ev);
}

export const config = {
  matcher: [
    '/',
    '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)',
  ],
};
```

---

## Phase 3: API Routes Migration

Convert all `pages/api/*.ts` to `app/api/*/route.ts` format.

### 3.1 Editing Config

**CREATE** `src/app/api/editing/config/route.ts`

```typescript
import { createEditingConfigRouteHandler } from '@sitecore-content-sdk/nextjs/editing';
import components from '.sitecore/component-map.client';
import metadata from '.sitecore/metadata.json';

export const { GET, OPTIONS } = createEditingConfigRouteHandler({
  components,
  metadata,
});
```

**DELETE** `src/pages/api/editing/config.ts`

### 3.2 Editing Render

**CREATE** `src/app/api/editing/render/route.ts`

```typescript
import { createEditingRenderRouteHandlers } from '@sitecore-content-sdk/nextjs/editing';
import scConfig from 'sitecore.config';
import client from 'src/lib/sitecore-client';

export const { GET, POST, OPTIONS } = createEditingRenderRouteHandlers({
  client,
  config: scConfig,
});
```

**DELETE** `src/pages/api/editing/render.ts`

### 3.3 Robots

**CREATE** `src/app/api/robots/route.ts`

```typescript
import { createRobotsRouteHandler } from '@sitecore-content-sdk/nextjs';
import client from 'src/lib/sitecore-client';
import sites from '.sitecore/sites.json';

export const dynamic = 'force-dynamic';
export const { GET } = createRobotsRouteHandler({ client, sites });
```

**DELETE** `src/pages/api/robots.ts`

### 3.4 Sitemap

**CREATE** `src/app/api/sitemap/route.ts`

```typescript
import { createSitemapRouteHandler } from '@sitecore-content-sdk/nextjs';
import client from 'src/lib/sitecore-client';
import sites from '.sitecore/sites.json';

export const dynamic = 'force-dynamic';
export const { GET } = createSitemapRouteHandler({ client, sites });
```

**DELETE** `src/pages/api/sitemap.ts`

### 3.5 Healthz

**CREATE** `src/app/api/healthz/route.ts`

```typescript
import { NextResponse } from 'next/server';

export const GET = async () => {
  return new NextResponse('Healthy', { status: 200 });
};
```

**DELETE** `src/pages/api/healthz.ts`

### 3.6 Admin Revalidate

**CREATE** `src/app/api/admin/revalidate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export interface RevalidateRequestBody {
  url?: string;
  secret?: string;
  siteName?: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RevalidateRequestBody;

  if (body.secret !== process.env.ISR_REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  if (!body.url) {
    return NextResponse.json({ revalidated: false, error: 'No path provided' }, { status: 400 });
  }

  try {
    const pathSegments = body.url.split('/').filter(Boolean);
    const hasLanguagePrefix = /^[a-z]{2}(-[A-Z]{2})?$/.test(pathSegments[0] || '');
    const languagePrefix = hasLanguagePrefix ? pathSegments[0] : '';
    const remainingSegments = hasLanguagePrefix ? pathSegments.slice(1) : pathSegments;

    // App Router path format: /<site>/<locale>/<path>
    // No more _site_ prefix — multisite is handled by [site] segment
    const structuredPath = body.siteName
      ? `/${body.siteName}/${languagePrefix || 'en'}/${remainingSegments.join('/')}`
      : `/${pathSegments.join('/')}`;

    revalidatePath(structuredPath);

    return NextResponse.json({ revalidated: true, path: structuredPath });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

**DELETE** `src/pages/api/admin/revalidate/index.ts`

### 3.7 Admin Webhook

**CREATE** `src/app/api/admin/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { WebhookRequestBody } from 'lib/webhook/revalidate/type';
import { fetchItemUrl } from 'lib/webhook/revalidate/utils';
import { RevalidationService } from 'lib/webhook/revalidate/revalidate-service';
import { waitUntil } from '@vercel/functions';

interface WebhookResponse {
  revalidated: boolean;
  error?: string;
}

const BATCH_SIZE = Number(process.env.PROCESS_BATCH_SIZE || '25');

async function processRevalidationBatches(
  updates: WebhookRequestBody['updates'],
  revalidationService: RevalidationService
) {
  try {
    const layoutUpdates = await revalidationService.processLayoutUpdates(updates);
    const urls = await Promise.all(
      layoutUpdates.map(async ({ identifier, entity_culture }) => {
        try {
          return await fetchItemUrl(identifier.replace('-layout', ''), entity_culture);
        } catch (error) {
          console.log(`Failed to fetch item URL: ${error}`);
          return null;
        }
      })
    );

    const validUrls = urls.filter((url): url is NonNullable<typeof url> => url !== null);

    for (let i = 0; i < validUrls.length; i += BATCH_SIZE) {
      const batch = validUrls.slice(i, i + BATCH_SIZE);
      try {
        // Use revalidatePath instead of res.revalidate
        for (const url of batch) {
          revalidatePath(url);
        }
      } catch (error) {
        console.error(`Error processing batch:`, error);
      }
    }
  } catch (error) {
    console.error('Revalidation process failed:', error);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<WebhookResponse>> {
  const revalidationService = new RevalidationService(process.env.ISR_REVALIDATE_SECRET || '');

  try {
    if (!revalidationService.isWebhookEnabled()) {
      return NextResponse.json({ revalidated: false, error: 'Webhook disabled' });
    }

    const secret = req.headers.get('secret');
    const isValidSecret = await revalidationService.validateSecret(secret ?? undefined);
    if (!isValidSecret) {
      return NextResponse.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { updates } = (await req.json()) as WebhookRequestBody;
    waitUntil(processRevalidationBatches(updates, revalidationService));

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json({ revalidated: false, error: 'Webhook processed unsuccessfully' });
  }
}
```

**DELETE** `src/pages/api/admin/webhook/index.ts`

### 3.8 SendGrid Contact Form

**CREATE** `src/app/api/forms/SendGridContact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

// Same logic as current handler, but using NextRequest/NextResponse
// Key change: req.body -> await req.json()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone, message } = body;

    // ... same validation and SendGrid logic as current file ...
    // Replace: res.status(200).json({}) -> return NextResponse.json({})
    // Replace: res.status(400).json({}) -> return NextResponse.json({}, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**DELETE** `src/pages/api/forms/SendGridContact.ts`

### 3.9 Dynamic Script

**CREATE** `src/app/api/script/[...scriptPath]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { isGuid } from 'lib/utils/string-utils';

// Key change: req.query -> params
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ scriptPath: string[] }> }
) {
  const { scriptPath } = await params;

  if (!scriptPath || !Array.isArray(scriptPath)) {
    return NextResponse.redirect(new URL('/404', req.url));
  }

  const itemPath = scriptPath.join('/').replaceAll('.js', '');
  const fullScriptPath = `${isGuid(itemPath) ? '' : '/'}` + itemPath;
  const scriptContent = await getScriptByPath(fullScriptPath);

  if (!scriptContent) {
    return NextResponse.redirect(new URL('/404', req.url));
  }

  return new NextResponse(scriptContent, {
    status: 200,
    headers: { 'content-type': 'application/javascript' },
  });
}

// getScriptByPath function stays the same
```

**DELETE** `src/pages/api/script/[...scriptPath].ts`

### 3.10 Error Log

**CREATE** `src/app/api/error/log/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import scConfig from 'sitecore.config';
import client from 'lib/sitecore-client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('language') || scConfig.defaultLanguage;
  const error = searchParams.get('error');

  if (error) {
    console.error('Client side error:');
    try {
      console.error(JSON.parse(error));
    } catch {
      console.error(error);
    }
  }

  const errorPages = await client.getErrorPages({
    site: scConfig.defaultSite,
    locale,
  });

  return new NextResponse(errorPages?.serverErrorPagePath, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

**DELETE** `src/pages/api/error/log.ts`

### 3.11 FEAAS Render Page

**DELETE** `src/pages/feaas/render.tsx` — This is handled differently in App Router via the editing render route.

### 3.12 Final Cleanup

After all API routes are validated:

```bash
rm -rf src/pages/api/
rm -rf src/pages/feaas/
rm -rf src/pages/  # if empty
```

---

## Phase 4: i18n Migration

### 4.1 Update useDictionary Hook

**MODIFY** `src/lib/hooks/useDictionary.ts`

```typescript
// BEFORE:
import { useI18n } from 'next-localization';

const useDictionary = () => {
  const i18n = useI18n();
  const getDictionaryValue = useCallback(
    (key: string, fallback?: string) => i18n.t(key) ?? fallback,
    [i18n]
  );
  return { getDictionaryValue };
};

// AFTER:
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

const useDictionary = () => {
  const t = useTranslations();
  const getDictionaryValue = useCallback(
    (key: string, fallback?: string) => {
      try {
        return t(key) || fallback || key;
      } catch {
        return fallback || key;
      }
    },
    [t]
  );
  return { getDictionaryValue };
};

export default useDictionary;
```

**Impact**: Zero changes needed in any of the ~30 consumer files. The public API (`getDictionaryValue(key, fallback?)`) stays identical.

### 4.2 Update next.config.js

**MODIFY** `next.config.js`

```javascript
// ADD at top:
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// REMOVE the i18n block:
// i18n: {
//   locales: ['en', 'es-MX', 'fr-CA', 'ar-AE'],
//   defaultLocale: process.env.SITECORE_DEFAULT_LANGUAGE || 'en',
// },

// CHANGE the export:
module.exports = () => {
  const finalNextConfig = Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
  return withNextIntl(finalNextConfig);  // Wrap with next-intl
};
```

### 4.3 Remove Old Dependency

```bash
npm uninstall next-localization
```

---

## Phase 5: Component Client/Server Boundaries

### 5.1 Add `'use client'` Directives

Nearly all authorable components use React hooks. Add `'use client'` to the top of every component file that uses `useState`, `useEffect`, `useRef`, `useRouter`, `useDictionary`, `useSitecore`, etc.

This affects ~70+ files under `src/components/authorable/`.

### 5.2 Migrate `next/router` to `next/navigation`

Files using `next/router` (~11 files):

**MODIFY** `src/lib/hooks/useOnRouteChange.ts`

```typescript
// BEFORE:
import { RouterEvent, useRouter } from 'next/router';
// router.events.on(eventName, callback)

// AFTER:
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useOnRouteChange = (callback: () => void) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      callback();
    }
  }, [pathname, callback]);
};
```

Other files using `useRouter` from `next/router` need to switch to `next/navigation`:
- `useRouter()` -> `useRouter()` from `next/navigation` (different API: no `query`, no `events`, no `asPath`)
- `router.push('/path')` stays the same
- `router.query.param` -> use `useSearchParams()` or `useParams()`
- `router.asPath` -> use `usePathname()`
- `router.locale` -> get from page context or `useLocale()` from next-intl

### 5.3 Update Import Map

**MODIFY** `.sitecore/import-map.ts` (or the auto-generated version)

```typescript
// CHANGE:
import { useRouter } from 'next/router';
// TO:
import { useRouter } from 'next/navigation';
```

### 5.4 Remove next/head Usage

Files using `next/head`:
- `src/components/content-sdk/SitecoreStyles.tsx` — Replace `<Head><link>` with direct `<link>` tags
- `src/components/authorable/shared/content/Metadata.tsx` — DELETE or keep as legacy (replaced by `generateMetadata`)
- `src/NotFound.tsx` — Remove `<Head>` usage, use plain HTML

---

## Phase 6: ISR/Revalidation + Cleanup

### 6.1 Revalidation Path Format Change

**Key change**: In Page Router, paths used `_site_<siteName>` prefix. In App Router, the `[site]` segment handles this.

```
// Page Router path:
/_site_cloudflairhosting/en/some-page

// App Router path:
/cloudflairhosting/en/some-page
```

Update the webhook and revalidation services accordingly (done in Phase 3).

### 6.2 Final Cleanup

- **DELETE** `src/pages/` directory entirely
- **DELETE** `src/Render500Fallback.tsx` (replaced by `global-error.tsx`)
- **DELETE** `src/NotFound.tsx` (replaced by `app/not-found.tsx`)
- Remove `next-localization` from `package.json` if not already done

---

## File-by-File Change Reference

### Files to CREATE

| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | Locale definitions |
| `src/i18n/routing.ts` | next-intl routing config |
| `src/i18n/request.ts` | next-intl server config |
| `src/lib/page-props-factory/enrich-page-context.ts` | App Router page enrichment |
| `.sitecore/component-map.client.ts` | Client component map |
| `.sitecore/import-map.client.ts` | Client import map |
| `.sitecore/import-map.server.ts` | Server import map |
| `src/app/layout.tsx` | Root layout |
| `src/app/[site]/layout.tsx` | Site layout |
| `src/app/[site]/[locale]/layout.tsx` | Locale layout |
| `src/app/[site]/[locale]/[[...path]]/page.tsx` | Main page + generateMetadata |
| `src/app/not-found.tsx` | Global 404 |
| `src/app/global-error.tsx` | Global 500 |
| `src/app/[site]/[locale]/[[...path]]/not-found.tsx` | Site-specific 404 |
| `src/app/api/editing/config/route.ts` | Editing config |
| `src/app/api/editing/render/route.ts` | Editing render |
| `src/app/api/robots/route.ts` | Robots.txt |
| `src/app/api/sitemap/route.ts` | Sitemap |
| `src/app/api/healthz/route.ts` | Health check |
| `src/app/api/admin/revalidate/route.ts` | On-demand revalidation |
| `src/app/api/admin/webhook/route.ts` | Webhook handler |
| `src/app/api/forms/SendGridContact/route.ts` | Contact form |
| `src/app/api/script/[...scriptPath]/route.ts` | Dynamic scripts |
| `src/app/api/error/log/route.ts` | Error logging |
| `src/lib/middleware/plugins/locale.ts` | Locale middleware |

### Files to MODIFY

| File | Changes |
|------|---------|
| `package.json` | Add `next-intl`, remove `next-localization` |
| `next.config.js` | Remove `i18n` block, add `withNextIntl` wrapper |
| `src/Bootstrap.tsx` | Add `'use client'`, change props to `{ siteName, isPreviewMode }` |
| `src/Providers.tsx` | Add `'use client'`, use `component-map.client`, add `loadImportMap` |
| `src/Layout.tsx` | Remove Metadata/SitecoreStyles, add `'use client'` |
| `src/Scripts.tsx` | Add `'use client'` |
| `src/middleware.ts` | Add `localeMiddleware`, replace multisite class |
| `src/lib/middleware/plugins/multisite.ts` | `MultisiteMiddleware` -> `AppRouterMultisiteMiddleware` |
| `src/lib/hooks/useDictionary.ts` | `next-localization` -> `next-intl` |
| `src/lib/hooks/useOnRouteChange.ts` | `next/router` events -> `usePathname` |
| `src/components/content-sdk/SitecoreStyles.tsx` | Remove `next/head` |
| ~70 component files | Add `'use client'` directive |
| ~11 files using `next/router` | Switch to `next/navigation` |

### Files to DELETE

| File | Replaced By |
|------|------------|
| `src/pages/[[...path]].tsx` | `src/app/[site]/[locale]/[[...path]]/page.tsx` |
| `src/pages/_app.tsx` | App layouts (root, site, locale) |
| `src/pages/_document.tsx` | `src/app/layout.tsx` |
| `src/pages/404.tsx` | `src/app/not-found.tsx` |
| `src/pages/500.tsx` | `src/app/global-error.tsx` |
| `src/pages/feaas/render.tsx` | Editing render route handler |
| `src/pages/api/editing/config.ts` | `src/app/api/editing/config/route.ts` |
| `src/pages/api/editing/render.ts` | `src/app/api/editing/render/route.ts` |
| `src/pages/api/robots.ts` | `src/app/api/robots/route.ts` |
| `src/pages/api/sitemap.ts` | `src/app/api/sitemap/route.ts` |
| `src/pages/api/healthz.ts` | `src/app/api/healthz/route.ts` |
| `src/pages/api/admin/revalidate/index.ts` | `src/app/api/admin/revalidate/route.ts` |
| `src/pages/api/admin/webhook/index.ts` | `src/app/api/admin/webhook/route.ts` |
| `src/pages/api/forms/SendGridContact.ts` | `src/app/api/forms/SendGridContact/route.ts` |
| `src/pages/api/script/[...scriptPath].ts` | `src/app/api/script/[...scriptPath]/route.ts` |
| `src/pages/api/error/log.ts` | `src/app/api/error/log/route.ts` |
| `src/Render500Fallback.tsx` | `src/app/global-error.tsx` |
| `src/NotFound.tsx` | `src/app/not-found.tsx` |
