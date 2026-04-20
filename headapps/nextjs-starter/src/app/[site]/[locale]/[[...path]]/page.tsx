import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import { SiteInfo } from '@sitecore-content-sdk/nextjs';
import sites from '.sitecore/sites.json';
import { routing } from 'src/i18n/routing';
import client from 'src/lib/sitecore-client';
import { enrichPageContextForAppRouter } from 'src/lib/page-props-factory/enrich-page-context';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

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

  page = await enrichPageContextForAppRouter(page, { site, locale });

  const components = (await import('.sitecore/component-map')).default;
  const componentProps = await client.getComponentData(page.layout, {}, components);

  return (
    <Providers page={page} componentProps={componentProps}>
      <Layout page={page} />
    </Providers>
  );
}

export const generateMetadata = async ({ params, searchParams }: PageProps): Promise<Metadata> => {
  const { path, site, locale } = await params;
  const draft = await draftMode();

  let page = draft.isEnabled
    ? await client.getPreview(await searchParams)
    : await client.getPage(path ?? [], { site, locale });

  if (!page) return { title: 'Page' };

  page = await enrichPageContextForAppRouter(page, { site, locale });
  const route = page.layout.sitecore.route;
  const fields = (route?.fields ?? {}) as Record<string, { value?: string | { src?: string } }>;
  const siteSettings =
    (page.layout.sitecore?.context?.siteSettings as {
      favicon?: { value?: { src?: string } };
    }) ?? {};
  const faviconUrl = siteSettings?.favicon?.value?.src || '/favicon.ico';
  const isArticle = route?.templateName === 'Article Detail Page';

  const getVal = (key: string) => {
    const f = fields[key];
    return typeof f?.value === 'string' ? f.value : undefined;
  };
  const getImg = (key: string) => {
    const f = fields[key];
    return typeof f?.value === 'object' ? f.value?.src : undefined;
  };

  return {
    title: getVal('pageTitle') || 'Page',
    description: getVal('MetaDescription'),
    keywords: getVal('MetaKeywords'),
    icons: { icon: faviconUrl },
    robots: getVal('robotsMetaTag') || 'index',
    alternates: getVal('canonicalUrl') ? { canonical: getVal('canonicalUrl') } : undefined,
    openGraph: {
      title: getVal('OpenGraphTitle'),
      description: getVal('OpenGraphDescription'),
      images: getImg('OpenGraphImageUrl')
        ? [{ url: getImg('OpenGraphImageUrl') as string }]
        : undefined,
      type: isArticle ? 'article' : 'website',
      siteName: getVal('OpenGraphSiteName'),
    },
    twitter: {
      title: getVal('TwitterTitle'),
      site: getVal('TwitterSite'),
      description: getVal('TwitterDescription'),
      images: getImg('TwitterImage') ? [getImg('TwitterImage') as string] : undefined,
      card: 'summary',
    },
  };
};

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
