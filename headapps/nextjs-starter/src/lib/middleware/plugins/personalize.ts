import { PersonalizeMiddleware } from '@sitecore-content-sdk/nextjs/middleware';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';

export const personalizeMiddleware = new PersonalizeMiddleware({
  /**
   * List of sites for site resolver to work with
   */
  sites,
  ...scConfig.api.edge,
  ...scConfig.personalize,
  // This function determines if the middleware should be turned off on per-request basis.
  // Certain paths are ignored by default (e.g. Next.js API routes), but you may wish to disable more.
  // By default it is disabled while in development mode.
  // This is an important performance consideration since Next.js Edge middleware runs on every request
  skip: () => false,
  // This is an example of how to provide geo data for personalization.
  // The provided callback will be called on each request to extract geo data.
  // extractGeoDataCb: () => {
  //   return {
  //     city: 'Athens',
  //     country: 'Greece',
  //     region: 'Attica',
  //   };
  // },
});
