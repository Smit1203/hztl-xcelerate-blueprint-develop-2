'use client';

import {
  RecommendationInitialState,
  WidgetDataType,
  useRecommendation,
  widget,
  RecommendationWidgetQuery,
} from '@sitecore-search/react';
import { tv } from 'tailwind-variants';
import { ArticleModel } from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';
import ArticleLayoutWrapper from 'helpers/GenericWrappers/ArticleLayoutWrapper/ArticleLayoutWrapper';
import { SearchLoading } from 'helpers/SearchLoading/SearchLoading';

type PopularArticlesProps = {
  articleLimit: number;
  searchSources?: string[];
};

export type PopularArticlesFinalProps = PopularArticlesProps & {
  staticProps: {
    currentTemplate: string;
    currentCategory: string;
  };
};

type InitialState = RecommendationInitialState<'itemsPerPage'>;
// Temporary usage of `any` until proper typings are available and suppressing the rule here
export const PopularArticlesComponent = (props: PopularArticlesFinalProps) => {
  const isCategoryPage = props.staticProps.currentTemplate === 'Article Category Page';
  const currentCategory = props.staticProps.currentCategory;
  const {
    widgetRef,
    queryResult: { isLoading, data },
  } = useRecommendation<ArticleModel, InitialState>({
    state: {
      itemsPerPage: props.articleLimit,
    },
    query: (query: RecommendationWidgetQuery) => {
      if (props.searchSources && props.searchSources.length > 0) {
        if (isCategoryPage && currentCategory) {
          query
            ?.getRequest()
            ?.setSources(props.searchSources)
            .setRecommendationsFilter({
              type: 'eq',
              name: 'type',
              value: 'articles',
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            .setRecommendationsFilter({
              type: 'eq',
              name: 'article_category',
              value: currentCategory,
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        } else {
          query
            ?.getRequest()
            .setSources(props.searchSources)
            .setRecommendationsFilter({
              type: 'eq',
              name: 'type',
              value: 'articles',
              //eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        }
      }
      return query;
    },
  });

  const { content: articles = [] } = data ?? {};

  const { base } = TAILWIND_VARIANTS();

  return (
    <div ref={widgetRef}>
      <SearchLoading isLoading={isLoading} />

      {!isLoading && articles.length > 0 ? (
        <div className={base()}>
          <ArticleLayoutWrapper articles={articles} />
        </div>
      ) : (
        !isLoading && <></>
      )}
    </div>
  );
};

const PopularArticlesWidget = widget(
  PopularArticlesComponent,
  WidgetDataType.RECOMMENDATION,
  'content'
);
export default PopularArticlesWidget;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
  },
});
