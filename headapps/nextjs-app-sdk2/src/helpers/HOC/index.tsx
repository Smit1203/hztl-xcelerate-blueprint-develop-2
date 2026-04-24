import { withDatasourceCheck } from '@sitecore-content-sdk/nextjs';

import { withPagesStyleChangeWatcher } from 'helpers/HOC/withPagesStyleChangeWatcher';
import { ComponentProps } from 'lib/component-props';

export function withStandardComponentWrapper<P extends ComponentProps>(
  Component: React.ComponentType<P>,
  hasDataSource = true
) {
  const WithDataSourceComponent = hasDataSource ? withDatasourceCheck()(Component) : Component;
  const WrappedComponent = withPagesStyleChangeWatcher(WithDataSourceComponent);

  return WrappedComponent;
}
