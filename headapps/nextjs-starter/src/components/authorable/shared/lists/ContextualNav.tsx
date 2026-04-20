'use client';

import React, { useRef, JSX } from 'react';
import { tv } from 'tailwind-variants';
import { GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import { ComponentProps } from 'lib/component-props';
import graphqlClientFactory from 'lib/graphql-client-factory';
import {
  CurrentPageQuery,
  NavigationRootQuery,
  CurrentPageResult,
  NavigationRootResult,
  ContextualNavItemInfo,
} from './ContextualNav.graphql';
import { useNavigationState } from 'lib/hooks/useNavigationState';
import {
  isValidNavigationItem,
  getValidChildren,
  createLinkField,
} from 'lib/utils/navigation-utils';
import { ContextualNavItem } from './ContextualNavItem';
import { getTestProps } from 'lib/testing/utils';

export type ContextualNavDataType = ComponentProps & {
  staticProps: {
    currentPage: CurrentPageResult['currentPage'];
    navRoot: NavigationRootResult['navRoot'] | null;
    language: string;
  };
};

// NavList component for rendering navigation items
const NavList = ({
  items,
  currentPageId,
  expandedItems,
  onToggle,
  level = 1,
  isNavExpanded = true,
  isParentExpanded = true,
}: {
  items: ContextualNavItemInfo[];
  currentPageId: string;
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
  level?: number;
  isNavExpanded?: boolean;
  isParentExpanded?: boolean;
}) => {
  const { list } = TAILWIND_VARIANTS();

  return (
    <ul
      className={level === 1 ? list() : undefined}
      {...getTestProps(`component-contextual-nav-${level}`)}
    >
      {items.map((item, index) => {
        const isCurrent = item.id === currentPageId;
        const isManuallyExpanded = expandedItems.has(item.id);

        // Current pages start expanded by default, but can be manually collapsed
        // Non-current pages only show children when manually expanded
        const shouldShowChildren = isCurrent
          ? !expandedItems.has(`collapsed-${item.id}`) // Current pages: show unless explicitly collapsed
          : isManuallyExpanded; // Non-current pages: show only when manually expanded

        const validChildren = getValidChildren(item);
        const showLevelToggle = validChildren.length > 0;

        const { sublist, sublistChild, listItem } = TAILWIND_VARIANTS({
          isExpanded: shouldShowChildren, // CSS reflects actual visibility
          current: isCurrent,
        });

        return (
          <li
            key={item.id}
            className={level === 1 ? listItem() : undefined}
            {...getTestProps(`contextual-nav-item-${level}-${index}`)}
          >
            <ContextualNavItem
              item={item}
              isCurrent={isCurrent}
              isExpanded={shouldShowChildren} // Toggle button reflects actual state
              hasChildren={validChildren.length > 0}
              onToggle={onToggle}
              level={level}
              showToggle={showLevelToggle}
              isNavExpanded={isNavExpanded}
              isParentExpanded={isParentExpanded}
            />
            {validChildren.length > 0 && shouldShowChildren && (
              <div
                className={level === 1 ? sublist() : sublistChild()}
                role="region"
                aria-labelledby={`contextual-nav-link-${item.id}`}
                id={`contextual-nav-sublist-${item.id}`}
              >
                <NavList
                  items={validChildren}
                  currentPageId={currentPageId}
                  expandedItems={expandedItems}
                  onToggle={onToggle}
                  level={level + 1}
                  isNavExpanded={isNavExpanded}
                  isParentExpanded={shouldShowChildren}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

// Base ContextualNav component that accepts initial state
const ContextualNavBase = ({
  props,
  initialNavExpanded = true,
  showToggleButton = true,
}: {
  props: ContextualNavDataType;
  initialNavExpanded?: boolean;
  showToggleButton?: boolean;
}): JSX.Element => {
  const { staticProps } = props;
  const mainToggleRef = useRef<HTMLButtonElement>(null);

  // Filter navigationItems to only include valid EditorialPage items (already filtered by includeTemplateIDs)
  const navigationItems = (staticProps?.navRoot?.children?.results || []).filter(
    isValidNavigationItem
  );
  const currentPageId = staticProps?.currentPage?.id || '';
  const ancestors = staticProps?.currentPage?.ancestors || [];

  // Use the custom navigation state hook with initial state - ALWAYS call this hook
  const { expandedItems, isNavExpanded, handleItemToggle, handleNavToggle } = useNavigationState(
    currentPageId,
    ancestors,
    navigationItems,
    initialNavExpanded
  );

  // Early return if no navigation root found - AFTER hook calls
  if (!staticProps?.navRoot) {
    return <></>;
  }

  // Hide entire component if root item has navigation filters (same logic as individual items)
  if (!isValidNavigationItem(staticProps.navRoot)) {
    return <></>;
  }

  // Determine if the main nav is active
  const isMainNavActive =
    staticProps.navRoot.url?.path === staticProps.currentPage.url?.path ||
    staticProps.navRoot.id === staticProps.currentPage.id;

  const { container, heading, link, mainButton, mainLink, navContainer, mainNavItem, mainIcon } =
    TAILWIND_VARIANTS({
      isExpanded: isNavExpanded,
      current: isMainNavActive,
    });

  return (
    <aside
      className={container()}
      data-component="authorable/shared/lists/contextual-nav"
      id={props.rendering.uid}
      {...getTestProps(
        `contextual-nav-${initialNavExpanded ? 'desktop' : 'mobile'}-${props?.rendering?.uid}`
      )}
    >
      <nav role="navigation" aria-label="Contextual Navigation">
        <div className={heading()}>
          <div className={mainNavItem()}>
            <LinkWrapper
              field={createLinkField(staticProps.navRoot)}
              className={mainLink() + link()}
              ctaComponentClass="default"
              {...getTestProps(`contextual-nav-main-nav`)}
            />
            {showToggleButton ? (
              <button
                className={mainButton()}
                aria-expanded={isNavExpanded}
                aria-controls="contextual-nav-list"
                aria-label={isNavExpanded ? 'Collapse navigation' : 'Expand navigation'}
                onClick={handleNavToggle}
                type="button"
                ref={mainToggleRef}
                {...getTestProps(`contextual-nav-toggle-btn`)}
              >
                <SvgIcon className={mainIcon()} icon="chevron-down" size="xs" />
              </button>
            ) : (
              <SvgIcon className={mainIcon()} icon="arrow-dash-right" size="s" />
            )}
          </div>
        </div>
        <div className={navContainer()} id="contextual-nav-list" aria-hidden={!isNavExpanded}>
          {navigationItems.length > 0 ? (
            <NavList
              items={navigationItems}
              currentPageId={currentPageId}
              expandedItems={expandedItems}
              onToggle={handleItemToggle}
              level={1}
              isNavExpanded={isNavExpanded}
              isParentExpanded={true}
            />
          ) : (
            <p>No navigation items found</p>
          )}
        </div>
      </nav>
    </aside>
  );
};

// Mobile version - starts collapsed, shows toggle button
const ContextualNavMobile = (props: ContextualNavDataType): JSX.Element => {
  return <ContextualNavBase props={props} initialNavExpanded={false} showToggleButton={true} />;
};

// Desktop version - starts expanded, hides toggle button
const ContextualNavDesktop = (props: ContextualNavDataType): JSX.Element => {
  return <ContextualNavBase props={props} initialNavExpanded={true} showToggleButton={false} />;
};

// Main component that renders mobile/desktop versions
const ContextualNav = (props: ContextualNavDataType): JSX.Element => {
  return (
    <>
      <div className="hidden md:block">
        <ContextualNavDesktop {...props} />
      </div>
      <div className="block md:hidden">
        <ContextualNavMobile {...props} />
      </div>
    </>
  );
};

export const TAILWIND_VARIANTS = tv({
  slots: {
    container: ['contextual-nav', 'relative', 'w-full', 'min-w-max'],
    heading: [
      'w-full',
      'font-semibold',
      'rounded-general-border-radius-button',
      'text-typography-body-medium-font-size',
      'font-typography-body-font-family',
      'bg-color-fill-brand-1',
      'px-spacing-spacing-4',
    ],
    navContainer: ['transition-all', 'duration-300', 'ease-in-out'],
    mainNavItem: ['relative', 'group', 'flex', 'items-center', 'transition-colors', 'duration-200'],
    navItem: ['relative', 'rounded-general-border-radius-button'],
    button: [
      'mx-2',
      'w-8',
      'h-8',
      'flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'hover:bg-color-fill-fill-hover',
      'focus:outline-none',
      'focus:ring-2',
    ],
    mainButton: [
      'ml-auto',
      'w-8',
      'h-8',
      'flex',
      'items-center',
      'justify-center',
      'rounded-border-radius-radius-3',
      'focus:outline-none',
      'focus:ring-border-width-width-05',
      'flex-shrink-0',
      'transition-colors',
      'duration-200',
    ],
    mainLink: [
      '!text-color-text-white',
      'px-spacing-spacing-12',
      'py-spacing-spacing-12',
      'text-color-text-dark',
    ],
    icon: [
      'w-4',
      'h-4',
      'transition-transform',
      'duration-200',
      'flex-shrink-0',
      'text-color-icon-icon',
      'group-hover:text-color-icon-icon-hover',
    ],
    listItem: ['py-spacing-spacing-8', 'border-b', 'border-color-border-border-secondary'],
    link: [
      'block',
      'font-semibold',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'text-color-text-text-secondary',
      'rounded-general-border-radius-button',
      'hover:text-color-text-text',
      'hover:underline',
      'focus:bg-transparent',
      'focus:outline-offset-0',
      'flex-1',
      'transition-colors',
      'duration-200',
    ],
    list: [
      'rounded-general-border-radius-button',
      'bg-color-surface-white',
      'mx-spacing-spacing-8',
    ],
    sublist: ['transition-all', 'duration-200', 'ease-in-out'],
    sublistChild: [
      'mt-spacing-spacing-1',
      'mx-spacing-spacing-1',
      'transition-all',
      'duration-200',
      'ease-in-out',
    ],
    childIcon: [
      '!w-6',
      '!h-6',
      'mr-2',
      'transition-opacity',
      'duration-200',
      'ease-in-out',
      'opacity-100',
      'md:opacity-0',
      'md:group-hover:opacity-100',
      'flex-shrink-0',
      'text-color-icon-icon',
      'group-hover:text-color-icon-icon-hover',
    ],
    mainIcon: [
      'mr-spacing-spacing-12',
      'transition-opacity',
      'duration-200',
      'ease-in-out',
      'flex-shrink-0',
      'text-color-text-white',
      'group-hover:text-color-text-white',
    ],
  },
  variants: {
    isExpanded: {
      true: {
        icon: ['rotate-180', 'text-color-icon-icon'],
        navItem: ['bg-color-fill-fill-selected', 'hover:bg-color-fill-fill-selected'],
        navContainer: ['max-h-full', 'opacity-100', 'pointer-events-auto'],
        sublist: ['max-h-full', 'opacity-100'],
        sublistChild: ['max-h-full', 'opacity-100'],
      },
      false: {
        icon: ['text-color-icon-icon'],
        navItem: ['hover:bg-color-fill-fill-hover'],
        navContainer: ['max-h-0', 'opacity-0', 'pointer-events-none'],
        sublist: ['max-h-0', 'opacity-0'],
        sublistChild: ['max-h-0', 'opacity-0'],
      },
    },
    current: {
      true: {
        link: ['underline'],
      },
    },
    isChild: {
      true: {
        navItem: [
          'relative',
          'my-spacing-spacing-1',
          'mx-spacing-spacing-1',
          'group',
          'flex',
          'items-center',
          'transition-colors',
          'duration-200',
        ],
        link: ['py-spacing-spacing-8', 'px-spacing-spacing-12'],
      },
      false: {
        navItem: ['group', 'flex', 'items-center', 'transition-colors', 'duration-200'],
      },
    },
    isTopLevel: {
      true: {
        link: ['py-spacing-spacing-8', 'px-spacing-spacing-16'],
        childIcon: ['md:opacity-100'],
      },
    },
    isLevel1: {
      true: {
        link: ['pl-spacing-spacing-12'],
      },
    },
    isLevel2: {
      true: {
        link: ['pl-spacing-spacing-32'],
      },
    },
    level2isExpanded: {
      true: {
        navItem: ['!bg-color-fill-fill-secondary', 'hover:bg-color-fill-fill-selected'],
      },
    },
    isLevel3: {
      true: {
        link: ['pl-spacing-spacing-48'],
      },
    },
    isChildNoToggle: {
      true: {
        navItem: ['w-fit', '!hover:bg-transparent', '!bg-transparent'],
      },
      false: {
        navItem: ['w-auto'],
      },
    },
  },
  compoundVariants: [
    {
      current: true,
      isChild: true,
      class: {
        navItem: ['!border-b-0', 'bg-color-surface-surface-secondary'],
      },
    },
    {
      isChild: true,
      isChildNoToggle: true,
      class: {
        navItem: ['w-fit', 'hover:bg-transparent'],
        link: ['!hover:bg-transparent', '!bg-transparent'],
      },
    },
    {
      current: true,
      isLevel2: true,
      isChildNoToggle: true,
      class: {
        navItem: ['!bg-color-surface-white', 'hover:bg-color-surface-white'],
      },
    },
  ],
});

// Helper function to find navigation root from current page ancestors
function findNavigationRoot(
  currentPage: CurrentPageResult['currentPage'],
  ancestors: ContextualNavItemInfo[]
): string | null {
  // Ancestors are already filtered to EditorialPage only via includeTemplateIDs
  const editorialAncestors = [...ancestors].reverse();

  // Look for the first EditorialPage ancestor that has children (indicating it's a navigation root)
  for (const ancestor of editorialAncestors) {
    if (isValidNavigationItem(ancestor) && ancestor.children?.results?.length > 0) {
      return ancestor.id;
    }
  }

  // If no ancestor with children found, check if current page is the root and is EditorialPage
  if (isValidNavigationItem(currentPage) && editorialAncestors.length === 0) {
    return currentPage.id;
  }

  // Fallback: return the furthest EditorialPage ancestor (root) if it's a valid navigation item
  if (editorialAncestors.length > 0 && isValidNavigationItem(editorialAncestors[0])) {
    return editorialAncestors[0].id;
  }

  return null;
}

export const getComponentServerProps: GetComponentServerProps = async (_rendering, layoutData) => {
  const graphQLClient = graphqlClientFactory({});
  const language = layoutData?.sitecore?.context?.language || 'en';
  const itemId = layoutData?.sitecore?.route?.itemId;

  if (!itemId) {
    return { staticProps: { currentPage: null, navRoot: null, language } };
  }

  // First query: Get current page and ancestors to find navigation root
  const result = await graphQLClient.request<CurrentPageResult>(CurrentPageQuery, {
    itemID: itemId,
    language,
  });

  // Find navigation root from current page and ancestors
  const navigationRootId = findNavigationRoot(result.currentPage, result.currentPage.ancestors);

  let navRoot = null;

  // Second query: Get navigation root with full children tree if we found one
  if (navigationRootId) {
    const navRootResult = await graphQLClient.request<NavigationRootResult>(NavigationRootQuery, {
      rootID: navigationRootId,
      language,
    });
    navRoot = navRootResult?.navRoot || null;
  }

  return {
    staticProps: {
      currentPage: result.currentPage,
      navRoot,
      language,
    },
  };
};

export default ContextualNav;
