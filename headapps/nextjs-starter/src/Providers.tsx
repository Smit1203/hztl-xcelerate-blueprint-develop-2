'use client';

import {
  ComponentPropsCollection,
  ComponentPropsContext,
  Page,
  SitecoreProvider,
} from '@sitecore-content-sdk/nextjs';
import components from '.sitecore/component-map.client';
import scConfig from 'sitecore.config';

const Providers = ({
  children,
  componentProps,
  page,
}: {
  children: React.ReactNode;
  componentProps?: ComponentPropsCollection;
  page: Page;
}) => {
  return (
    <ComponentPropsContext value={componentProps || {}}>
      <SitecoreProvider
        componentMap={components}
        api={scConfig.api}
        page={page}
        loadImportMap={() => import('.sitecore/import-map.client')}
      >
        {children}
      </SitecoreProvider>
    </ComponentPropsContext>
  );
};

export default Providers;
