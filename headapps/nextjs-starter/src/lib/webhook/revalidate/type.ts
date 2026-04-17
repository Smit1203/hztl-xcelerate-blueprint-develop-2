export type LayoutDataUpdate = {
  identifier: string;
  entity_definition: string;
  operation: string;
  entity_culture: string;
};

export type WebhookRequestBody = {
  invocation_id: string;
  updates: LayoutDataUpdate[];
  continues: boolean;
};

export type SitecoreItemUrl = {
  identifier: string;
  entity_culture: string;
};

export type TSlug = {
  url?: string;
};

export type TUrl = {
  path: string;
  siteName: string;
  hostName: string;
  scheme: string;
};

export type Tlanguage = {
  name: string;
};

export type TItem = {
  url: TUrl;
  id: string;
  language: Tlanguage;
  slug?: TSlug;
  ancestors?: TItem[];
  displayName: string;
};

export type TGetItemUrlRoot = {
  item: TItem;
};

export type TSitecoreItemQueryResult = {
  url: TUrl;
  language: string;
  slug?: string;
  slugAncestor?: string;
};
