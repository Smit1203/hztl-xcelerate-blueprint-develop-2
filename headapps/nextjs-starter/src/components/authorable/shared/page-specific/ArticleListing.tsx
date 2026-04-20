'use client';

// Global
import React, { JSX } from 'react';
import { GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import graphqlClientFactory from 'lib/graphql-client-factory';
import ArticleCategoryTabsQuery, {
  ArticleCategoryTabsQueryResult,
} from 'components/authorable/shared/page-specific/ArticleCategoryTabs.graphql';
// Local
import { PageSpecific } from '.generated/PageSpecific/ArticleListing.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import ArticleSearchWidget from 'widgets/ArticleListing';
import { getTestProps } from 'lib/testing/utils';
import { useSiteSettings } from 'lib/hooks/sitecore/context';

export type SearchResultProps = PageSpecific.ArticleListing.ArticleListing_Component & {
  staticProps: {
    currentTemplate: string;
    currentCategory: string;
  };
};

const ArticleListing = (props: SearchResultProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const siteSettings = useSiteSettings();
  // Get search sources from site settings
  const searchSources = siteSettings?.globalSearchSourceId?.value;
  // Parse pipe-separated sources into array
  const sources = searchSources
    ? searchSources
        .split('|')
        .map((s) => s.trim())
        .filter((s) => s)
    : [];
  const rfkid = siteSettings?.globalSearchWidgetId?.value;
  return (
    <section
      id={id ? id : undefined}
      data-component="authorable/shared/page-specific/articlelisting"
      {...getTestProps(`component-article-listing-${props?.rendering?.uid}`)}
    >
      <ArticleSearchWidget
        rfkId={rfkid || ''}
        searchSources={sources}
        {...props}
        {...getTestProps(`article-search-widget`)}
      />
    </section>
  );
};

export const getComponentServerProps: GetComponentServerProps = async (_rendering, layoutData) => {
  const graphQLClient = graphqlClientFactory({});
  const result = await graphQLClient.request<ArticleCategoryTabsQueryResult>(
    ArticleCategoryTabsQuery,
    {
      contextItem: layoutData?.sitecore?.route?.itemId,
      language: layoutData?.sitecore?.context?.language,
    }
  );

  const currentTemplate = result?.currentPage?.template?.name || '';
  const currentCategory = result?.currentPage?.categoryName?.value || '';

  return {
    staticProps: {
      currentTemplate,
      currentCategory,
    },
  };
};

export const Default = withStandardComponentWrapper(ArticleListing);
