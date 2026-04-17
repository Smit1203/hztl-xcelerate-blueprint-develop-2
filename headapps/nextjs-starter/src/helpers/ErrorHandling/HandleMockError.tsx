// Global
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import React, { useEffect } from 'react';

// Local

// If you don't have a pathExtractor, you'll need to get the path from the context params.
// Note: Be wary of any middleware rewrites if you aren't using a pathExtractor
import { extractPath } from '@sitecore-content-sdk/nextjs/utils';

export type MockErrorData = {
  throwRenderError: boolean;
  throwStaticPropsError: boolean;
  throwClientSideError: boolean;
};

/** We want to be able to test error handling without introducing a real error
 *  in the code.  Doing so in a content-managed way caused issues with SSG because the build
 *  would fail if there was an error, and also the last good page gets cached so even
 *  if a page conditionally added an error, if a good version of the page was cached, we would not see the error.
 *  Thus do we hard-code static routes that do not show up in the Sitemap nor get statically generated during SSG.
 */
export const getMockError = (
  context: GetServerSidePropsContext | GetStaticPropsContext
): MockErrorData | null => {
  const path = extractPath(context);

  if (path?.indexOf('/mock-error') !== 0) {
    return null;
  }
  return {
    throwRenderError: path.startsWith('/mock-error-render'),
    throwStaticPropsError: path.startsWith('/mock-error-props'),
    throwClientSideError: path.startsWith('/mock-error-client'),
  };
};

const HandleMockError = ({ throwClientSideError, throwRenderError }: MockErrorData) => {
  useEffect(() => {
    if (throwClientSideError) {
      throw new Error('mock client side error');
    }
  }, [throwClientSideError]);

  if (throwRenderError) {
    throw new Error('mock render error');
  }

  return <></>;
};

export default HandleMockError;
