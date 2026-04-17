import { FilterAnd, FilterEqual, SearchResultsWidgetQuery } from '@sitecore-search/react';

// Global
import {
  WidgetDataType,
  useSearchResults,
  widget,
  SearchResultsInitialState,
} from '@sitecore-search/react';
import { tv } from 'tailwind-variants';

// Local
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { PageSpecific } from '.generated/PageSpecific/ArticleListing.model';
import ArticleCardWrapper, {
  ArticleModel,
} from 'helpers/GenericWrappers/ArticleCardWrapper/ArticleCardWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import useDictionary from 'lib/hooks/useDictionary';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SearchLoading } from 'helpers/SearchLoading/SearchLoading';
import { PageTypes } from '.generated/Project.HztlFoundation.model';
import { getTestProps } from 'lib/testing/utils';
import { useCurrentPage } from 'lib/hooks/sitecore/context';

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'page'>;

export type ArticleListingProps = PageSpecific.ArticleListing.ArticleListing_Component & {
  staticProps: {
    currentTemplate: string;
    currentCategory: string;
  };
  searchSources?: string[];
};

export const ArticleSearchResultsComponent = (props: ArticleListingProps) => {
  const isCategoryPage = props.staticProps.currentTemplate === 'Article Category Page';
  const currentCategory = props.staticProps.currentCategory;
  const {
    widgetRef,
    actions: { onPageNumberChange },
    query,
    state: { page },
    queryResult: {
      isFetching,
      isLoading,
      isSuccess,
      data: { content: articles, total_item: totalItems = 0 } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    state: {
      page: 1,
      itemsPerPage: 12,
    },
    query: (query: SearchResultsWidgetQuery) => {
      const filters = [new FilterEqual('type', 'articles')];
      if (isCategoryPage && currentCategory) {
        filters.push(new FilterEqual('article_category', currentCategory));
      }
      const finalFilter = filters.length > 1 ? new FilterAnd(filters) : filters[0];
      query.getRequest().setSearchFilter(finalFilter);
      // Use provided sources if available
      if (props?.searchSources && props.searchSources?.length > 0) {
        query.getRequest().setSources(props.searchSources);
      }
      return query;
    },
  });

  const [articlesList, setArticlesList] = useState<ArticleModel[]>([]);
  const { getDictionaryValue } = useDictionary();
  const router = useRouter();

  useEffect(() => {
    setArticlesList([]);
    const filters = [new FilterEqual('type', 'articles')];
    if (currentCategory && isCategoryPage) {
      filters.push(new FilterEqual('article_category', currentCategory));
    }
    query.getRequest().setSearchFilter(new FilterAnd(filters));
    if (onPageNumberChange) {
      onPageNumberChange({ page: 1 });
    }
  }, [router.asPath, query, currentCategory, isCategoryPage, onPageNumberChange]);

  useEffect(() => {
    if (isSuccess) {
      setArticlesList((prev) => prev.concat(articles || []));
    }
  }, [articles, isSuccess]);

  const {
    base,
    mainTitleStyle,
    articleCardWrapper,
    viewMoreButtonWrapper,
    viewMoreButton,
    noArticleStyle,
    loadMoreTextStyle,
  } = TAILWIND_VARIANTS();

  const currentPage = useCurrentPage<PageTypes.ArticleLandingPage>();
  const { articleListTitle } = currentPage?.fields ?? {};

  return (
    <div ref={widgetRef} className={base()}>
      <PlainTextWrapper
        className={mainTitleStyle()}
        field={articleListTitle}
        tag="h2"
        {...getTestProps(`headline`)}
      />

      {!isLoading && articlesList?.length > 0 ? (
        <div className={articleCardWrapper()}>
          {articlesList.map((article) => {
            return (
              <ArticleCardWrapper
                key={article.id}
                article={article}
                isHorizontalCardLayout={false}
              />
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <PlainTextWrapper
            className={noArticleStyle()}
            field={{ value: getDictionaryValue('NoArticles') || 'No articles' }}
            tag="p"
            {...getTestProps(`no-articles-text`)}
          />
        )
      )}
      <SearchLoading isLoading={isFetching} />
      {articlesList.length !== totalItems && !isFetching && (
        <div className={viewMoreButtonWrapper()}>
          <button
            className={viewMoreButton()}
            onClick={() => {
              onPageNumberChange({ page: page + 1 });
            }}
            {...getTestProps(`view-more-btn`)}
          >
            <SvgIcon icon="accordion-plus" size="s" />
            <PlainTextWrapper
              className={loadMoreTextStyle()}
              field={{ value: getDictionaryValue('LoadMore') || 'Load More' }}
              tag="p"
              {...getTestProps(`view-more-text`)}
            />
          </button>
        </div>
      )}
    </div>
  );
};

const ArticleSearchWidget = widget(
  ArticleSearchResultsComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);
export default ArticleSearchWidget;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['flex', 'flex-col', 'gap-6'],
    mainTitleStyle: [
      'text-component-feature-title',
      'font-typography-header-font-family',
      'text-typography-header-medium-font-size',
      'font-bold',
      'leading-[38.4px]',
    ],
    articleCardWrapper: [
      'grid',
      'grid-cols-1',
      'sm:grid-cols-2',
      'lg:grid-cols-4',
      'gap-6',
      'm-auto',
    ],
    viewMoreButtonWrapper: ['m-auto'],
    viewMoreButton: [
      'flex',
      'items-center',
      'py-spacing-spacing-16',
      'px-spacing-spacing-24',
      'gap-spacing-spacing-8',
      'border-general-border-width-button',
      'border-component-button-primary-outline-border',
      'rounded-general-border-radius-button',
      'bg-component-button-primary-outline-bg',
      'hover:bg-component-button-primary-outline-bg-hover',
      'hover:border-general-border-width-button',
      'hover:component-button-primary-outline-border-hover',
    ],
    noArticleStyle: ['text-center', 'text-lg', 'font-semibold', 'text-color-text-text'],
    loadMoreTextStyle: [
      'text-component-button-primary-outline-text',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-semibold',
      'leading-6',
    ],
  },
});
