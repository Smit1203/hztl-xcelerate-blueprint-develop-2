'use client';

import NextLink from 'next/link';
import React, { forwardRef } from 'react';
import { LinkField } from '@sitecore-content-sdk/nextjs';
import useIsEditing from 'lib/hooks/useIsEditing';

/**
 * Minimal LinkWrapper — renders a Sitecore LinkField as a next/link.
 * Full LinkWrapper (CTA theming, GTM, external-link icon, button-styles)
 * will replace this when a CTA-heavy component lands.
 */
export interface LinkWrapperProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  field?: LinkField;
  /** Accepted and ignored by the minimal stub; kept so call sites compile. */
  ctaComponentClass?: string;
  children?: React.ReactNode;
}

const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  ({ field, className, children, ctaComponentClass: _cta, ...rest }, ref) => {
    const isEditing = useIsEditing();
    const value = field?.value;

    if (isEditing) {
      return (
        <a ref={ref} className={className} {...rest}>
          {children ?? value?.text}
        </a>
      );
    }

    const href = value?.href;
    if (!href) return null;

    const text = children ?? value?.text ?? href;
    const target = value?.target;
    const title = value?.title;

    const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
      ...rest,
      className,
      target,
      title,
      rel: target === '_blank' ? 'noopener noreferrer' : rest.rel,
    };

    return (
      <NextLink href={href} ref={ref} {...anchorProps}>
        {text}
      </NextLink>
    );
  }
);
LinkWrapper.displayName = 'LinkWrapper';

export default LinkWrapper;
