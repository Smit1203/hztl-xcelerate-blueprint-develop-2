'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import { ComponentRendering } from '@sitecore-content-sdk/nextjs';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { ComponentProps } from 'lib/component-props';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { findComponent } from 'lib/utils/object-utils';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { Lists } from '.generated/Lists/Tab.model';
import { TabContextProvider, useTab } from 'helpers/Context/TabContext';
import { SvgIcon } from 'helpers/SvgIcon';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';
import { useScrollableTabs } from 'lib/hooks/useScrollableTabs';
import { getTestProps } from 'lib/testing/utils';

export type TabProps = ComponentProps;

export const ScrollButton = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => {
  const { tabArrows } = TAILWIND_VARIANTS();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      className={tabArrows({ right: direction === 'right' })}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Scroll tabs ${direction}`}
      aria-controls="tab-list"
      tabIndex={0}
    >
      <SvgIcon
        icon={`arrow-dash-${direction}`}
        size="s"
        viewBox={'0 0 20 20'}
        fill="currentColor"
      />
    </button>
  );
};

const TabContent = (props: TabProps): JSX.Element => {
  const { DynamicPlaceholderId, RenderingIdentifier } = props?.params || {};
  const { activeTab, setActiveTab } = useTab();
  const { containerRef, isScrollable, isLeftArrowVisible, isRightArrowVisible, handleScroll } =
    useScrollableTabs<HTMLUListElement>();
  const phKey = `tab-${DynamicPlaceholderId}`;
  const tabItems = findComponent(props.rendering, 'TabItem');

  const { base, tabsContainerWrapper, tabsWrapper, tabLinkWrapper, tabLink } = TAILWIND_VARIANTS();

  return (
    <section
      className={base()}
      data-component="authorable/shared/lists/Tab"
      id={RenderingIdentifier}
      {...getTestProps(`component-tab-${props?.rendering?.uid}`)}
    >
      <div className={tabsContainerWrapper()}>
        {isScrollable && isLeftArrowVisible && (
          <ScrollButton direction="left" onClick={() => handleScroll('left')} />
        )}
        <ul
          className={tabsWrapper()}
          ref={containerRef}
          role="tablist"
          id="tab-list"
          aria-label="Tab navigation"
          {...getTestProps(`tab-ul`)}
        >
          {tabItems.map((item: ComponentRendering & Lists.Tab.TabItem, index) => {
            const isActive = activeTab === item.uid;
            const styles = parseStyleParams(item.params, ['cta1']);
            const ctaVarient = styles.cta1?.ctaVariant || 'primary';
            return (
              <li
                key={item.uid}
                className={tabLinkWrapper({ isActive })}
                role="presentation"
                {...getTestProps(`tab-content-${index + 1}`)}
              >
                <LinkWrapper
                  ctaComponentClass="default"
                  className={tabLink({ style: ctaVarient, isActive })}
                  ctaStyle={{ ...getCtaStyle(styles.cta1, ctaVarient) }}
                  ctaVariant="custom"
                  field={{ href: '#', anchor: 'tab-content-' + item.uid }}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.uid || '');
                  }}
                  role="tab"
                  aria-controls={`tab-content-${item.uid}`}
                  aria-selected={isActive}
                  {...getTestProps(`tab-link-${index + 1}`)}
                >
                  <PlainTextWrapper
                    field={item.fields?.title}
                    {...getTestProps(`tab-title-${index + 1}`)}
                  />
                </LinkWrapper>
              </li>
            );
          })}
        </ul>
        {isScrollable && isRightArrowVisible && (
          <ScrollButton direction="right" onClick={() => handleScroll('right')} />
        )}
      </div>

      <PlaceholderWrapper
        name={phKey}
        rendering={props.rendering}
        {...getTestProps(`tab-ph-${props?.rendering?.uid}`)}
      />
    </section>
  );
};

const Tab = (props: TabProps): JSX.Element => {
  const tabItems = findComponent(props.rendering, 'TabItem');

  return (
    <TabContextProvider tabs={tabItems}>
      <TabContent {...props} />
    </TabContextProvider>
  );
};

export const Default = withStandardComponentWrapper(Tab, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
    tabsContainerWrapper: [
      'container',
      'flex',
      'items-center',
      'gap-space-between-micro',
      'relative',
    ],
    tabArrows: ['absolute', 'py-4', 'px-0', 'w-[44px]', 'h-[68px]'],
    tabsWrapper: [
      'container',
      'overflow-x-auto',
      'bg-component-tab-color-bg',
      'flex',
      'px-component-tab-layout-container-padding-x',
      'py-component-tab-layout-container-padding-y',
    ],
    tabLinkWrapper: [
      'gap-spacing-spacing-8',
      'border-l-component-tab-border-width-left',
      'border-r-component-tab-border-width-right',
      'border-t-component-tab-border-width-top',
      'border-b-component-tab-border-width-bottom',
      'border-component-tab-color-border',
      'hover:border-component-tab-color-border-hover',
      'rounded-component-tab-border-radius',
      'focus:ring-color-border-border-focus',
      'focus:border-component-tab-color-border-focused',
    ],
    tabLink: [
      'flex',
      'items-center',
      'justify-center',
      'px-spacing-spacing-24',
      'py-spacing-spacing-16',
      'min-w-component-tab-layout-min-width',
      'text-typography-body-medium-font-size',
      'font-typography-body-font-family',
      'leading-5',
      'font-semibold',
      'text-component-tab-color-text',
      'bg-component-tab-color-bg',
      'hover:text-component-tab-color-text-hover',
      'hover:bg-component-tab-color-bg-hover',
      'focus:bg-component-tab-color-bg-focused',
      'focus:text-component-tab-color-text-focused',
      'whitespace-nowrap',
      'rounded-component-tab-border-radius',
    ],
  },
  variants: {
    isActive: {
      true: {
        tabLinkWrapper: [
          'border-component-tab-color-border-active',
          'bg-component-tab-color-bg-active',
        ],
        tabLink: ['text-component-tab-color-text-active', 'bg-component-tab-color-bg-active'],
      },
    },
    disabled: {
      true: {
        tabArrows: ['opacity-50', 'cursor-not-allowed', 'hover:bg-transparent'],
      },
    },
    style: {
      link: {
        tabLink: ['gap-spacing-spacing-8'],
      },
      primary: {
        tabLink: ['gap-spacing-spacing-8'],
      },
      secondary: {
        tabLink: ['gap-spacing-spacing-8'],
      },
      tertiary: {
        tabLink: ['gap-spacing-spacing-8'],
      },
    },
    right: {
      true: {
        tabArrows: [
          'right-[-1px]',
          'bg-gradient-to-l',
          'from-color-bg-bg to-color-white-alpha-0 from-[9.61%] to-100%',
        ],
      },
      false: {
        tabArrows: [
          'left-[-1px]',
          'bg-gradient-to-r',
          'from-color-bg-bg to-color-white-alpha-0 from-[9.61%] to-100%',
        ],
      },
    },
  },
});
