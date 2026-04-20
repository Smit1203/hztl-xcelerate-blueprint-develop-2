'use client';

// Global
import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import {
  WidgetDataType,
  useSearchResults,
  widget,
  SearchResultsWidgetQuery,
} from '@sitecore-search/react';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tv } from 'tailwind-variants';

// Local
import { SvgIcon } from 'helpers/SvgIcon';
import { useFacetUrlSync } from 'lib/hooks/search/useFacetUrlSync';
import { SearchLoading } from 'helpers/SearchLoading/SearchLoading';
import SearchArticleCardWrapper from 'helpers/GenericWrappers/SearchArticleCardWrapper/SearchArticleCardWrapper';
import SearchPagination from 'components/authorable/shared/page-specific/SearchResult/SearchPagination';
import SearchSortOrder from 'components/authorable/shared/page-specific/SearchResult/SearchSort';
import SearchFilterFacetsWrapper from 'components/authorable/shared/page-specific/SearchResult/SearchFilterFacetsWrapper';
import PreviewSearchListComponent from 'widgets/SearchPreview';
import useDictionary from 'lib/hooks/useDictionary';
import { useScrollElementIntoView } from 'lib/hooks/useScrollElementIntoView';
import SearchSelectedFilterTags from 'components/authorable/shared/page-specific/SearchResult/SearchSelectedFilterTags';
import { getTestProps } from 'lib/testing/utils';
import { useSiteSettings } from 'lib/hooks/sitecore/context';

type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
  eyebrow?: string;
};

type SearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
  searchSources?: string[];
};

type InitialState = SearchResultsInitialState<
  'itemsPerPage' | 'keyphrase' | 'page' | 'sortType' | 'selectedFacets'
>;

