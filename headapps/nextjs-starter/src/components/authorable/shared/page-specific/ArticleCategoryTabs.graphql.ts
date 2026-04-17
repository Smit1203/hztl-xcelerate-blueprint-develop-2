const ArticleCategoryTabsQuery = /** GQL */ `query ArticleCategoryTabsQuery($contextItem: String!, $language: String!) {
    currentPage: item(path: $contextItem, language: $language) {
      id
      categoryName: field(name: "categoryName"){
      	... on TextField {
          value
        }
      } 
      url {
        path
      }
      template {
        name
      }
      children(includeTemplateIDs: ["{61F24E8B-82CE-46D6-8C3F-6FE0F3AC6C0A}"]) {
        results {
          id
          categoryName: field(name: "categoryName"){
            ... on TextField {
              value
            }
          }
          url {
            path
          }
        }
      }
      parent {
        id
        categoryName: field(name: "categoryName"){
          ... on TextField {
            value
          }
        } 
        url {
          path
        }
        children(includeTemplateIDs: ["{61F24E8B-82CE-46D6-8C3F-6FE0F3AC6C0A}"]) {
          results {
            id
            categoryName: field(name: "categoryName"){
              ... on TextField {
                value
              }
            }
            url {
              path
            }
          }
        }
      }
    }
  }
`;

export default ArticleCategoryTabsQuery;

export type Category = {
  id: string;
  categoryName: { value: string };
  url: { path: string };
};

export type ArticleCategoryTabsQueryResult = {
  currentPage: {
    id: string;
    categoryName: { value: string };
    url: { path: string };
    template: { name: string };
    children?: { results: Category[] };
    parent?: {
      id: string;
      categoryName: { value: string };
      url: { path: string };
      children?: { results: Category[] };
    };
  };
};
