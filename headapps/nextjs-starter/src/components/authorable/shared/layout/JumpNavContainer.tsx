'use client';

// Global
import { ComponentFields, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import React, { useState, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { ComponentProps } from 'lib/component-props';
import { findComponent } from 'lib/utils/object-utils';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { smoothScrollToElement } from 'lib/hooks/useScrollElementIntoView';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import {
  JumpNavContextProvider,
  useJumpNavContext,
  useMainHeaderHeight,
} from 'helpers/Context/JumpNavContext';
import { Layout } from '.generated/Layout/JumpNav.model';
import { focusUnfocusableElement } from 'lib/utils/dom-utils/tab';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';

export type JumpNavContainerProps = ComponentProps;

const JumpNavContainer = (props: JumpNavContainerProps): JSX.Element => {
  const { DynamicPlaceholderId } = props?.params || {};
  const [isOpen, setIsOpen] = useState(false);
  const { getDictionaryValue } = useDictionary();
  const phKey = `jump-nav-container-${DynamicPlaceholderId}`;
  const headerHeight = useMainHeaderHeight();

  /*
   * Rendering
   */

  const {
    base,
    mainGrid,
    sideContent,
    jumpNav,
    mainContent,
    navHeading,
    navigationForMobile,
    navigationMobileButon,
    navigationMobileList,
    navigationMobileListWrapper,
    jumpNavAccoordionList,
    contentWrapper,
  } = TAILWIND_VARIANTS();

  const jumpNavItems = findComponent(props.rendering, 'JumpNavSection');

  const jumpNavStyle = {
    top: `${headerHeight}px`,
  };

  return (
    <section
      className={base()}
      data-component="authorable/shared/layout/jump-nav-container"
      id={props.rendering.uid}
      {...getTestProps(`component-jump-nav-container-${props?.rendering?.uid}`)}
    >
      <JumpNavContextProvider entries={jumpNavItems}>
        <div className={mainGrid()}>
          <div className={sideContent()}>
            <aside className={jumpNav()} style={jumpNavStyle} aria-label="Page section navigation">
              <EditingHelpText>
                Edit below to give a different text for the sidebar. If left blank, it will show the
                section header in the real site.
              </EditingHelpText>
              <span className={navHeading()} {...getTestProps(`heading`)}>
                {getDictionaryValue('TableOfContent') || 'Table of contents'}
              </span>
              {JumpNavList(jumpNavItems, 'desktop')}
            </aside>
          </div>
          <div className={mainContent()} {...getTestProps(`main-content`)}>
            <div
              className={navigationForMobile()}
              id="jumpnav-mobile"
              style={jumpNavStyle}
              {...getTestProps(`jumpnav-mobile`)}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={navigationMobileButon()}
                {...getTestProps(`mobile-btn`)}
              >
                <span>{getDictionaryValue('TableOfContent') || 'Table of contents'}</span>
                <SvgIcon
                  icon={isOpen ? 'accordion-minus' : 'accordion-plus'}
                  size="s"
                  viewBox="0 0 20 21"
                  fill="currentColor"
                />
              </button>
              <div
                className={navigationMobileListWrapper({ isOpen })}
                {...getTestProps(`jumpnav-mobile-list-wrapper`)}
              >
                <div className={`${navigationMobileList()}`}>
                  <aside aria-label="Page section navigation" className={jumpNavAccoordionList()}>
                    {JumpNavList(jumpNavItems, 'mobile')}
                  </aside>
                </div>
              </div>
            </div>
            <div className={contentWrapper()}>
              <PlaceholderWrapper
                name={phKey}
                rendering={props.rendering}
                renderMobileAsAccordion={false}
                {...getTestProps(`jump-nav-ph`)}
              />
            </div>
          </div>
        </div>
      </JumpNavContextProvider>
    </section>
  );
};

export const Default = withStandardComponentWrapper(JumpNavContainer, false);

const JumpNavList = (
  jumpNavItems: ComponentRendering<ComponentFields>[],
  context: 'desktop' | 'mobile'
) => {
  const { jumpNavListWrapper } = TAILWIND_VARIANTS();
  return (
    <ul className={jumpNavListWrapper()} role="menubar" {...getTestProps(`jumpnav-list`)}>
      {jumpNavItems.map((item, index) => (
        <li key={item.uid} role="menuitem">
          <JumpNavItem item={item} context={context} {...getTestProps(`jumpnav-item-${index}`)} />
        </li>
      ))}
    </ul>
  );
};

function JumpNavItem({
  item,
  context,
}: {
  item: ComponentRendering & Layout.JumpNav.JumpNavSection;
  context: 'desktop' | 'mobile';
}) {
  const { navTitleLinkWrapper } = TAILWIND_VARIANTS();
  const { activeEntry, forceSetActiveEntry } = useJumpNavContext();
  const isActive = activeEntry?.uid === item.uid;
  return (
    <LinkWrapper
      ctaComponentClass="default"
      className={navTitleLinkWrapper({ isActive })}
      ctaVariant="custom"
      field={{ href: '#', anchor: 'accordion-' + item.uid }}
      id={`jumpnav-${context}-${item.uid}`}
      aria-label={`jumpnav-${item.fields?.heading?.value}`}
      aria-current={isActive}
      onClick={(e) => {
        e.preventDefault();
        const elem = document.getElementById('accordion-' + item.uid);
        const mbElement = document.getElementById('jumpnav-mobile');
        const additionalHeight = mbElement?.getBoundingClientRect()?.height || 0;
        if (elem && item.uid) {
          // Force set this item as active immediately
          forceSetActiveEntry(item.uid);
          smoothScrollToElement(elem, 'header', null, 0, additionalHeight);
          // Focus the element after scrolling
          focusUnfocusableElement(elem, true);
        }
      }}
    >
      <PlainTextWrapper field={item.fields?.jumpNavHeading} fallbacks={[item.fields?.heading]} />
    </LinkWrapper>
  );
}

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
    mainGrid: ['grid', 'grid-cols-3', 'gap-layout-base-gutter'],
    sideContent: ['hidden', 'lg:block', 'col-span-1', 'order-2'],
    jumpNav: [
      'sticky',
      'flex',
      'flex-col',
      'pl-margin-tight',
      'gap-space-between-tight',
      'border-l',
      'border-l-color-border-border',
    ],
    navTitleLinkWrapper: [
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'font-normal',
      'relative',
      'group',
      'text-color-text-text',
      'hover:text-color-text-link-link-hover',
    ],
    mainContent: ['col-span-3', 'lg:col-span-2', 'order-1'],
    jumpNavListWrapper: ['flex', 'flex-col', 'gap-spacing-spacing-8'],
    navHeading: [
      'text-color-text-dark',
      'font-typography-body-font-family',
      'text-typography-body-xsmall-font-size',
      'font-semibold',
    ],
    navigationMobileListWrapper: [
      'grid',
      'overflow-hidden',
      'transition-[grid-template-rows]',
      'duration-500',
      'ease-in-out',
    ],
    navigationForMobile: [
      'block',
      'sticky',
      'lg:hidden',
      'px-spacing-spacing-12',
      'py-spacing-spacing-16',
      'bg-color-surface-surface-secondary',
      'flex',
      'flex-col',
      'rounded-component-jump-nav-mobile-radius',
    ],
    jumpNavAccoordionList: ['mt-spacing-spacing-16'],
    navigationMobileList: ['min-h-0'],
    navigationMobileButon: ['w-full', 'flex', 'justify-between'],
    contentWrapper: ['mt-layout-base-gutter', 'lg:mt-0'],
  },
  variants: {
    isActive: {
      true: {
        navTitleLinkWrapper: ['font-semibold'],
      },
      false: {},
    },
    isOpen: {
      true: {
        navigationMobileListWrapper: ['grid-rows-[1fr]'],
      },
      false: {
        navigationMobileListWrapper: ['grid-rows-[0fr]'],
      },
    },
  },
});
