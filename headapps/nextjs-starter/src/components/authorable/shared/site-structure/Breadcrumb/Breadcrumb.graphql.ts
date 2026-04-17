import { Field } from '@sitecore-content-sdk/nextjs';

const BreadcrumbQuery = /** GQL */ `query($itemID: String!, $language: String!){
    currentPage: item(path: $itemID, language: $language) {
      ...breadcrumbInfo

      ancestors(hasLayout: true) {
        ...breadcrumbInfo
      }
    }
  }
  
  fragment NavLinks on MultilistField {
    targetItems {
      key: field(name: "key") {
        jsonValue
      }
    }
  }
  fragment breadcrumbInfo on Item {
    Title: field(name: "pageTitle") {
      jsonValue
    }
     url {
       path
    }
    navigationFilter: field(name: "navigationFilter") {
      ...NavLinks
    }
  }`;

export default BreadcrumbQuery;

export type BreadcrumbQueryResult = {
  currentPage: BreadcrumbInfo & {
    ancestors: BreadcrumbInfo[];
  };
};

export type BreadcrumbInfo = {
  url: {
    path: string;
  };
  navigationFilter: NavLinks;
  Title: {
    jsonValue: Field<string>;
  };
};

export type NavLinks = {
  targetItems: NavFilter[];
};

export type NavFilter = {
  key: {
    jsonValue: Field<string>;
  };
};
