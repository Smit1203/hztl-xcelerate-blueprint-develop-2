'use client';

// Global
import React, { useEffect } from 'react';

// Local
import HeaderDesktop from 'components/authorable/shared/site-structure/Header/HeaderDesktop';
import HeaderMobile from 'components/authorable/shared/site-structure/Header/HeaderMobile';
import { tv } from 'tailwind-variants';
import useIsEditing from 'lib/hooks/useIsEditing';
import { useIsMobile } from 'lib/hooks/useIsMobile';
import { SiteStructure } from '.generated/SiteStructure/Header.model';
import { HeaderProvider, useHeader } from './HeaderContext';
import { getTestProps } from 'lib/testing/utils';

const HeaderContent = (props: SiteStructure.Header.Header_Component) => {
  const isEditing = useIsEditing();
  const { isOverlayVisible, handleOverlayChange, setIsMobile } = useHeader();
  const isMobile = useIsMobile();

  // Update isMobile state when device type changes
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  // Update overlay visibility whenever any menu state changes
  useEffect(() => {
    handleOverlayChange();
  }, [handleOverlayChange]);

  const { base, overlay } = TAILWIND_VARIANTS({
    isEditing,
    isOverlayVisible,
  });

  /*
   * Rendering
   */

  if (!props.fields) {
    return <></>;
  }

  return (
    <>
      <header
        id="header"
        data-component="authorable/shared/site-structure/header/header"
        {...getTestProps(`component-header-` + props?.rendering?.uid)}
        className={base()}
      >
        <div className="hidden md:block">
          <HeaderDesktop {...props} />
        </div>
        <div className="block md:hidden">
          <HeaderMobile {...props} />
        </div>
      </header>
      {isOverlayVisible && <div className={overlay()} />}
    </>
  );
};

export const Default = (props: SiteStructure.Header.Header_Component) => {
  return (
    <HeaderProvider>
      <HeaderContent {...props} />
    </HeaderProvider>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      'top-0',
      'bg-component-header-nav-bg',
      'w-full',
      'z-40',
      'transition-transform',
      'duration-300',
    ],
    overlay: ['fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-30'],
  },
  variants: {
    isEditing: {
      false: {
        base: ['sticky'],
      },
      true: {
        base: ['relative'],
      },
    },
    isOverlayVisible: {
      true: {
        overlay: ['block'],
      },
      false: {
        overlay: ['hidden'],
      },
    },
  },
});
