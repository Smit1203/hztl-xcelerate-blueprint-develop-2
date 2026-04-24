'use client';
import { tv } from 'tailwind-variants';
import { useRef, JSX } from 'react';

import { ComponentProps } from 'lib/component-props';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { useScrollElementIntoView } from 'lib/hooks/useScrollElementIntoView';
import { findComponent } from 'lib/utils/object-utils';

const MainLayout = (props: ComponentProps): JSX.Element => {
  const { RenderingIdentifier } = props?.params || {};
  const { base } = TAILWIND_VARIANTS();

  const mainLayoutRef = useRef<HTMLDivElement>(null);

  useScrollElementIntoView(mainLayoutRef.current, {
    stickyHeaderId: 'header',
    scrollTargetId: 'main-content',
  });

  const isSearchLayout =
    findComponent(props.rendering, 'ArticleMain')?.length > 0 ||
    findComponent(props.rendering, 'SearchResult')?.length > 0;

  return (
    <div
      ref={mainLayoutRef}
      className={base({ isSearchLayout: isSearchLayout })}
      data-component="authorable/shared/site-structure/main-layout/mainlayout"
      id={RenderingIdentifier}
    >
      <PlaceholderWrapper
        helpTextHideIf={true}
        name="custom-headless-breadcrumb"
        rendering={props.rendering}
      />
      <PlaceholderWrapper name="custom-headless-hero" rendering={props.rendering} />
      <PlaceholderWrapper name="custom-headless-main-content" rendering={props.rendering} />
    </div>
  );
};

export const Default = MainLayout;
export default MainLayout;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      'grid',
      'grid-cols-1',
      'm-auto',
      'w-full',
      'max-w-screen-dimensions-max-width',
      'min-w-screen-dimensions-min-width',
      'px-general-spacing-margin-x',
    ],
  },
  variants: {
    isSearchLayout: {
      true: {
        base: ['gap-0', '!pb-general-spacing-margin-y'],
      },
    },
  },
});
