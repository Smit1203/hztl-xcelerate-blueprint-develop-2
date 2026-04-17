import React from 'react';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import { createLinkField } from 'lib/utils/navigation-utils';
import { TAILWIND_VARIANTS } from './ContextualNav';
import { ContextualNavItemInfo } from './ContextualNav.graphql';
import { getTestProps } from 'lib/testing/utils';

interface ContextualNavItemProps {
  item: ContextualNavItemInfo;
  isCurrent: boolean;
  isExpanded: boolean;
  hasChildren: boolean;
  onToggle: (id: string) => void;
  level?: number;
  showToggle?: boolean;
  isNavExpanded?: boolean;
  isParentExpanded?: boolean;
  className?: string;
}

export const ContextualNavItem = ({
  item,
  isCurrent,
  isExpanded,
  hasChildren,
  onToggle,
  level = 1,
  showToggle = true,
  isNavExpanded = true,
  isParentExpanded = true,
  className = '',
}: ContextualNavItemProps) => {
  const showLevelToggle = hasChildren && showToggle;
  const isTabbable = isNavExpanded && isParentExpanded;

  const { navItem, link, button, icon, childIcon } = TAILWIND_VARIANTS({
    current: isCurrent,
    isExpanded,
    isTopLevel: level == 1,
    isChild: level > 1,
    isChildNoToggle: level > 1 && !hasChildren,
    isLevel2: level == 2,
    level2isExpanded: level == 2 && isExpanded,
    isLevel3: level == 3,
  });

  return (
    <div className={`${navItem()} ${className}`} {...getTestProps(`component-contextual-nav-item`)}>
      <LinkWrapper
        className={link()}
        field={createLinkField(item)}
        aria-current={isCurrent ? 'page' : undefined}
        ctaComponentClass="default"
        tabIndex={!isTabbable ? -1 : undefined}
        {...getTestProps(`page-link`)}
      />
      {showLevelToggle ? (
        <button
          className={button()}
          aria-expanded={isExpanded}
          aria-controls={`contextual-nav-sublist-${item.id}`}
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          onClick={() => onToggle(item.id)}
          type="button"
          tabIndex={!isTabbable ? -1 : undefined}
        >
          <SvgIcon className={icon()} icon="chevron-down" size="xs" />
        </button>
      ) : (
        <SvgIcon className={childIcon()} icon="arrow-dash-right" size="xs" />
      )}
    </div>
  );
};
