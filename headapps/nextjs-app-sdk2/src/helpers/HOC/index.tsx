import React, { JSX } from 'react';

import { DatasourceCheck } from 'helpers/HOC/DatasourceCheck';
import { PagesStyleChangeWatcher } from 'helpers/HOC/withPagesStyleChangeWatcher';
import { ComponentProps } from 'lib/component-props';

/**
 * App Router-safe replacement for HyperX's invocation-style HOC. Returns a
 * regular function component that renders the supplied component wrapped
 * in `<DatasourceCheck>` (when `hasDataSource`) and
 * `<PagesStyleChangeWatcher>`.
 *
 * Crucially this does NOT call `withDatasourceCheck()` or
 * `withPagesStyleChangeWatcher()` at module-load — both live in
 * `'use client'` modules and invoking them server-side throws
 * "Attempted to call X() from the server".
 */
export function withStandardComponentWrapper<P extends ComponentProps>(
  Component: React.ComponentType<P>,
  hasDataSource = true
) {
  const Wrapped = (props: P): JSX.Element => {
    const inner = (
      <PagesStyleChangeWatcher params={props.params} rendering={props.rendering}>
        <Component {...props} />
      </PagesStyleChangeWatcher>
    );

    if (!hasDataSource) return inner;

    return <DatasourceCheck rendering={props.rendering}>{inner}</DatasourceCheck>;
  };

  Wrapped.displayName = `withStandardComponentWrapper(${Component.displayName || Component.name || 'Component'})`;

  return Wrapped;
}
