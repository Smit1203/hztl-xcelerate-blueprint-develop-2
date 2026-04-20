'use client';

import { useSearchResultsActions, useSearchResultsSelectedFilters } from '@sitecore-search/react';
import { SvgIcon } from 'helpers/SvgIcon';
import { getTestProps } from 'lib/testing/utils';
import { tv } from 'tailwind-variants';

interface RangeFacet {
  min?: number;
  max?: number;
  valueLabel?: string;
}
interface ValueFacet {
  valueLabel: string;
  min?: never;
  max?: never;
}

type SelectedFacet = RangeFacet | ValueFacet;

const SearchSelectedFilterTags = ({ className }: { className?: string }) => {
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  const { onRemoveFilter } = useSearchResultsActions();

  const buildRangeLabel = (min: number | undefined, max: number | undefined): string => {
    return typeof min === 'undefined'
      ? `< $${max}`
      : typeof max === 'undefined'
        ? ` > $${min}`
        : `$${min} - $${max}`;
  };

  const buildFacetLabel = (selectedFacet: SelectedFacet) => {
    if ('min' in selectedFacet || 'max' in selectedFacet) {
      return `${buildRangeLabel(selectedFacet.min, selectedFacet.max)}`;
    }
    return `${selectedFacet.valueLabel}`;
  };

  const { selectedTagsWrapper, selectedTag, chipsText, chipsCrossIcon } = TAILWIND_VARIANTS();

  return (
    <>
      {selectedFacetsFromApi && selectedFacetsFromApi?.length > 0 && (
        <div
          className={`${selectedTagsWrapper()} ${className}`}
          {...getTestProps(`selected-filters`)}
        >
          {selectedFacetsFromApi?.map((selectedFacet) => (
            <button
              key={`${selectedFacet.facetId}${selectedFacet.facetLabel}${selectedFacet.valueLabel}`}
              onClick={() => onRemoveFilter(selectedFacet)}
              className={selectedTag()}
              {...getTestProps(`facet-${selectedFacet.facetId}`)}
            >
              <span className={chipsText()}>{buildFacetLabel(selectedFacet)}</span>
              <SvgIcon
                className={chipsCrossIcon()}
                icon="tag-close"
                size="xs"
                viewBox="0 0 16 16"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchSelectedFilterTags;

const TAILWIND_VARIANTS = tv({
  slots: {
    selectedTagsWrapper: ['py-2', 'px-2.5', 'flex', 'gap-2', 'flex-wrap'],
    selectedTag: [
      'py-component-card-label-padding-y',
      'px-component-card-label-padding-x',
      'flex',
      'gap-[2px]',
      'items-center',
      'justify-center',
      'bg-color-fill-darkest',
      'rounded-component-card-label-border-radius',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-color-border-border-focus',
      'focus:outline-color-core-color-1-800',
    ],
    chipsText: [
      'text-color-icon-white',
      'font-typography-body-font-family',
      'text-typography-body-xsmall-font-size',
      'font-normal',
      'leading-5',
    ],
    chipsCrossIcon: ['text-color-icon-white'],
  },
});
