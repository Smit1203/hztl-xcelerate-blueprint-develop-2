import {
  SearchResponseFacet,
  useSearchResultsActions,
  useSearchResultsSelectedFilters,
} from '@sitecore-search/react';
import { tv } from 'tailwind-variants';
import SearchFilterFacets from './SearchFilterFacets';
import useDictionary from 'lib/hooks/useDictionary';
import SearchSelectedFilterTags from './SearchSelectedFilterTags';
import { getTestProps } from 'lib/testing/utils';

const SearchFilterFacetsWrapper = ({
  facets,
  isInOverlay,
}: {
  facets: SearchResponseFacet[];
  isInOverlay?: boolean;
}) => {
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  const { onClearFilters } = useSearchResultsActions();
  const { getDictionaryValue } = useDictionary();

  const { filterLabelWrapper, filterLabel, clearAllLink, searchFacetsWrapper } =
    TAILWIND_VARIANTS();

  return (
    <>
      <div className={filterLabelWrapper({ isInOverlay })}>
        <label className={filterLabel()}>{getDictionaryValue('Filters') || 'Filters'}</label>
        {selectedFacetsFromApi && selectedFacetsFromApi?.length > 0 && (
          <button
            className={clearAllLink()}
            onClick={onClearFilters}
            {...getTestProps(`clear-all-filters`)}
          >
            {getDictionaryValue('ClearAll') || 'Clear All'}
          </button>
        )}
      </div>
      <SearchSelectedFilterTags />
      {facets.length > 0 && (
        <div className={searchFacetsWrapper()}>
          <SearchFilterFacets facets={facets} />
        </div>
      )}
    </>
  );
};

export default SearchFilterFacetsWrapper;

const TAILWIND_VARIANTS = tv({
  slots: {
    filterLabelWrapper: [
      'flex',
      'justify-between',
      'py-spacing-spacing-8',
      'px-spacing-spacing-16',
    ],
    filterLabel: [
      'text-color-text-dark',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-semibold',
    ],
    clearAllLink: [
      'flex',
      'text-color-text-dark',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'underline',
      'decoration-solid',
      'decoration-auto',
      'underline-offset-auto',
      'font-normal',
    ],
    searchFacetsWrapper: ['py-spacing-spacing-0', 'px-spacing-spacing-8'],
  },
  variants: {
    isInOverlay: {
      true: {
        filterLabelWrapper: ['pl-spacing-spacing-24'],
      },
    },
  },
});
