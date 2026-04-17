import { MultisiteMiddleware } from '@sitecore-content-sdk/nextjs/middleware';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';

// Instantiate middlewares - they will use Edge config if available, otherwise fall back to local config
export const multisiteMiddleware = new MultisiteMiddleware({
  /**
   * List of sites for site resolver to work with
   */
  sites,
  ...scConfig.api.edge,
  ...scConfig.multisite,
  // This function determines if the middleware should be turned off on per-request basis.
  // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to disable more.
  // This is an important performance consideration since Next.js Edge middleware runs on every request.
  skip: () => false,
});
