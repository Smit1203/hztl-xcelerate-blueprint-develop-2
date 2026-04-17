/**
 * For Next JS 14.x
 * In Next JS 14.x type script file wont be imported inside a JS file.
 * cors-header.js needs the JS version of CPS setting retrival using Graph QL Client Factory JS version
 */

const {
  GraphQLRequestClient,
  getEdgeProxyContentUrl,
} = require('@sitecore-content-sdk/nextjs/client');

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @param config jss config
 * @returns GraphQLRequestClientFactory instance
 */
const createGraphQLClientFactory = () => {
  let clientConfig;
  const sitecoreEdgeContextId = process.env.SITECORE_EDGE_CONTEXT_ID;
  const sitecoreEdgeUrl = process.env.SITECORE_EDGE_URL;
  const graphQLEndpoint = process.env.GRAPH_QL_ENDPOINT;
  const sitecoreApiKey = process.env.SITECORE_API_KEY;

  if (sitecoreEdgeContextId) {
    clientConfig = {
      endpoint: getEdgeProxyContentUrl(sitecoreEdgeContextId, sitecoreEdgeUrl),
    };
  } else if (graphQLEndpoint && sitecoreApiKey) {
    clientConfig = {
      endpoint: graphQLEndpoint,
      apiKey: sitecoreApiKey,
    };
  } else {
    throw new Error(
      'Please configure either your sitecoreEdgeContextId, or your graphQLEndpoint and sitecoreApiKey.'
    );
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

module.exports = {
  createGraphQLClientFactory,
};
