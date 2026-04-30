'use client';

import React, { JSX } from 'react';
import { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';

type HeaderDesktopProps = {
  fields?: {
    headerLogo?: ImageField;
    headerLogoLink?: LinkField;
  };
};

/**
 * Wave 4c.1 placeholder — minimal Desktop Header shell.
 * Full port (navigation dropdowns, search, language selector, mega-menu)
 * lands in wave 4c.4 once the full LinkWrapper + ButtonWrapper stack is
 * ported in wave 4c.3.
 */
const HeaderDesktop = (props: HeaderDesktopProps): JSX.Element => {
  const { headerLogo, headerLogoLink } = props.fields || {};

  return (
    <div className="flex items-center justify-between bg-component-header-nav-bg px-general-spacing-margin-x py-spacing-spacing-16">
      <div className="flex items-center gap-spacing-spacing-16">
        <LinkWrapper field={headerLogoLink} ctaComponentClass="default">
          <ImageWrapper field={headerLogo} />
        </LinkWrapper>
      </div>
      <div className="text-sm opacity-60">
        {/* Nav / search / language selector — wave 4c.4 */}
      </div>
    </div>
  );
};

export default HeaderDesktop;
