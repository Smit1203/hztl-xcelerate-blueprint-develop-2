import graphqlClientFactory from 'lib/graphql-client-factory';

export async function getSiteRoot(site: string, language: string = 'en') {
  const graphqlClient = graphqlClientFactory();

  const siteRootResult = await graphqlClient.request<GetSiteRootType>(SITE_ROOT_QUERY, {
    site,
    routePath: '/',
    language,
  });

  return siteRootResult.layout?.item?.parent?.id;
}

const SITE_ROOT_QUERY = `
  query GetSiteRoot($site: String!, $routePath: String!, $language: String!) {
    layout(site: $site, routePath: $routePath, language: $language) {
      item {
        parent {
          id
          name
        }
      }
    }
  }
`;

type GetSiteRootType = {
  layout?: {
    item?: {
      parent?: {
        id: string;
        name: string;
      };
    };
  };
};
