'use client';

// Global
import React, { useRef, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Layout } from '.generated/Layout/JumpNav.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import { useScrollElementIntoView } from 'lib/hooks/useScrollElementIntoView';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { useWatchJumpNavActiveState } from 'helpers/Context/JumpNavContext';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { getTestProps } from 'lib/testing/utils';

export type JumpNavSectionProps = Layout.JumpNav.JumpNavSection_Component & {
  context?: 'desktop' | 'mobile';
};

const JumpNavSection = (props: JumpNavSectionProps): JSX.Element => {
  const { heading } = props?.fields || {};
  const { uid } = props?.rendering || {};
  const context = props.context || 'desktop';

  const phKey = `custom-section-content`;

  const accordionId = `accordion-${uid}`;

  const accordionItemHeadlineRef = useRef<HTMLDivElement>(null);

  const accordionItemBodyRef = useRef<HTMLDivElement>(null);

  useScrollElementIntoView(accordionItemHeadlineRef.current, {
    stickyHeaderId: `jumpnav-header-${uid}`,
    animationElement: accordionItemBodyRef.current,
    scrollTargetId: accordionId,
  });

  // Update the active
  useWatchJumpNavActiveState(accordionItemHeadlineRef, uid, `jumpnav-header-${uid}`);

  /*
   * Rendering
   */

  const { base, headline } = TAILWIND_VARIANTS();

  return (
    <div
      className={base()}
      data-component="authorable/shared/layout/jump-nav-mobile-accordion-item"
      key={accordionId}
      ref={accordionItemHeadlineRef}
      id={`accordion-${uid}`}
      tabIndex={-1}
      {...getTestProps(`component-jump-nav-section-${props?.rendering?.uid}`)}
    >
      <div ref={accordionItemBodyRef} aria-labelledby={`jumpnav-${context}-${uid}`}>
        <PlainTextWrapper
          className={headline()}
          field={heading}
          tag="h2"
          id={`jumpnav-header-${uid}`}
          {...getTestProps(`header`)}
        />
        <PlaceholderWrapper
          name={phKey}
          rendering={props.rendering}
          {...getTestProps(`placeholder`)}
        />
      </div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(JumpNavSection);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['overflow-hidden'],
    headline: [
      'items-center',
      'justify-between',
      'font-bold',
      'text-typography-header-large-font-size',
      'font-typography-header-font-family',
      'text-color-text-text',
    ],
  },
});
