import { ContextualNavItemInfo } from 'components/authorable/shared/lists/ContextualNav.graphql';

// Validation functions
export const isValidNavigationItem = (item: ContextualNavItemInfo): boolean => {
  if (!item.id || !item.pageTitle?.jsonValue?.value || !item.url?.path) {
    return false;
  }

  const hasSidebarFilter =
    item.navigationFilter?.targetItems?.some((filter) => filter.key?.value === 'sidebar') || false;

  return !hasSidebarFilter;
};

// Display text helpers
export const getNavigationDisplayText = (item: ContextualNavItemInfo): string => {
  return item.pageTitle?.jsonValue?.value || '';
};

// Children processing - simplified since we get all children in one query
export const getValidChildren = (item: ContextualNavItemInfo): ContextualNavItemInfo[] => {
  return (item.children?.results || []).filter(isValidNavigationItem);
};

// Link field creation
export const createLinkField = (item: ContextualNavItemInfo) => ({
  value: {
    href: item.url?.path || '#',
    text: getNavigationDisplayText(item),
  },
});
