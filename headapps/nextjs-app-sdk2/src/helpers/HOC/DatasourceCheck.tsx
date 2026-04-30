'use client';

import { ReactNode } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

const DefaultEditingError = () => (
  <div className="sc-jss-editing-error" role="alert">
    Datasource is required. Please choose a content item for this component.
  </div>
);

type DatasourceCheckProps = {
  rendering?: ComponentProps['rendering'];
  children: ReactNode;
};

/**
 * Client wrapper that replicates the SDK's `withDatasourceCheck` HOC as a
 * renderable component. Bails out (or shows an editing error) when no
 * datasource is set on the rendering. In design library, always renders.
 */
export const DatasourceCheck = ({ rendering, children }: DatasourceCheckProps) => {
  const { page } = useSitecore();
  const isDesignLibrary = page.mode.isDesignLibrary;

  if (isDesignLibrary || rendering?.dataSource) return <>{children}</>;
  if (page.mode.isEditing) return <DefaultEditingError />;
  return null;
};

export default DatasourceCheck;
