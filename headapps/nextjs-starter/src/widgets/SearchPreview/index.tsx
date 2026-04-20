'use client';

// Global
import {
  PreviewSearchInitialState,
  WidgetDataType,
  usePreviewSearch,
  widget,
  PreviewSearchWidgetQuery,
} from '@sitecore-search/react';
import { PreviewSearch } from '@sitecore-search/ui';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState, useRef } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { SvgIcon } from 'helpers/SvgIcon';
import { useEnsureSearchUrl } from 'lib/hooks/search/useEnsureSearchUrl';
import { SearchLoading } from 'helpers/SearchLoading/SearchLoading';
import useDictionary from 'lib/hooks/useDictionary';

type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
  title: string;
  article_url?: string;
};

type PreviewSearchProps = {
  defaultItemsPerPage: 6;
  hasSearchFromSearchPage: false;
  searchSources?: string[];
  searchPlaceHolder?: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;

export const PreviewSearchBasicComponent = ({
  defaultItemsPerPage,
  hasSearchFromSearchPage,
  searchSources,
  searchPlaceHolder,
}: PreviewSearchProps) => {
  const {
    widgetRef,
    actions: { onKeyphraseChange },
    queryResult,
    queryResult: { isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
    query: (query: PreviewSearchWidgetQuery) => {
      query.getRequest().setSources(searchSources ?? []);
      return query;
    },
  });

  const router = useRouter();
  const { getDictionaryValue } = useDictionary();

  // State related to search
  const [searchText, setSearchText] = useState<string>('');
  const [commitedSearchText, setCommitedSearchText] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const articleRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Generic onKeyphrase method
  const onKeyPhrase = useCallback(
    (searchKeyword?: string) => {
      onKeyphraseChange({
        keyphrase: searchKeyword || '',
      });
    },
    [onKeyphraseChange]
  );

  // This hook is responsible for setting the search default value when the component reloads
  useEffect(() => {
    // Check if the 'q' query parameter exists in the URL
    const hasQParam =
      typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('q');
    if (hasQParam) {
      if (router?.query?.q) setSearchText(router?.query?.q as string);
      // If user changes search query from URL, show correct search result
      onKeyPhrase((router?.query?.q && (router?.query?.q as string)) || '');
    } else {
      setSearchText('');
    }
  }, [onKeyPhrase, router]);

  // Updated routePushToSearch to avoid appending /search if already present
  const routePushToSearch = (pathName: string, query: string, hash: string) => {
    router.push(
      {
        pathname: pathName,
        query: query,
        hash: hash,
      },
      undefined,
      { scroll: false }
    );
  };

  const onResetText = () => {
    routePushToSearch(window.location.pathname, '', '');
    setSearchText('');
    setCommitedSearchText('');
    onKeyPhrase();
  };

  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      setSearchText(target.value);
      onKeyPhrase(target.value);
    },
    [onKeyPhrase]
  );

  const onShowMoreResult = () => {
    if (hasSearchFromSearchPage) {
      setCommitedSearchText(searchText);
    } else {
      routePushToSearch('/search', 'q=' + searchText, '');
    }
  };

  const onHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText) {
      if (hasSearchFromSearchPage) {
        setCommitedSearchText(searchText);
        onKeyPhrase(searchText);
      } else {
        routePushToSearch('/search', 'q=' + searchText, '');
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault(); // Prevent default scrolling behavior
      setFocusedIndex((prevIndex) => {
        const nextIndex = prevIndex === null ? 0 : prevIndex + 1;
        return nextIndex < articleRefs.current.length ? nextIndex : prevIndex;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault(); // Prevent default scrolling behavior
      setFocusedIndex((prevIndex) => {
        const nextIndex = prevIndex === null ? articleRefs.current.length - 1 : prevIndex - 1;
        return nextIndex >= 0 ? nextIndex : prevIndex;
      });
    }
  };

  useEffect(() => {
    if (focusedIndex !== null && articleRefs.current[focusedIndex]) {
      articleRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  useEffect(() => {
    if (!isDropdownOpen) {
      setFocusedIndex(null); // Reset focus index when dropdown is closed
    }
  }, [isDropdownOpen]);

  const toggleDropdown = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  useEnsureSearchUrl(commitedSearchText);

  const {
    base,
    searchInputStyle,
    searchIcon,
    goSearchIconWrapper,
    resetSearchIconWrapper,
    previewContent,
    suggessionLabel,
    previewItem,
    previewContentWrapper,
  } = TAILWIND_VARIANTS();

  return (
    <PreviewSearch.Root>
      {/* SEARCH BAR */}
      <div className={base()}>
        <form id="search-form" onSubmit={onHandle}>
          <label htmlFor="keyword" className="sr-only">
            Search
          </label>
          <div className={searchIcon()}>
            <SvgIcon icon="magnifier" size="xs" viewBox="0 0 18 18" fill="none" />
          </div>
          <PreviewSearch.Input
            className={searchInputStyle()}
            onChange={keyphraseHandler}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            placeholder={
              searchPlaceHolder
                ? searchPlaceHolder
                : getDictionaryValue('SearchInputPlaceholder') ||
                  'Search keywords would show up here'
            }
            id="keyword"
            value={searchText}
          />
          {searchText && (
            <>
              <label htmlFor="GoSearchResult" className="sr-only">
                Go
              </label>
              <button
                id="GoSearchResult"
                className={goSearchIconWrapper()}
                role="button"
                aria-label="Go to search results"
                onClick={onShowMoreResult}
              >
                {getDictionaryValue('GoButtonText') || 'Go'}
              </button>
              <button
                className={resetSearchIconWrapper()}
                aria-label="Close search bar"
                role="button"
                onClick={onResetText}
              >
                {/* HERE IS THE X ICON THAT SHOWS UP TO CLEAR SEARCH */}
                <SvgIcon size="s" viewBox="4 3 24 24" fill="currentColor" icon="menu-close" />
              </button>
            </>
          )}
        </form>
      </div>

      {/* SEARCH RESULTS */}
      {/* CODE FOR SEARCH RESULTS STARTS HERE */}
      <PreviewSearch.Content
        ref={widgetRef}
        className={previewContent()}
        hidden={!(searchText && searchText?.length > 3)}
      >
        {/* DISPLAY LOADING IF RESULTS ARE STILL NOT READY */}
        <SearchLoading isLoading={isLoading} />
        <div className={suggessionLabel()}>
          {getDictionaryValue('Suggestions') || 'Suggestions'}
        </div>
        <PreviewSearch.Results defaultQueryResult={queryResult}>
          {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
            <PreviewSearch.Items data-loading={loading} className={previewContentWrapper()}>
              {/* DISPLAY LOADING IF RESULTS ARE STILL NOT READY */}
              <SearchLoading isLoading={loading} />
              {/* THIS IS THE LIST OF SEARCH RESULTS THAT SHOW UP */}
              {!loading && (
                <>
                  {/* LOOP OVER ALL SEARCH RESULTS TO DISPLAY */}
                  {articles.map((article, index) => (
                    <PreviewSearch.Item key={article.id} asChild>
                      <a
                        href={article?.article_url}
                        className={previewItem()}
                        ref={(el: HTMLAnchorElement | null) => {
                          if (el) {
                            articleRefs.current[index] = el;
                          }
                        }}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            const nextIndex = index + 1;
                            if (nextIndex < articleRefs.current.length) {
                              setFocusedIndex(nextIndex);
                            }
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            const prevIndex = index - 1;
                            if (prevIndex >= 0) {
                              setFocusedIndex(prevIndex);
                            } else {
                              // Go back to input field
                              const input = document.getElementById('keyword');
                              if (input) {
                                input.focus();
                                setFocusedIndex(null);
                              }
                            }
                          }
                        }}
                        onBlur={() => {
                          // Close dropdown if focus is leaving the search area entirely
                          const activeElement = document.activeElement;
                          const isInput = activeElement?.id === 'keyword';
                          const isSearchResult = articleRefs.current.some(
                            (ref) => ref === activeElement
                          );
                          const isGoButton = activeElement?.id === 'GoSearchResult';

                          if (!isInput && !isSearchResult && !isGoButton) {
                            toggleDropdown(false);
                            setFocusedIndex(null);
                          }
                        }}
                      >
                        <div className="p-2">{article?.title || article?.name}</div>
                      </a>
                    </PreviewSearch.Item>
                  ))}
                </>
              )}
            </PreviewSearch.Items>
          )}
        </PreviewSearch.Results>
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};
const PreviewSearchBasicWidget = widget(
  PreviewSearchBasicComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default PreviewSearchBasicWidget;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['relative', 'w-full'],
    searchInputStyle: [
      'w-full',
      'py-spacing-spacing-8',
      'pr-spacing-spacing-8',
      'pl-spacing-spacing-32',
      'border-border-width-width-025',
      'border-color-border-border',
      'bg-color-grayscale-white',
      'rounded-component-tab-border-radius',
    ],
    searchIcon: ['absolute', 'lg:top-3.5', 'top-2.5', 'left-3'],
    resetSearchIconWrapper: ['absolute', 'right-2', 'lg:top-2', 'top-1', 'text-color-icon-icon'],
    goSearchIconWrapper: [
      'absolute',
      'right-9',
      'lg:top-1.5',
      'top-1',
      'bg-component-button-tonal-filled-bg',
      'rounded-component-card-label-border-radius',
      'lg:p-spacing-spacing-4',
      'px-spacing-spacing-4',
      'py-spacing-spacing-2',
      'text-component-button-tonal-filled-text',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-semibold',
      'leading-5',
    ],
    previewContent: [
      'pt-component-tab-layout-container-padding-x',
      'pr-spacing-spacing-16',
      'pb-spacing-spacing-16',
      'pl-spacing-spacing-16',
      'bg-color-grayscale-white',
      'border-border-width-width-025',
      'border-r-color-border-border',
      'border-b-color-border-border',
      'border-l-color-border-border',
      'rounded-t-general-border-radius-none',
      'rounded-r-general-border-radius-none',
      'rounded-component-tab-border-radius',
      'rounded-b',
      'w-[var(--radix-popover-trigger-width)]',
    ],
    suggessionLabel: [
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'font-bold',
    ],
    previewItem: [
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'underline',
      'decoration-solid',
      'decoration-auto',
    ],
    previewContentWrapper: ['flex', 'flex-col', 'gap-1'],
  },
});
