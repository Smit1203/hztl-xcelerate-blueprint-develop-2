import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export interface SiteAlert {
  id: string;
  alertText: { value: string };
  alertCTA: { jsonValue: LinkField };
  alertType: { jsonValue: { fields?: { Value?: Field<string> } } };
  startDate: { jsonValue: Field<string> };
  endDate: { jsonValue: Field<string> };
}

export interface ShareLink {
  fields?: {
    name?: Field<string>;
    icon?: ImageField;
    url?: LinkField;
  };
}

export interface SiteSettings {
  gtmId?: Field<string> | null;
  favicon?: ImageField | null;
  socialShareLinks?: ShareLink[] | null;
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
