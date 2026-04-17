import { useEffect, JSX } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { SiteInfo, StaticPath } from '@sitecore-content-sdk/nextjs';
import { handleEditorFastRefresh } from '@sitecore-content-sdk/nextjs/utils';
import { CustomSitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import HandleMockError, { getMockError } from 'helpers/ErrorHandling/HandleMockError';
import Layout from 'src/Layout';
import NotFound from 'src/NotFound';
import GetParentItemQuery, {
  GetParentItemQueryResult,
} from 'components/authorable/shared/content/Metadata.graphql';
import graphqlClientFactory from 'lib/graphql-client-factory';
import Providers from 'src/Providers';
import client from 'lib/sitecore-client';
import sites from '.sitecore/sites.json';

const SitecorePage = ({
  notFound,
  componentProps,
  mockError,
  parentItem,
  page,
}: CustomSitecorePageProps & {
  parentItem?: GetParentItemQueryResult['item']['parent'];
}): JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (mockError) {
    return <HandleMockError {...mockError} />;
  }

  if (notFound || !page) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  return (
    <Providers componentProps={componentProps} page={page}>
      <Layout page={page} parentItem={parentItem} />
    </Providers>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async (context) => {
  // Fallback, along with revalidate in getStaticProps (below),
  // enables Incremental Static Regeneration. This allows us to
  // leave certain (or all) paths empty if desired and static pages
  // will be generated on request (development mode in this example).
  // Alternatively, the entire sitemap could be pre-rendered
  // ahead of time (non-development mode in this example).
  // See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.GENERATE_STATIC_PATHS?.toLowerCase() === 'true'
  ) {
    try {
      paths = await client.getPagePaths(
        sites.map((site: SiteInfo) => site.name),
        context?.locales || []
      );
    } catch (error) {
      console.error('Error occurred while fetching static paths');
      console.error(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  return {
    paths,
    fallback,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);
  const mockError = getMockError(context);

  if (mockError?.throwStaticPropsError) {
    throw Error('mock error getStaticProps');
  }

  const route = props.page?.layout.sitecore.route;
  let parentItem = null;
  if (route?.templateName === 'Article Detail Page' && route.itemId) {
    try {
      const graphQLClient = graphqlClientFactory({});
      const result = await graphQLClient.request<GetParentItemQueryResult>(GetParentItemQuery, {
        itemID: route.itemId,
        language: route.itemLanguage ?? props.page?.locale ?? '',
      });

      parentItem = result?.item?.parent;
    } catch (e) {
      console.error('Error fetching parent item in getStaticProps', e);
    }
  }

  const revalidateTimer = !!process.env.ISR_REVALIDATE_TIMER
    ? parseInt(process.env.ISR_REVALIDATE_TIMER)
    : 300;

  props.mockError = mockError;
  return {
    props: {
      ...props,
      parentItem,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: revalidateTimer, // In seconds
    notFound: !mockError && props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};

export default SitecorePage;
