'use client';

import React, { useEffect, JSX } from 'react';
import { tv } from 'tailwind-variants';
import { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { HeaderProvider, useHeader } from './HeaderContext';

import { ComponentProps } from 'lib/component-props';
import useIsEditing from 'lib/hooks/useIsEditing';
import { useIsMobile } from 'lib/hooks/useIsMobile';
import { getTestProps } from 'lib/testing/utils';

type HeaderProps = ComponentProps & {
  fields?: {
    headerLogo?: ImageField;
    headerLogoLink?: LinkField;
    [key: string]: unknown;
  };
};

const HeaderContent = (props: HeaderProps): JSX.Element => {
  const isEditing = useIsEditing();
  const { isOverlayVisible, handleOverlayChange, setIsMobile } = useHeader();
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  useEffect(() => {
    handleOverlayChange();
  }, [handleOverlayChange]);

  const { base, overlay } = TAILWIND_VARIANTS({ isEditing, isOverlayVisible });

  if (!props.fields) return <></>;

  return (
    <>
      <header
        id="header"
        data-component="authorable/shared/site-structure/header/header"
        {...getTestProps(`component-header-` + props?.rendering?.uid)}
        className={base()}
      >
        <div className="hidden md:block">
          <HeaderDesktop fields={props.fields} />
        </div>
        <div className="block md:hidden">
          <HeaderMobile fields={props.fields} />
        </div>
      </header>
      {isOverlayVisible && <div className={overlay()} />}
    </>
  );
};

export const Default = (props: HeaderProps): JSX.Element => (
  <HeaderProvider>
    <HeaderContent {...props} />
  </HeaderProvider>
);

export default Default;

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
      false: { base: ['sticky'] },
      true: { base: ['relative'] },
    },
    isOverlayVisible: {
      true: { overlay: ['block'] },
      false: { overlay: ['hidden'] },
    },
  },
});
