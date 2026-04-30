'use client';

import React, { JSX } from 'react';
import { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';

type HeaderMobileProps = {
  fields?: {
    headerLogo?: ImageField;
    headerLogoLink?: LinkField;
  };
};

/**
 * Wave 4c.1 placeholder — minimal Mobile Header shell.
 * Full port (hamburger drawer, mobile nav, mobile language selector)
 * lands in wave 4c.5.
 */
const HeaderMobile = (props: HeaderMobileProps): JSX.Element => {
  const { headerLogo, headerLogoLink } = props.fields || {};

  return (
    <div className="flex items-center justify-between bg-component-header-nav-bg px-general-spacing-margin-x py-spacing-spacing-12">
      <LinkWrapper field={headerLogoLink} ctaComponentClass="default">
        <ImageWrapper field={headerLogo} />
      </LinkWrapper>
      <button
        aria-label="Open menu"
        className="p-2 text-component-header-nav-link-text"
        disabled
      >
        {/* Hamburger — wave 4c.5 */}
        ☰
      </button>
    </div>
  );
};

export default HeaderMobile;
