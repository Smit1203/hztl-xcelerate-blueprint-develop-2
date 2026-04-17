import client from 'lib/sitecore-client';

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

export const graphqlClientFactory = (_?: unknown) => {
  return {
    request: <T>(query: string, variables?: Record<string, unknown>) => {
      return client.getData<T>(query, variables);
    },
  };
};

export default graphqlClientFactory;
