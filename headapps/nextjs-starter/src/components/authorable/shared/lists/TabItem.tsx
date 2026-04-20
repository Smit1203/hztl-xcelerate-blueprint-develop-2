'use client';

// Global

import React, { useRef, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Lists } from '.generated/Lists/Tab.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { useTab } from 'helpers/Context/TabContext';
import { getTestProps } from 'lib/testing/utils';

export type TabItemProps = Lists.Tab.TabItem_Component;

const TabItem = (props: TabItemProps): JSX.Element => {
  const { content } = props?.fields || {};
  const { uid } = props?.rendering || {};

  const TabId = `tab-content-${uid}`;
  const tabItemHeadlineRef = useRef<HTMLDivElement>(null);

  const { activeTab } = useTab();
  const isActive = props?.rendering?.uid === activeTab;
  const { base, contentWrapper } = TAILWIND_VARIANTS();
  return (
    <div
      data-component="authorable/shared/lists/Tabitem"
      className={base({ isActive })}
      key={TabId}
      ref={tabItemHeadlineRef}
      id={TabId}
      role="tabpanel"
      aria-live="polite"
      aria-labelledby={`tab-content-${uid}`}
      {...getTestProps(`component-tab-item-${TabId}`)}
    >
      <div className={contentWrapper()}>
        <RichTextWrapper field={content} {...getTestProps(`rich-text`)} />
      </div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(TabItem);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
    contentWrapper: ['pt-margin-less', 'pb-margin-base'],
  },
  variants: {
    isActive: {
      true: {
        base: ['visible'],
      },
      false: {
        base: ['hidden'],
      },
    },
  },
});
