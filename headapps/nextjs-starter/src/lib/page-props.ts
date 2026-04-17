// Global
import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';

// Local
import { MockErrorData } from 'helpers/ErrorHandling/HandleMockError';

/**
 * Sitecore page props
 */
export interface CustomSitecorePageProps extends SitecorePageProps {
  /** Used when we are testing our error handling */
  mockError?: MockErrorData | null;
  // contentStyles: string; // Content stylesheet link, empty if styles are not used on the page
}
