const GetParentItemQuery = /** GQL */ `
  query GetParentItemQuery($itemID: String!, $language: String!) {
    item: item(path: $itemID, language: $language) {
      parent {
        id
        categoryName: field(name: "categoryName"){
            ... on TextField {
                value
            }
        }        
      }
    }
  }
`;

export default GetParentItemQuery;

export type GetParentItemQueryResult = {
  item: {
    parent?: {
      id: string;
      categoryName: { value: string };
    };
  };
};
