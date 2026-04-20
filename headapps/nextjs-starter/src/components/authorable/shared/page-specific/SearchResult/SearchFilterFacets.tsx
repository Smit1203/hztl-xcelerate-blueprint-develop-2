'use client';

import {
  SearchResponseFacet,
  useSearchResultsActions,
  useSearchResultsSelectedFilters,
} from '@sitecore-search/react';
import { AccordionFacets, FacetItem, SearchResultsAccordionFacets } from '@sitecore-search/ui';
import { SvgIcon } from 'helpers/SvgIcon';
import { getTestProps } from 'lib/testing/utils';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

type SearchFacetsProps = {
  facets: SearchResponseFacet[];
};
const SearchFilterFacets = ({ facets }: SearchFacetsProps) => {
  const { onFacetClick } = useSearchResultsActions();
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();

  // Add state to track expanded facets
  const [expandedFacets, setExpandedFacets] = useState<string[]>([]);

  const facetsPagination = [...facets].sort((a, b) => {
    if (a.name === 'type') return -1;
    if (b.name === 'type') return 1;
    return 0;
  });

  // Function to check if a facet is expanded
  const isFacetExpanded = (facetName: string) => expandedFacets.includes(facetName);

  // Function to toggle facet expansion
  const toggleFacetExpansion = (facetName: string) => {
    setExpandedFacets((prev) =>
      prev.includes(facetName) ? prev.filter((name) => name !== facetName) : [...prev, facetName]
    );
  };

  // Function to check if a facet value is selected
  const isFacetValueSelected = (facetName: string, valueText: string) => {
    return (
      selectedFacetsFromApi?.some(
        (selectedFacet) =>
          selectedFacet.facetId === facetName && selectedFacet.valueLabel === valueText
      ) || false
    );
  };

  const {
    facetWrapper,
    facetHeader,
    facetHeaderLabelIcon,
    facetHeaderText,
    facetContent,
    facetItemStyle,
    facetItemWithCheckIcon,
    facetItemCheckIcon,
    facetLabelStyle,
    arrowIcon,
  } = TAILWIND_VARIANTS();

  return (
    <SearchResultsAccordionFacets
      defaultFacetTypesExpandedList={[]}
      onFacetValueClick={onFacetClick}
      {...getTestProps(`accordion-facets`)}
    >
      {facetsPagination &&
        facetsPagination.map((f, fIndex: number) => (
          // ALL THE CONTENT IN THE FILTER OPTION
          <AccordionFacets.Facet
            facetId={f.name}
            key={f.name}
            id={`${f.name}${fIndex}`}
            className={facetWrapper()}
            {...getTestProps(`facet-${f.name}`)}
          >
            <div className={facetHeader({ isFacetOpen: isFacetExpanded(f.name) })}>
              <div className={facetHeaderLabelIcon()}>
                <AccordionFacets.Trigger
                  className={facetHeaderText()}
                  onClick={() => toggleFacetExpansion(f.name)}
                  {...getTestProps(`facet-trigger-${f.name}`)}
                >
                  {f.label}
                  <SvgIcon
                    className={arrowIcon({ isFacetOpen: isFacetExpanded(f.name) })}
                    viewBox="0 0 24 24"
                    size="xxs"
                    icon={'chevron-down'}
                  />
                </AccordionFacets.Trigger>
              </div>
            </div>
            <AccordionFacets.Content>
              <AccordionFacets.ValueList className={facetContent()}>
                {/* INDIVIDUAL CHECKBOX + LABEL + COUNT */}
                {f.value.map((v, index: number) => (
                  <FacetItem
                    {...{
                      index,
                      facetValueId: v.id,
                    }}
                    {...getTestProps(`facet-item-${f.name}`)}
                    key={v.id}
                    className={facetItemStyle()}
                    onClick={() => {
                      onFacetClick({
                        type: 'text',
                        facetId: f.name,
                        facetIndex: fIndex,
                        facetValueIndex: index,
                        facetValueId: v.id,
                        checked: !isFacetValueSelected(f.name, v.text),
                      });
                    }}
                  >
                    {/* ACTUAL check+label */}
                    <div className={facetItemWithCheckIcon()}>
                      <div className="relative flex">
                        <input
                          type="checkbox"
                          id={`facet_${v.id}_${index}`}
                          className={facetItemCheckIcon()}
                          checked={isFacetValueSelected(f.name, v.text)}
                          aria-checked={isFacetValueSelected(f.name, v.text)}
                          aria-label={v.text}
                          onChange={(e) => {
                            onFacetClick({
                              type: 'text',
                              facetId: f.name,
                              facetIndex: fIndex,
                              facetValueIndex: index,
                              facetValueId: v.id,
                              checked: e.target.checked,
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              // Simulate a click to toggle the checkbox
                              e.currentTarget.click();
                            }
                          }}
                          {...getTestProps(`facet-checkbox-${f.name}`)}
                        />
                        {isFacetValueSelected(f.name, v.text) && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <SvgIcon
                              size="xxs"
                              icon={'checkmark'}
                              {...getTestProps(`checked-${f.name}`)}
                            />
                          </div>
                        )}
                      </div>
                      <AccordionFacets.ItemLabel
                        className={facetLabelStyle()}
                        {...getTestProps(`facet-label-${f.name}`)}
                      >
                        {v.text}
                      </AccordionFacets.ItemLabel>
                      <AccordionFacets.ItemLabel
                        className={facetLabelStyle()}
                        {...getTestProps(`facet-count-${f.name}`)}
                      >
                        {v.count && `(${v.count})`}
                      </AccordionFacets.ItemLabel>
                    </div>
                  </FacetItem>
                ))}
              </AccordionFacets.ValueList>
            </AccordionFacets.Content>
          </AccordionFacets.Facet>
        ))}
    </SearchResultsAccordionFacets>
  );
};

export default SearchFilterFacets;

const TAILWIND_VARIANTS = tv({
  slots: {
    facetWrapper: ['py-spacing-spacing-4', 'flex', 'flex-col', 'gap-spacing-spacing-4'],
    facetHeader: ['rounded-general-border-radius-button', 'hover:bg-color-fill-fill-hover'],
    facetHeaderLabelIcon: ['py-spacing-spacing-8', 'px-spacing-spacing-12'],
    facetHeaderText: [
      'text-color-text-text',
      'w-full',
      'flex',
      'justify-between',
      'items-center',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-semibold',
      'underline',
      'decoration-solid',
    ],
    facetContent: ['flex', 'flex-col', 'gap-spacing-spacing-4'],
    facetItemStyle: ['py-spacing-spacing-8', 'px-spacing-spacing-12'],
    facetItemWithCheckIcon: ['justify-start', 'items-center', 'flex', 'gap-2'],
    facetItemCheckIcon: [
      'appearance-none',
      'w-5',
      'h-5',
      'border-border-width-width-05',
      'border-color-grayscale-900',
      'rounded-[4px]',
      'cursor-pointer',
    ],
    facetLabelStyle: [
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-semibold',
      'cursor-pointer',
    ],
    arrowIcon: ['transition-all', 'duration-200'],
  },
  variants: {
    isFacetOpen: {
      true: {
        facetHeader: ['bg-color-fill-fill-selected'],
        arrowIcon: ['rotate-180'],
      },
      false: {
        facetHeader: ['bg-color-surface-surface'],
        arrowIcon: ['rotate-0'],
      },
    },
  },
});
