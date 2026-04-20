import { createRobotsRouteHandler } from '@sitecore-content-sdk/nextjs/route-handler';
import client from 'lib/sitecore-client';
import sites from '.sitecore/sites.json';

const { GET } = createRobotsRouteHandler({ client, sites });

export { GET };
