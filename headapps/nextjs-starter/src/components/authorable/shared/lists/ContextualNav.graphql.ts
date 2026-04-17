import { Field } from '@sitecore-content-sdk/nextjs';

// Query to get current page and ancestors (for finding navigation root)
const CurrentPageQuery = /** GQL */ `
  query($itemID: String!, $language: String!) {
    currentPage: item(path: $itemID, language: $language) {
      ...editorialPageFragment
      ancestors(includeTemplateIDs: ["{92A53AC9-0BF7-40AA-AA38-A2A77D72AFDA}"]) {
        ...editorialPageFragment
        children(hasLayout: true, includeTemplateIDs: ["{92A53AC9-0BF7-40AA-AA38-A2A77D72AFDA}"]) {
          results {
            ...editorialPageFragment
          }
        }
      }
    }
  }
  fragment editorialPageFragment on Item {
    id
    url {
      path
    }
    ... on EditorialPage {
      pageTitle {
        jsonValue
      }
      navigationFilter {
        targetItems {
          ... on NavigationFilter {
            key {
              value
            }
          }
        }
      }
    }
  }
`;

// Query to get navigation root with full children tree
const NavigationRootQuery = /** GQL */ `
  query($rootID: String!, $language: String!) {
    navRoot: item(path: $rootID, language: $language) {
      ...editorialPageFragment
      children(hasLayout: true, includeTemplateIDs: ["{92A53AC9-0BF7-40AA-AA38-A2A77D72AFDA}"]) {
        results {
          ...editorialPageFragment
          children(hasLayout: true, includeTemplateIDs: ["{92A53AC9-0BF7-40AA-AA38-A2A77D72AFDA}"]) {
            results {
              ...editorialPageFragment
              children(hasLayout: true, includeTemplateIDs: ["{92A53AC9-0BF7-40AA-AA38-A2A77D72AFDA}"]) {
                results {
                  ...editorialPageFragment
                }
              }
            }
          }
        }
      }
    }
  }
  fragment editorialPageFragment on Item {
    id
    url {
      path
    }
    ... on EditorialPage {
      pageTitle {
        jsonValue
      }
      navigationFilter {
        targetItems {
          ... on NavigationFilter {
            key {
              value
            }
          }
        }
      }
    }
  }
`;

export { CurrentPageQuery, NavigationRootQuery };

// Base type for navigation items
export type ContextualNavItemInfo = {
  id: string;
  pageTitle: { jsonValue: Field<string> };
  url: { path: string };
  navigationFilter: {
    targetItems?: {
      key?: { value: string };
    }[];
  };
  children: {
    results: ContextualNavItemInfo[];
  };
};

// TypeScript types for GraphQL response data
export type CurrentPageResult = {
  currentPage: ContextualNavItemInfo & {
    ancestors: ContextualNavItemInfo[];
  };
};

export type NavigationRootResult = {
  navRoot: ContextualNavItemInfo;
};

// Legacy type for backward compatibility
export type ContextualNavResult = CurrentPageResult & NavigationRootResult;
