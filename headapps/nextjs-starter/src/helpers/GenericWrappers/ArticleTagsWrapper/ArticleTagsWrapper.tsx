'use client';

import { useTooltipVisibility } from 'lib/hooks/useTooltipVisibility';
import { useVisibleTags } from 'lib/hooks/useVisibleTags';
import { getTestProps } from 'lib/testing/utils';
import React, { useState, useRef } from 'react';
import { tv } from 'tailwind-variants';

export type ArticleTagWrapperProps = {
  tags: string[];
  maxTagsBreakPointNumber?: number;
};

const ArticleTagsWrapper = (props: ArticleTagWrapperProps) => {
  const { tags = [], maxTagsBreakPointNumber } = props;
  const { tagsWrapper, tagStyle, tooltipStyle } = TAILWIND_VARIANTS();
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { showTooltip, setShowTooltip, handleBlur, handleMouseEnter, handleMouseLeave } =
    useTooltipVisibility({ wrapperRef, tooltipRef });

  const visibleCount = useVisibleTags({
    items: tags,
    maxItems: maxTagsBreakPointNumber,
    wrapperRef,
  });

  const visibleTags = tags.slice(0, visibleCount);
  const hiddenTags = tags.slice(visibleCount);

  const handleToggleTooltip = () => {
    if (!showTooltip && wrapperRef.current) {
      const moreButton = wrapperRef.current.children[wrapperRef.current.children.length - 1];
      if (!moreButton) return;
      const rect = moreButton.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow > 150 && rect.top < spaceBelow) {
        setTooltipPosition('bottom');
      } else {
        setTooltipPosition('top');
      }
    }
    setShowTooltip(true);
  };

  return (
    <div className={tagsWrapper()} ref={wrapperRef} {...getTestProps(`article-tags-wrapper`)}>
      {visibleTags.map((tag, index) => (
        <div key={index} className={tagStyle()} title={tag} {...getTestProps(`tag-${index}`)}>
          {tag}
        </div>
      ))}
      {hiddenTags?.length > 0 && (
        <button
          className={tagStyle({ isMoreTagButton: true })}
          onClick={handleToggleTooltip}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...getTestProps(`hidden-tags-button`)}
        >
          + {hiddenTags?.length}
          {showTooltip && (
            <div
              ref={tooltipRef}
              className={tooltipStyle({ tooltipPosition })}
              id="article-tags-tooltip"
              tabIndex={-1}
              onBlur={handleBlur}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {hiddenTags.map((tag, idx) => (
                <div key={idx} {...getTestProps(`hidden-tag-${idx}`)}>
                  {tag}
                </div>
              ))}
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default ArticleTagsWrapper;

const TAILWIND_VARIANTS = tv({
  slots: {
    tagsWrapper: ['flex', 'gap-2', 'flex-wrap', 'items-start'],
    tagStyle: [
      'py-component-tag-padding-y',
      'px-component-tag-padding-x',
      'border-component-tag-border',
      'border-border-width-width-025',
      'rounded-general-border-radius-tag',
      'text-component-tag-text',
      'text-typography-body-xsmall-font-size',
      'font-typography-body-font-family',
      'font-normal',
      'relative',
    ],
    tooltipStyle: [
      'absolute',
      'z-10',
      'right-0',
      'bg-color-fill-white',
      'border',
      'border-color-border-darkest',
      'rounded-general-border-radius-label',
      'py-component-tag-padding-y',
      'px-component-tag-padding-x',
      'shadow-[0px_3px_1px_-1px]',
      'shadow-color-black-alpha-10',
      'min-w-[120px]',
      'cursor-text',
      'text-left',
    ],
  },
  variants: {
    isMoreTagButton: {
      true: {
        tagStyle: [
          'cursor-pointer',
          'bg-component-button-white-link-border-hover',
          'border-color-border-darkest',
        ],
      },
      false: {
        tagStyle: ['bg-component-tag-fill'],
      },
    },
    tooltipPosition: {
      top: {
        tooltipStyle: ['bottom-full', 'mb-2'],
      },
      bottom: {
        tooltipStyle: ['top-full', 'mt-2'],
      },
    },
  },
});
