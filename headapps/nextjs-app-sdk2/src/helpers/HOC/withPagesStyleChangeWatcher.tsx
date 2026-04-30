'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

import { ComponentProps } from 'lib/component-props';
import useIsEditing from 'lib/hooks/useIsEditing';

type PagesStyleChangeWatcherProps = {
  params?: ComponentProps['params'];
  rendering?: ComponentProps['rendering'];
  children: ReactNode;
};

/**
 * Client wrapper that mirrors the behavior of HyperX's
 * `withPagesStyleChangeWatcher` HOC for App Router. Watches the host node
 * for class-attribute mutations from Sitecore Pages' style toolbar and
 * propagates the new class string into props.params.Styles.
 *
 * Rendered as JSX inside `withStandardComponentWrapper` instead of being
 * invoked at module-load — invocation would cross the server/client
 * boundary illegally.
 */
export const PagesStyleChangeWatcher = ({
  params,
  rendering,
  children,
}: PagesStyleChangeWatcherProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState(params?.Styles ?? '');

  const isEditing = useIsEditing();

  useEffect(() => {
    if (!ref.current || !isEditing) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mu) => {
        if (mu.type === 'attributes' && mu.attributeName === 'class') {
          setStyles(ref.current?.classList.value.replace('component ', '') ?? '');
        }
      });
    });
    observer.observe(ref.current, { attributes: true });
    return () => observer.disconnect();
  }, [isEditing, params]);

  if (!isEditing) {
    return <>{children}</>;
  }

  if (params) {
    params.Styles = styles;
    if (rendering?.params) {
      rendering.params.Styles = styles;
    }
  }

  return (
    <>
      <div ref={ref} className={'component ' + styles} style={{ display: 'none' }} />
      {children}
    </>
  );
};

export default PagesStyleChangeWatcher;
