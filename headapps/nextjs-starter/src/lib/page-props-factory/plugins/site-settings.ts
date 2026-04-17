// Global
import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

// Generated
import { Data } from '.generated/Foundation.HztlFoundation.model';
import { GlobalData } from '.generated/Feature.HztlFoundation.model';

// Local
import { CustomSitecorePageProps } from 'lib/page-props';
import { Plugin } from 'lib/page-props-factory';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { getSiteRoot } from 'lib/gql/getSiteRoot';

export interface SiteSettings {
  gtmId?: Field<string> | null;
  favicon?: ImageField | null;
  socialShareLinks?: GlobalData.Share_Item[] | null;
  siteAlerts?: SiteAlert[] | null;
  globalSearchSourceId?: Field<string> | null;
  globalRecommendationWidgetId?: Field<string> | null;
  globalSearchWidgetId?: Field<string> | null;
  globalSearchPreviewWidgetId?: Field<string> | null;
  noOfArticlesCount?: Field<number> | null;
  noOfRelatedArticlesCount?: Field<number> | null;
  noOfSearchResultsCount?: Field<number> | null;
  brandStyle?: Field<string> | null;
}

export interface SiteAlert {
  id: string;
  alertText: { value: string };
  alertCTA: { jsonValue: LinkField };
  alertType: { jsonValue: Data.Enums.Enum_Item };
  startDate: { jsonValue: Field<string> };
  endDate: { jsonValue: Field<string> };
}

class SiteSettingsPlugin implements Plugin {
  order = 5; // Run after site plugin (order = 0)

  async exec(props: CustomSitecorePageProps) {
    if (props.notFound || !props.page) return props;

    const graphqlClient = graphqlClientFactory();

    // Get site name from props (set by site plugin)
    const siteName = props.page?.siteName;
    if (!siteName) {
      console.warn('Site name is not available in props, skipping site settings fetch');
      return props;
    }

    const locale = props.page?.locale ?? '';

    const siteRootId = await getSiteRoot(siteName, locale);
    if (!siteRootId) {
      console.warn('Site root ID not found, skipping site settings fetch');
      return props;
    }

    // Second query to get site settings
    const settingsResult = await graphqlClient.request<GetSiteSettingsType>(SITE_SETTINGS_QUERY, {
      siteRootId,
      language: locale,
    });

    // Transform the fields array into an object with field names as keys
    const siteSettingsResult = settingsResult.search?.results?.[0];

    const siteSettings = {
      gtmId: siteSettingsResult?.gtmId?.jsonValue ?? null,
      globalSearchSourceId: siteSettingsResult?.globalSearchSourceId?.jsonValue ?? null,
      globalRecommendationWidgetId:
        siteSettingsResult?.globalRecommendationWidgetId?.jsonValue ?? null,
      globalSearchWidgetId: siteSettingsResult?.globalSearchWidgetId?.jsonValue ?? null,
      globalSearchPreviewWidgetId:
        siteSettingsResult?.globalSearchPreviewWidgetId?.jsonValue ?? null,
      favicon: siteSettingsResult?.favicon?.jsonValue ?? null,
      socialShareLinks: siteSettingsResult?.socialShareLinks?.jsonValue ?? null,
      siteAlerts: siteSettingsResult?.siteAlerts?.targetItems ?? null,
      noOfArticlesCount: siteSettingsResult?.noOfArticlesCount.jsonValue ?? null,
      noOfRelatedArticlesCount: siteSettingsResult?.noOfRelatedArticlesCount.jsonValue ?? null,
      noOfSearchResultsCount: siteSettingsResult?.noOfSearchResultsCount.jsonValue ?? null,
      brandStyle: siteSettingsResult?.brandStyle?.jsonValue ?? null,
    };
    // Store transformed settings in context
    props.page.layout.sitecore.context.siteSettings = siteSettings;

    return props;
  }
}

export const siteSettingsPlugin = new SiteSettingsPlugin();

type GetSiteSettingsType = {
  search?: {
    results?: {
      gtmId: {
        jsonValue: Field<string>;
      };
      globalSearchSourceId: {
        jsonValue: Field<string>;
      };
      globalRecommendationWidgetId: {
        jsonValue: Field<string>;
      };
      globalSearchWidgetId: {
        jsonValue: Field<string>;
      };
      globalSearchPreviewWidgetId: {
        jsonValue: Field<string>;
      };
      favicon: {
        jsonValue: ImageField;
      };
      socialShareLinks: {
        jsonValue: GlobalData.Share_Item[];
      };
      noOfArticlesCount: {
        jsonValue: Field<number>;
      };
      noOfRelatedArticlesCount: {
        jsonValue: Field<number>;
      };
      noOfSearchResultsCount: {
        jsonValue: Field<number>;
      };
      brandStyle: {
        jsonValue: Field<string>;
      };
      siteAlerts: { targetItems: [] };
    }[];
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
          brandStyle {
            jsonValue
          }
          gtmId {
            jsonValue
          }
          favicon {
            jsonValue
          }
          globalSearchSourceId {
            jsonValue
          }
          globalRecommendationWidgetId {
            jsonValue
          }
          globalSearchWidgetId {
            jsonValue
          }
          globalSearchPreviewWidgetId {
            jsonValue
          }
          socialShareLinks {
            jsonValue
          }
          noOfArticlesCount {
            jsonValue
          }
          noOfRelatedArticlesCount {
            jsonValue
          }
          noOfSearchResultsCount {
            jsonValue
          }
          siteAlerts {
            targetItems {
              ... on Alert {
                id
                alertText {
                  value
                }
                alertCTA {
                  jsonValue
                }
                alertType {
                  jsonValue
                }
                startDate {
                  jsonValue
                }
                endDate {
                  jsonValue
                }
              }
            }
          }
        }
      }
    }
  }
`;
