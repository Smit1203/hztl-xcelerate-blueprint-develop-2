'use client';

// Global
import React, { JSX } from 'react';
import { useSearchResultsActions } from '@sitecore-search/react';
import { Pagination } from '@sitecore-search/ui';
import { tv } from 'tailwind-variants';

// Local
import { SvgIcon } from 'helpers/SvgIcon';
import { useIsMobile } from 'lib/hooks/useIsMobile';
import { smoothScrollToElement } from 'lib/hooks/useScrollElementIntoView';
import { getTestProps } from 'lib/testing/utils';

type SearchPaginationProps = {
  currentPage: number;
  totalPages: number;
};

const SearchPagination = ({ currentPage, totalPages }: SearchPaginationProps): JSX.Element => {
  const { onPageNumberChange } = useSearchResultsActions();

  const onChangePageNumber = (pageNo: number) => {
    onPageNumberChange({ page: pageNo });
    const elem = document.getElementById('search-result-cards');
    if (elem) {
      smoothScrollToElement(elem, 'header');
    }
  };

  const { base, previousPageStyle, pageNumbersWrapper, nextPageStyle, pageNumbersStyle } =
    TAILWIND_VARIANTS();

  const isMobile = useIsMobile();

  return (
    <Pagination.Root
      currentPage={currentPage}
      defaultCurrentPage={1}
      totalPages={totalPages}
      onPageChange={(pageNo) => onChangePageNumber(pageNo)}
      className={base()}
      {...getTestProps(`pagination`)}
    >
      <Pagination.PrevPage
        onClick={(e) => e.preventDefault()}
        className={previousPageStyle({ isDisabledPrevArrow: currentPage === 1 })}
        aria-label="search-prev"
        {...getTestProps(`previous`)}
      >
        <SvgIcon icon="arrow-left" size="xs" viewBox="0 0 24 24" fill="none" />
      </Pagination.PrevPage>
      <Pagination.Pages className={pageNumbersWrapper()} {...getTestProps(`page-numbers`)}>
        {(pagination) =>
          Pagination.paginationLayout(pagination, {
            boundaryCount: 1,
            siblingCount: isMobile ? 0 : 1,
          }).map(({ page, type }) => {
            if (type === 'page') {
              return (
                <Pagination.Page
                  key={page}
                  aria-label={`Page ${page}`}
                  page={page as number}
                  onClick={(e) => e.preventDefault()}
                  className={pageNumbersStyle({ isActive: page === currentPage })}
                  {...getTestProps(`page-${page}`)}
                >
                  {page}
                </Pagination.Page>
              );
            }
            return (
              <span key={type} {...getTestProps(`ellipses`)}>
                ...
              </span>
            );
          })
        }
      </Pagination.Pages>
      <Pagination.NextPage
        onClick={(e) => e.preventDefault()}
        className={nextPageStyle({ isDisabledNextPage: currentPage === totalPages })}
        aria-label="search-next"
        {...getTestProps(`next`)}
      >
        <SvgIcon icon="arrow-right" size="xs" viewBox="0 0 24 24" fill="none" />
      </Pagination.NextPage>
    </Pagination.Root>
  );
};

export default SearchPagination;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['flex', 'gap-spacing-spacing-8', 'cursor-pointer'],
    previousPageStyle: ['flex', 'items-center', 'my-0', 'mx-2'],
    nextPageStyle: ['flex', 'items-center', 'my-0', 'mx-2'],
    pageNumbersWrapper: ['flex', 'gap-spacing-spacing-8'],
    pageNumbersStyle: [
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-bold',
      'rounded-general-border-radius-tag',
      'w-11',
      'h-6',
      'text-center',
    ],
  },
  variants: {
    isActive: {
      true: {
        pageNumbersStyle: ['text-color-text-white', 'bg-color-fill-brand-1'],
      },
      false: {
        pageNumbersStyle: ['text-color-text-text-secondary'],
      },
    },
    isDisabledPrevArrow: {
      true: {
        previousPageStyle: ['cursor-not-allowed', 'opacity-25'],
      },
      false: {
        previousPageStyle: ['cursor-pointer'],
      },
    },
    isDisabledNextPage: {
      true: {
        nextPageStyle: ['cursor-not-allowed', 'opacity-25'],
      },
      false: {
        nextPageStyle: ['cursor-pointer'],
      },
    },
  },
});
