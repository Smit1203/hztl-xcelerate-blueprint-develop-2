'use client';

import { tv } from 'tailwind-variants';
import {
  FilterAnd,
  FilterAnyOf,
  FilterEqual,
  FilterNot,
  SearchResultsWidgetQuery,
  WidgetDataType,
  useSearchResults,
  widget,
} from '@sitecore-search/react';
import ArticleLayoutWrapper from 'helpers/GenericWrappers/ArticleLayoutWrapper/ArticleLayoutWrapper';
import { ArticleModel } from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';
import { SearchLoading } from 'helpers/SearchLoading/SearchLoading';

type RelatedArticlesProps = {
  currentArticleId?: string;
  currentArticleTags?: string[];
  articleLimit?: number;
  searchSources?: string[];
};

export const RelatedArticlesComponent = ({
  currentArticleId,
  currentArticleTags,
  articleLimit,
  searchSources,
}: RelatedArticlesProps) => {
  const {
    widgetRef,
    queryResult: { isLoading, data },
  } = useSearchResults<ArticleModel>({
    query: (query: SearchResultsWidgetQuery) => {
      // Filter to exclude the current article from results
      const filterNotCurrentArticle = new FilterNot(new FilterEqual('id', currentArticleId));

      // Filter to include only articles that have at least one of the current article's tags
      const filterArticleTags = new FilterAnyOf('article_tags', currentArticleTags);

      const filterArticles = new FilterEqual('type', 'articles');

      // Combine both filters: exclude current article AND include only articles with matching tags
      const filterAnd = new FilterAnd([filterArticles, filterNotCurrentArticle, filterArticleTags]);

      if (searchSources && searchSources.length > 0) {
        query.getRequest().setSources(searchSources).setSearchFilter(filterAnd);
      }
      return query;
    },
  });

  const { content: articles = [] } = data ?? {};

  // Sort articles based on number of matching tags
  const sortedArticles = [...articles].sort((a, b) => {
    const aMatchingTags =
      a.article_tags?.filter((tag) => currentArticleTags?.includes(tag) ?? false).length || 0;
    const bMatchingTags =
      b.article_tags?.filter((tag) => currentArticleTags?.includes(tag) ?? false).length || 0;
    return bMatchingTags - aMatchingTags; // Sort in descending order
  });

  const articlesToShow = sortedArticles.slice(0, articleLimit);
  const { base } = TAILWIND_VARIANTS();
  return (
    <div ref={widgetRef}>
      <SearchLoading isLoading={isLoading} />
      {!isLoading && articles.length > 0 ? (
        <div className={base()}>
          <ArticleLayoutWrapper articles={articlesToShow} />
        </div>
      ) : (
        !isLoading && <></>
      )}
    </div>
  );
};

const RelatedArticlesWidget = widget(
  RelatedArticlesComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);
export default RelatedArticlesWidget;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
  },
});