export const SearchResultsWithInputComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
  searchSources,
}: SearchResultsProps) => {
  const { getDictionaryValue } = useDictionary();
  const [mobileFilterToogle, setMobileFilterToogle] = useState<boolean>(false);
  // Ref to focus overlay when it opens
  const overlayRef = useRef<HTMLDivElement>(null);
  // Track if overlay should be focused after opening
  const [shouldFocusOverlay, setShouldFocusOverlay] = useState(false);

  // Focus overlay when it opens
  useEffect(() => {
    if (mobileFilterToogle && shouldFocusOverlay && overlayRef.current) {
      overlayRef.current.focus();
      setShouldFocusOverlay(false);
    }
  }, [mobileFilterToogle, shouldFocusOverlay]);

  // Ensure that facets are synced with url and get initial facets.
  const initialFacetsFromUrl = useFacetUrlSync();

  const searchParams = useSearchParams();
  const queryParam = searchParams?.get('q') ?? '';

  const keyphrase = queryParam || defaultKeyphrase;

  const searchResults = useSearchResults<ArticleModel, InitialState>({
    config: {
      // Not strictly needed, but depending on how facets are configured, it can ensure the correct type is used.
      defaultFacetType: 'text',
    },
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: keyphrase,
      selectedFacets: initialFacetsFromUrl,
    },
    query: (query: SearchResultsWidgetQuery) => {
      query.getRequest().setSources(searchSources ?? []);
      return query;
    },
  });

  const siteSettings = useSiteSettings();
  const rfkid = siteSettings?.globalSearchPreviewWidgetId?.value;

  const {
    widgetRef,
    state,
    queryResult: { isFetching, data },
  } = searchResults;

  const {
    total_item: totalItems = 0,
    sort: { choices: sortChoices = [] } = {},
    facet: facets = [],
    content: articles = [],
  } = data ?? {};

  const { itemsPerPage, sortType, page } = state;
  const [searchText, setSearchText] = useState<string>('');

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const articleCardsRef = useRef<HTMLDivElement>(null);

  useScrollElementIntoView(articleCardsRef.current, {
    scrollTargetId: 'search-result-cards',
  });

  useEffect(() => {
    const hasQParam = searchParams?.has('q') ?? false;
    setSearchText(hasQParam ? (searchParams?.get('q') ?? '') : '');
  }, [searchParams]);

  const {
    base,
    filtersSection,
    mainContentSection,
    resultCards,
    paginationWrapper,
    searchAndSortWrapper,
    searchKeywordWrapper,
    mobileFilterWrapper,
    desktopFilterWrapper,
    sortByWrapper,
    filterButtonText,
    filterOverLayWrapper,
    overLayCloseWrapper,
    overLayContentWrapper,
    mobileSearchWrapper,
    filteredTags,
    noResults,
    totalSearchKeywordStyle,
    filterTagWrapper,
    closeIcon,
  } = TAILWIND_VARIANTS();

  return (
    <div ref={widgetRef} id="search-result-cards" {...getTestProps(`search-result-cards`)}>
      <div className={base()} ref={articleCardsRef}>
        <div className={filtersSection()}>
          <div className={desktopFilterWrapper()}>
            <SearchFilterFacetsWrapper facets={facets} {...getTestProps(`facets-wrapper`)} />
          </div>
        </div>
        <div className={mainContentSection()}>
          <div className={mobileSearchWrapper()}>
            <PreviewSearchListComponent
              rfkId={rfkid || ''}
              defaultItemsPerPage={6}
              hasSearchFromSearchPage={false}
              searchSources={searchSources}
              {...getTestProps(`preview-search-list-mobile`)}
            />
          </div>
          <div className={searchAndSortWrapper()}>
            <button
              onClick={() => {
                setMobileFilterToogle(true);
                setShouldFocusOverlay(true);
              }}
              className={mobileFilterWrapper()}
              aria-label="Open filters"
              {...getTestProps(`open-filters-button`)}
            >
              <SvgIcon
                className="w-[21px] h-[20px]"
                icon="filter-lines"
                viewBox="0 0 21 20"
                size="s"
                fill="none"
                aria-hidden="true"
              />
              <span className={filterButtonText()} {...getTestProps(`filter-button-text`)}>
                {getDictionaryValue('Filters') || 'Filter'}
              </span>
            </button>
            <div className={searchKeywordWrapper()}>
              <PreviewSearchListComponent
                rfkId={rfkid || ''}
                defaultItemsPerPage={6}
                hasSearchFromSearchPage={false}
                searchSources={searchSources}
                {...getTestProps(`preview-search-list`)}
              />
            </div>
            <div className={sortByWrapper()}>
              <SearchSortOrder
                options={sortChoices}
                selected={sortType}
                {...getTestProps(`search-sort-order`)}
              />
            </div>
          </div>
          <div className={filteredTags()}>
            <SearchSelectedFilterTags
              className={filterTagWrapper()}
              {...getTestProps(`search-selected-filter-tags`)}
            />
          </div>
          <div className={resultCards()}>
            <SearchLoading isLoading={isFetching} {...getTestProps(`search-loading`)} />
            <div className={totalSearchKeywordStyle()} {...getTestProps(`total`)}>
              {totalItems}{' '}
              {searchText
                ? `${getDictionaryValue('resultsFor') || 'results for'} "${searchText}"`
                : getDictionaryValue('results') || 'results'}{' '}
            </div>
            {!isFetching && (
              <>
                {articles.map((a) => (
                  <SearchArticleCardWrapper
                    key={a.id}
                    article={a as ArticleModel}
                    {...getTestProps(`search-article-card-wrapper`)}
                  />
                ))}
              </>
            )}
          </div>

          {totalItems > 0 && !isFetching && (
            <div className={paginationWrapper()}>
              <SearchPagination currentPage={page} totalPages={totalPages} {...getTestProps(``)} />
            </div>
          )}
          {totalItems === 0 && !isFetching && (
            <div className={noResults()}>
              <h3 {...getTestProps(`no-results-text`)}>
                {getDictionaryValue('NoResults') || 'No results'}
              </h3>
            </div>
          )}
        </div>

        {mobileFilterToogle && (
          <div
            ref={overlayRef}
            className={filterOverLayWrapper()}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            aria-label="Filters"
            {...getTestProps(`mobile-filters`)}
          >
            <div className={overLayCloseWrapper()}>
              <button
                onClick={() => setMobileFilterToogle(false)}
                aria-label="Close Filters"
                {...getTestProps(`mobile-close-btn`)}
              >
                <SvgIcon
                  className={closeIcon()}
                  icon="tag-close"
                  size="s"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                />
              </button>
            </div>
            <div className={overLayContentWrapper()}>
              <SearchFilterFacetsWrapper
                facets={facets}
                isInOverlay={true}
                {...getTestProps(`mobule-filter-facets`)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchResultsWithInputWidget = widget(
  SearchResultsWithInputComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);

export default SearchResultsWithInputWidget;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['grid', 'lg:grid-cols-4', 'lg:gap-6'],
    filtersSection: ['col-span-1'],
    mainContentSection: [
      'col-span-3',
      'flex',
      'flex-col',
      'lg:gap-spacing-spacing-24',
      'gap-spacing-spacing-16',
    ],
    resultCards: ['flex', 'flex-col'],
    searchAndSortWrapper: [
      'lg:grid',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      'flex',
      'gap-4',
      'items-center',
    ],
    searchKeywordWrapper: ['relative', 'lg:grid', 'col-start-1', 'col-end-3', 'hidden'],
    searchTextInputStyle: [
      'py-spacing-spacing-8',
      'pr-spacing-spacing-8',
      'pl-spacing-spacing-32',
      'bg-color-grayscale-white',
      'border-border-width-width-025',
      'border-color-border-border',
      'rounded-component-tab-border-radius',
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
    ],
    mobileFilterWrapper: [
      'lg:hidden',
      'flex',
      'items-center',
      'py-spacing-spacing-10',
      'px-spacing-spacing-12',
      'gap-spacing-spacing-8',
      'bg-component-button-primary-outline-bg',
      'border-general-border-width-button',
      'border-component-button-primary-outline-border',
      'rounded-general-border-radius-button',
      'h-11',
    ],
    filterButtonText: [
      'text-component-button-primary-outline-text',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-semibold',
    ],
    desktopFilterWrapper: ['lg:block', 'hidden'],
    noResults: ['w-full', 'flex', 'justify-center'],
    sortByWrapper: [
      'flex',
      'gap-2',
      'items-center',
      'col-span-1',
      'col-start-3',
      'col-end-3',
      'xl:col-start-4',
      'xl:col-end-5',
      'md:justify-end',
      'justify-start',
      'w-full',
    ],
    searchIconStyle: ['absolute', 'left-spacing-spacing-10', 'top-3'],
    filterOverLayWrapper: [
      'fixed',
      'inset-0',
      'z-50',
      'flex',
      'flex-col',
      'bg-color-surface-surface',
      'pt-spacing-spacing-16',
      'lg:hidden',
    ],
    overLayCloseWrapper: [
      'flex',
      'justify-end',
      'bg-color-surface-surface',
      'px-spacing-spacing-16',
    ],
    overLayContentWrapper: ['bg-color-surface-surface', 'overflow-y-auto'],
    mobileSearchWrapper: ['lg:hidden', 'block', 'z-10'],
    filteredTags: ['block', 'lg:hidden'],
    paginationWrapper: [],
    totalSearchKeywordStyle: [
      'text-color-icon-darkest',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-bold',
    ],
    filterTagWrapper: ['!px-0'],
    closeIcon: ['text-color-icon-icon'],
  },
});
