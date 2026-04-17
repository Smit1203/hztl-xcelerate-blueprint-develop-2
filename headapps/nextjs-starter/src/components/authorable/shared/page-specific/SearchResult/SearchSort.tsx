import { SearchResponseSortChoice, useSearchResultsActions } from '@sitecore-search/react';
import { SortSelect } from '@sitecore-search/ui';
import { SvgIcon } from 'helpers/SvgIcon';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';

type SearchSortOrderProps = {
  options: Array<SearchResponseSortChoice>;
  selected: string;
};

const SearchSortOrder = ({ options, selected }: SearchSortOrderProps) => {
  const selectedSortIndex = options.findIndex((s) => s.name === selected);
  const defaultSortIndex = selectedSortIndex === -1 ? 0 : selectedSortIndex;
  const [isOpen, setIsOpen] = useState(false);
  const { getDictionaryValue } = useDictionary();
  const { onSortChange } = useSearchResultsActions();
  const {
    dropdownStyle,
    sortByLabel,
    sortDropdownWrapper,
    dropdownContainer,
    dropdownContent,
    sortingItems,
    arrowIcon,
  } = TAILWIND_VARIANTS();

  const selectId = 'search-sort-select';
  const selectedOption = options[defaultSortIndex];

  return (
    <>
      <label
        className={sortByLabel()}
        id={`${selectId}-label`}
        htmlFor={selectId}
        aria-label="Search result sort"
        {...getTestProps(`search-sort-label`)}
      >
        {getDictionaryValue('SortBy') || 'Sort by:'}
      </label>
      <div
        className={sortDropdownWrapper({ isOpenDropdown: isOpen })}
        {...getTestProps(`sort-dropdown`)}
      >
        <SortSelect.Root
          defaultValue={selectedOption?.name}
          onValueChange={onSortChange}
          open={isOpen}
          aria-labelledby={`${selectId}-label`}
          onOpenChange={() => setIsOpen(!isOpen)}
        >
          <SortSelect.Trigger
            className={dropdownStyle()}
            id={selectId}
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-labelledby={`${selectId}-label ${selectId}`}
          >
            <SortSelect.SelectValue {...getTestProps(`selected-value`)}>
              {selectedOption?.label || ''}
            </SortSelect.SelectValue>
            <SvgIcon
              className={arrowIcon({ isOpenDropdown: isOpen })}
              icon="chevron-down"
              viewBox="0 0 24 24"
              size="xs"
            />
          </SortSelect.Trigger>
          <SortSelect.Content
            className={dropdownContainer()}
            role="listbox"
            aria-labelledby={`${selectId}-label`}
          >
            <SortSelect.Viewport className={dropdownContent()}>
              {options.map((option: SearchResponseSortChoice) => (
                <SortSelect.Option
                  value={option}
                  key={option.name}
                  className={sortingItems()}
                  role="option"
                  aria-selected={option.name === selectedOption?.name}
                  {...getTestProps(`sort-option-${option.name}`)}
                >
                  <SortSelect.OptionText>{option.label}</SortSelect.OptionText>
                </SortSelect.Option>
              ))}
            </SortSelect.Viewport>
          </SortSelect.Content>
        </SortSelect.Root>
      </div>
    </>
  );
};

export default SearchSortOrder;

const TAILWIND_VARIANTS = tv({
  slots: {
    dropdownStyle: [
      'cursor-pointer',
      'flex',
      'items-center',
      'gap-2',
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'font-bold',
      'underline',
      'decoration-solid',
      'decoration-auto',
      'w-full',
      'justify-between',
    ],
    sortByLabel: [
      'text-[#535355]',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'flex-grow-1',
      'flex-basis-0',
      'flex-shrink-0',
    ],
    sortDropdownWrapper: [
      'pt-2.5',
      'pr-3',
      'pb-2.5',
      'pl-4',
      'border-border-width-width-025',
      'border-color-border-mid',
      'rounded-[5px]',
      'relative',
      'md:w-auto',
      'w-full',
    ],
    dropdownContainer: [
      'bg-color-surface-white',
      'border',
      'w-full',
      'absolute',
      'top-12',
      '!w-auto',
      'left-0',
      'border-border-width-width-025',
      'border-color-border-mid',
      'rounded-[5px]',
    ],
    dropdownContent: ['p-2'],
    sortingItems: [
      'items-center',
      'cursor-pointer',
      'py-spacing-spacing-8',
      'px-spacing-spacing-4',
      'hover:bg-color-fill-fill-hover',
      'rounded-component-card-label-border-radius',
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'hover:underline',
      'decoration-solid',
      'decoration-auto',
    ],
    arrowIcon: ['transition-all', 'duration-200'],
  },
  variants: {
    isOpenDropdown: {
      true: {
        arrowIcon: ['rotate-180'],
        sortDropdownWrapper: ['bg-color-fill-fill-selected'],
      },
      false: {
        arrowIcon: ['rotate-0'],
        sortDropdownWrapper: ['bg-color-surface-white'],
      },
    },
  },
});
