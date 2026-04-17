// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { PageSpecific } from '.generated/PageSpecific/PopularArticles.model';
import ArticleCategoryTabsQuery, {
  ArticleCategoryTabsQueryResult,
} from 'components/authorable/shared/page-specific/ArticleCategoryTabs.graphql';
import { withStandardComponentWrapper } from 'helpers/HOC';
import PopularArticlesWidget from 'widgets/PopularArticles';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { getTestProps } from 'lib/testing/utils';
import { useSiteSettings } from 'lib/hooks/sitecore/context';

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

export type PopularArticlesProps = PageSpecific.PopularArticles.PopularArticles_Component & {
  staticProps: {
    currentTemplate: string;
    currentCategory: string;
  };
};

const PopularArticles = (props: PopularArticlesProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const articleLimit = props?.fields?.numberOfArticles?.value
    ? props?.fields?.numberOfArticles.value
    : 3;

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
  const rfkid = siteSettings?.globalRecommendationWidgetId?.value;
  const { base, titleStyle } = TAILWIND_VARIANTS();

  return (
    <section
      className={base()}
      id={id ? id : undefined}
      data-component="authorable/shared/page-specific/populararticles"
      {...getTestProps(`component-popular-articles-${props?.rendering?.uid}`)}
    >
      <PlainTextWrapper
        className={titleStyle()}
        field={props?.fields?.title}
        tag="h2"
        {...getTestProps(`title`)}
      />
      <PopularArticlesWidget
        rfkId={rfkid || ''}
        articleLimit={articleLimit}
        searchSources={sources}
        staticProps={props.staticProps}
        {...getTestProps(`popular-articles-widget`)}
      />
    </section>
  );
};

export const Default = withStandardComponentWrapper(PopularArticles);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['flex', 'flex-col', 'gap-spacing-spacing-24', 'text-component-feature-title'],
    titleStyle: [
      'text-component-feature-title',
      'font-typography-header-font-family',
      'text-typography-header-medium-font-size',
      'leading-typography-line-height-medium',
      'font-bold',
    ],
  },
});
