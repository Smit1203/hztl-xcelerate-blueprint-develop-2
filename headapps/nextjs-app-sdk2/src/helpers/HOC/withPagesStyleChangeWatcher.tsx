'use client';

import { useRef, useState, useEffect } from 'react';

import { ComponentProps } from 'lib/component-props';
import useIsEditing from 'lib/hooks/useIsEditing';

export function withPagesStyleChangeWatcher<P extends ComponentProps>(
  Component: React.ComponentType<P>
) {
  const WatcherComponent: React.ComponentType<P> = (props: P) => {
    const ref = useRef<HTMLDivElement>(null);
    const [styles, setStyles] = useState(props.params?.Styles ?? '');

    const isEditing = useIsEditing();

    useEffect(() => {
      if (!ref.current || !isEditing) {
        return;
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mu) => {
          if (mu.type === 'attributes' && mu.attributeName === 'class') {
            setStyles(ref.current?.classList.value.replace('component ', '') ?? '');
          }
        });
      });

      observer.observe(ref.current, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }, [isEditing, props.params]);

    if (!isEditing) {
      return <Component {...props} />;
    }

    if (props.params) {
      props.params.Styles = styles;

      if (props.rendering.params) {
        props.rendering.params.Styles = styles;
      }
    }

    return (
      <>
        <div ref={ref} className={'component ' + styles} style={{ display: 'none' }} />
        <Component {...props} />
      </>
    );
  };

  return WatcherComponent;
}
