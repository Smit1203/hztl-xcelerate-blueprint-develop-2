'use client';

import { tv } from 'tailwind-variants';
import { useRef, ReactNode, JSX } from 'react';

import { useScrollElementIntoView } from 'lib/hooks/useScrollElementIntoView';

type MainLayoutFrameProps = {
  isSearchLayout: boolean;
  id?: string;
  children: ReactNode;
};

export const MainLayoutFrame = ({
  isSearchLayout,
  id,
  children,
}: MainLayoutFrameProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  useScrollElementIntoView(ref.current, {
    stickyHeaderId: 'header',
    scrollTargetId: 'main-content',
  });

  const { base } = TAILWIND_VARIANTS();

  return (
    <div
      ref={ref}
      className={base({ isSearchLayout })}
      data-component="authorable/shared/site-structure/main-layout/mainlayout"
      id={id}
    >
      {children}
    </div>
  );
};

export default MainLayoutFrame;

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
