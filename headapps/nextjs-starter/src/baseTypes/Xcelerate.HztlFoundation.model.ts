import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { PageTypes, Project } from '.generated/Project.HztlFoundation.model';
import { Settings } from '.generated/Feature.HztlFoundation.model';
import { Base } from '.generated/Foundation.HztlFoundation.model';

/**
 * Represents the template /sitecore/templates/Feature/Experience Accelerator/SiteMetadata
 */
export type Favicon = {
  fields?: {
    Favicon?: ImageField;
  };
};

export type CustomMetadata = {
  fields?: {
    Attributes?: Field<string>;
  };
};

export type OpenGraphMetadata = {
  fields?: {
    OpenGraphTitle?: Field<string>;
    OpenGraphDescription?: Field<string>;
    OpenGraphImageUrl?: ImageField;
    OpenGraphType?: Field<string>;
    OpenGraphSiteName?: Field<string>;
    OpenGraphAdmins?: Field<string>;
    OpenGraphAppId?: Field<string>;
  };
};

export type SeoMetadata = {
  fields?: {
    MetaKeywords?: Field<string>;
    MetaDescription?: Field<string>;
  };
};

export type TwitterMetadata = {
  fields?: {
    TwitterTitle?: Field<string>;
    TwitterSite?: Field<string>;
    TwitterDescription?: Field<string>;
    TwitterImage?: ImageField;
    TwitterCardType?: Enum;
  };
};

export type Enum = {
  fields?: {
    Value?: Field<string>;
  };
};

export type Tag = {
  fields: {
    Title: {
      value: string;
    };
  };
};

export type Tags = {
  fields?: {
    SxaTags?: Tag[];
  };
};

export type XcelerateArticleDetailPage = PageTypes.ArticleDetailPage_Item & Tags;

export type XceleratePage = Project.HztlFoundation.GeneralPage_Item &
  CustomMetadata &
  SeoMetadata &
  Base.SeoMetadataPlus &
  TwitterMetadata &
  OpenGraphMetadata;

export type XcelerateSiteSetting = Settings.SiteSettings & Favicon & Base.SocialSharingLinks;
