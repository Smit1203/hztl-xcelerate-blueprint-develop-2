'use client';

import { useEffect, JSX } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import scConfig from 'sitecore.config';

type BootstrapProps = {
  siteName: string;
  isPreviewMode: boolean;
};

const Bootstrap = ({ siteName, isPreviewMode }: BootstrapProps): JSX.Element | null => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Browser Events SDK is not initialized in development environment');
      return;
    }
    if (isPreviewMode) {
      console.debug('Browser Events SDK is not initialized in edit and preview modes');
      return;
    }
    if (!scConfig.api.edge?.clientContextId) {
      console.error('Client Edge API settings missing from configuration');
      return;
    }
    CloudSDK({
      sitecoreEdgeUrl: scConfig.api.edge.edgeUrl,
      sitecoreEdgeContextId: scConfig.api.edge.clientContextId,
      siteName: siteName || scConfig.defaultSite,
      enableBrowserCookie: true,
      cookieDomain: window.location.hostname.replace(/^www\./, ''),
    })
      .addEvents()
      .initialize();
  }, [siteName, isPreviewMode]);

  return null;
};

export default Bootstrap;
