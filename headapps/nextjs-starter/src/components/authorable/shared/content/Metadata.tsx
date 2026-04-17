import React from 'react';
import Head from 'next/head';
import {
  XceleratePage,
  XcelerateArticleDetailPage,
} from 'src/baseTypes/Xcelerate.HztlFoundation.model';
import { GetParentItemQueryResult } from 'components/authorable/shared/content/Metadata.graphql';
import useDictionary from 'lib/hooks/useDictionary';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const Metadata = ({
  route,
  parentItem,
}: {
  route: (XceleratePage | XcelerateArticleDetailPage) & {
    templateName?: string;
    itemId?: string;
    itemLanguage?: string;
  };
  parentItem?: GetParentItemQueryResult['item']['parent'];
}) => {
  const { siteSettings } = useSitecore().page.layout.sitecore.context;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const isArticle = route?.templateName === 'Article Detail Page';
  const fields = (route as XceleratePage).fields ?? {};

  // Common meta fields
  const metaFields = {
    pageTitle: fields.pageTitle,
    MetaDescription: fields.MetaDescription,
    MetaKeywords: fields.MetaKeywords,
    OpenGraphTitle: fields.OpenGraphTitle,
    OpenGraphDescription: fields.OpenGraphDescription,
    OpenGraphImageUrl: fields.OpenGraphImageUrl,
    OpenGraphSiteName: fields.OpenGraphSiteName,
    OpenGraphAdmins: fields.OpenGraphAdmins,
    OpenGraphAppId: fields.OpenGraphAppId,
    TwitterTitle: fields.TwitterTitle,
    TwitterSite: fields.TwitterSite,
    TwitterDescription: fields.TwitterDescription,
    TwitterImage: fields.TwitterImage,
    TwitterCardType: fields.TwitterCardType,
    canonicalUrl: fields.canonicalUrl,
    robotsMetaTag: fields.robotsMetaTag,
  };
  let articleMetaFields;
  if (isArticle) {
    const articleFields = (route as XcelerateArticleDetailPage).fields ?? {};
    articleMetaFields = {
      authorName: articleFields.authorName,
      publishedDate: articleFields.publishedDate,
      heading: articleFields.heading,
      subHeading: articleFields.subHeading,
      sxaTags: articleFields.SxaTags,
      image: articleFields.image,
    };
  }
  const { getDictionaryValue } = useDictionary();
  const articleDictionaryValue = getDictionaryValue('Articles') || 'Articles';
  const pagesDictionaryValue = getDictionaryValue('Pages') || 'Pages';
  const faviconUrl = siteSettings?.favicon?.value?.src || '/favicon.ico';
  const canonicalUrlValue = metaFields.canonicalUrl?.value || currentUrl;
  const robotsMetaTagValue = metaFields.robotsMetaTag?.value || 'index';
  const ogType =
    route?.templateName === 'Article Detail Page' ? articleDictionaryValue : pagesDictionaryValue;
  const ogItemId = route?.itemId ? route.itemId.replace(/-/g, '') : '';

  return (
    <Head>
      <title>{metaFields.pageTitle?.value?.toString() || 'Page'}</title>
      {metaFields.MetaDescription?.value && (
        <meta content={metaFields.MetaDescription.value} name="description" />
      )}
      {metaFields.MetaKeywords?.value && (
        <meta content={metaFields.MetaKeywords.value} name="keywords" />
      )}
      <link href={faviconUrl} rel="icon" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={robotsMetaTagValue} />
      {canonicalUrlValue && <link rel="canonical" href={canonicalUrlValue} />}

      {/* OpenGraph Metadata */}
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      {ogItemId && <meta property="og:itemid" content={ogItemId} />}
      {metaFields.OpenGraphTitle?.value && (
        <meta property="og:title" content={metaFields.OpenGraphTitle.value} />
      )}
      {metaFields.OpenGraphDescription?.value && (
        <meta property="og:description" content={metaFields.OpenGraphDescription.value} />
      )}
      {metaFields.OpenGraphImageUrl?.value?.src && (
        <meta property="og:image" content={metaFields.OpenGraphImageUrl.value.src} />
      )}
      <meta property="og:type" content={ogType} />
      {metaFields.OpenGraphSiteName?.value && (
        <meta property="og:site_name" content={metaFields.OpenGraphSiteName.value} />
      )}
      {metaFields.OpenGraphAdmins?.value && (
        <meta property="og:admins" content={metaFields.OpenGraphAdmins.value} />
      )}
      {metaFields.OpenGraphAppId?.value && (
        <meta property="og:app_id" content={metaFields.OpenGraphAppId.value} />
      )}

      {/* Twitter Metadata */}
      {metaFields.TwitterTitle?.value && (
        <meta name="twitter:title" content={metaFields.TwitterTitle.value} />
      )}
      {metaFields.TwitterSite?.value && (
        <meta name="twitter:site" content={metaFields.TwitterSite.value} />
      )}
      {metaFields.TwitterDescription?.value && (
        <meta name="twitter:description" content={metaFields.TwitterDescription.value} />
      )}
      {metaFields.TwitterImage?.value?.src && (
        <meta name="twitter:image" content={metaFields.TwitterImage.value.src} />
      )}
      {metaFields.TwitterCardType?.fields?.Value?.value && (
        <meta name="twitter:card" content={metaFields.TwitterCardType.fields.Value.value} />
      )}

      {/* Article-specific Metadata */}
      {isArticle && (
        <>
          {articleMetaFields?.heading?.value && (
            <meta name="article:title" content={articleMetaFields.heading.value} />
          )}
          {articleMetaFields?.subHeading?.value && (
            <meta name="article:subheading" content={articleMetaFields.subHeading.value} />
          )}
          {articleMetaFields?.authorName?.value && (
            <meta name="article:authorname" content={articleMetaFields.authorName.value} />
          )}
          {articleMetaFields?.publishedDate?.value && (
            <meta name="article:publisheddate" content={articleMetaFields.publishedDate.value} />
          )}
          {articleMetaFields?.image?.value?.src && (
            <meta name="article:image" content={articleMetaFields?.image.value.src} />
          )}
          {Array.isArray(articleMetaFields?.sxaTags) && articleMetaFields?.sxaTags?.length > 0 && (
            <meta
              name="article:keywords"
              content={articleMetaFields?.sxaTags
                ?.map((tag) => tag?.fields?.Title?.value)
                .filter(Boolean)
                .join(', ')}
            />
          )}
          {/* Parent meta tags, only for articles */}
          {parentItem?.categoryName?.value && (
            <>
              <meta name="article:categoryname" content={parentItem.categoryName.value} />
            </>
          )}
        </>
      )}
    </Head>
  );
};

export default Metadata;
