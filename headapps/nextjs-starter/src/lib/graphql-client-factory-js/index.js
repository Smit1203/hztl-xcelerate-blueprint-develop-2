/**
 * For Next JS 14.x
 * In Next JS 14.x type script file wont be imported inside a JS file.
 * cors-header.js needs the JS version of CPS setting retrival using Graph QL Client Factory JS version
 */
const { createGraphQLClientFactory } = require('./create');

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

// Create a new instance on each import call
module.exports = createGraphQLClientFactory();
