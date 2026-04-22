import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { getSiteRoot } from 'lib/gql/getSiteRoot';
import type { SiteSettings, SiteAlert, ShareLink } from './types';

export async function getSiteSettings(
  siteName: string,
  locale: string
): Promise<SiteSettings | null> {
  if (!siteName) return null;

  const siteRootId = await getSiteRoot(siteName, locale);
  if (!siteRootId) return null;

  const client = graphqlClientFactory();
  const result = await client.request<GetSiteSettingsType>(SITE_SETTINGS_QUERY, {
    siteRootId,
    language: locale,
  });

  const row = result.search?.results?.[0];
  if (!row) return null;

  return {
    gtmId: row.gtmId?.jsonValue ?? null,
    favicon: row.favicon?.jsonValue ?? null,
    socialShareLinks: row.socialShareLinks?.jsonValue ?? null,
    siteAlerts: row.siteAlerts?.targetItems ?? null,
    globalSearchSourceId: row.globalSearchSourceId?.jsonValue ?? null,
    globalRecommendationWidgetId: row.globalRecommendationWidgetId?.jsonValue ?? null,
    globalSearchWidgetId: row.globalSearchWidgetId?.jsonValue ?? null,
    globalSearchPreviewWidgetId: row.globalSearchPreviewWidgetId?.jsonValue ?? null,
    noOfArticlesCount: row.noOfArticlesCount?.jsonValue ?? null,
    noOfRelatedArticlesCount: row.noOfRelatedArticlesCount?.jsonValue ?? null,
    noOfSearchResultsCount: row.noOfSearchResultsCount?.jsonValue ?? null,
    brandStyle: row.brandStyle?.jsonValue ?? null,
  };
}

type GetSiteSettingsType = {
  search?: {
    results?: Array<{
      gtmId?: { jsonValue: Field<string> };
      globalSearchSourceId?: { jsonValue: Field<string> };
      globalRecommendationWidgetId?: { jsonValue: Field<string> };
      globalSearchWidgetId?: { jsonValue: Field<string> };
      globalSearchPreviewWidgetId?: { jsonValue: Field<string> };
      favicon?: { jsonValue: ImageField };
      socialShareLinks?: { jsonValue: ShareLink[] };
      noOfArticlesCount?: { jsonValue: Field<number> };
      noOfRelatedArticlesCount?: { jsonValue: Field<number> };
      noOfSearchResultsCount?: { jsonValue: Field<number> };
      brandStyle?: { jsonValue: Field<string> };
      siteAlerts?: { targetItems: SiteAlert[] };
    }>;
  };
};

const SITE_SETTINGS_QUERY = `
  query GetSiteSettings($siteRootId: String!, $language: String!) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "f6950030-ae2f-471f-ac34-d8f90a51ac33" }
          { name: "_language", value: $language }
          { name: "_path", value: $siteRootId }
        ]
      }
    ) {
      results {
        ... on SiteSettings {
          brandStyle { jsonValue }
          gtmId { jsonValue }
          favicon { jsonValue }
          globalSearchSourceId { jsonValue }
          globalRecommendationWidgetId { jsonValue }
          globalSearchWidgetId { jsonValue }
          globalSearchPreviewWidgetId { jsonValue }
          socialShareLinks { jsonValue }
          noOfArticlesCount { jsonValue }
          noOfRelatedArticlesCount { jsonValue }
          noOfSearchResultsCount { jsonValue }
          siteAlerts {
            targetItems {
              ... on Alert {
                id
                alertText { value }
                alertCTA { jsonValue }
                alertType { jsonValue }
                startDate { jsonValue }
                endDate { jsonValue }
              }
            }
          }
        }
      }
    }
  }
`;
