// Global
import React from 'react';
import { tv } from 'tailwind-variants';

// Local
import useDictionary from 'lib/hooks/useDictionary';
import { smoothScrollToElement } from 'lib/hooks/useScrollElementIntoView';
import { SvgIcon } from 'helpers/SvgIcon';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { getTestProps } from 'lib/testing/utils';

const SkipNav: React.FC = () => {
  const { base } = TAILWIND_VARIANTS();
  const { getDictionaryValue } = useDictionary();
  /*
   * Rendering
   */
  return (
    <div
      data-component="authorable/shared/site-structure/skipnav/skipnav"
      {...getTestProps(`component-skip-nav`)}
    >
      <button
        className={base()}
        role="button"
        {...getTestProps(`link`)}
        onClick={() => {
          const elem = document.getElementById('main-content');
          if (elem) {
            smoothScrollToElement(elem, 'header', null, 0, undefined, () => {
              elem.setAttribute('tabindex', '-1');
              elem.focus({ preventScroll: true });
              elem.removeAttribute('tabindex');
            });
          }
        }}
      >
        <SvgIcon icon="arrow-down" size="s" />
        <PlainTextWrapper
          field={{ value: getDictionaryValue('SkipToMainContent') || 'Skip to main content' }}
          tag="p"
        />
      </button>
    </div>
  );
};

export default SkipNav;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      'left-1',
      'sr-only',
      'top-1',
      'focus:absolute',
      'focus:!bg-component-button-primary-filled-bg-focused',
      'focus:!text-component-button-primary-filled-text-hover',
      'focus:font-typography-body-font-family',
      'focus:text-typography-body-large-font-size',
      'focus:shadow-2xs',
      'focus:shadow-color-border-border-focus',
      'focus:!outline-color-border-border-focus',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-offset-1',
      'focus:ring-color-border-border-focus',
      'focus:flex',
      'focus:items-center',
      'focus:gap-spacing-spacing-8',
      'focus:not-sr-only',
      'focus:py-spacing-spacing-16',
      'focus:px-spacing-spacing-24',
      'focus:border-general-border-width-button',
      'focus:border-component-button-primary-filled-border-focused',
      'focus:rounded-general-border-radius-button',
      'focus:z-50',
    ],
  },
});
