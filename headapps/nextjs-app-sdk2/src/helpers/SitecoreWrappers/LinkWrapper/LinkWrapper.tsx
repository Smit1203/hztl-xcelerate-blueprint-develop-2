'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import {
  Link as JSSLink,
  LinkProps,
  LinkField,
  LinkFieldValue,
} from '@sitecore-content-sdk/nextjs';
import NextLink from 'next/link';
import React, { forwardRef, JSX } from 'react';
import { tv } from 'tailwind-variants';

import { CtaProps, ctaTailwindVariant } from 'helpers/SitecoreWrappers/ButtonWrapper/ButtonWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import useIsEditing from 'lib/hooks/useIsEditing';
import { GtmEvent } from 'lib/utils/gtm-utils';
import { useFieldWithFallbacks } from 'lib/hooks/useFieldWithFallbacks';
import { CtaIcons } from 'lib/utils/style-param-utils/modules/ctas';
import { parseLink } from 'lib/utils/link-utils';
import { useCtaComponentClass } from 'lib/hooks/theming/useCtaComponentClass';

const INTERNAL_LINK_REGEX = /^\/|^\#/g;

const SITECORE_TARGET_OPTIONS = {
  ACTIVE_BROWSER: '_self',
  CUSTOM: '|Custom',
  NEW_BROWSER: '_blank',
} as const;

const processTargetValue = (target?: string): string | undefined => {
  if (target?.includes('|Custom')) {
    const actualTarget = target.replace('|Custom', '');
    return actualTarget.trim() || undefined;
  }

  if (target === SITECORE_TARGET_OPTIONS.CUSTOM) {
    return undefined;
  }

  return target;
};

export type LinkWrapperProps = Omit<LinkProps, 'field' | 'href'> &
  CtaProps & {
    field?: LinkField | LinkFieldValue;
    fallbacks?: (LinkField | LinkFieldValue | undefined)[];
    gtmEvent?: GtmEvent;
    srOnlyText?: string;
    suppressNewTabIcon?: boolean;
    shouldRenderTitleAttribute?: boolean;
  };

const linkWrapperTailwindVariant = tv({
  extend: ctaTailwindVariant,
  slots: {
    iconNewTab: ['align-middle', 'inline-flex', 'ml-2', 'flex-shrink-0', '-mt-px'],
  },
});

const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  (originalProps: LinkWrapperProps, ref): JSX.Element | null => {
    const {
      onClick,
      children,
      className,
      ctaStyle,
      ctaIcon: ctaIconOverride,
      ctaIconAlignment: ctaIconAlignmentOverride,
      ctaVariant: ctaVariantOverride,
      ctaVisibility: ctaVisibilityOverride,
      ctaComponentClass,
      editable = true,
      field,
      fallbacks,
      gtmEvent,
      showLinkTextWithChildrenPresent = false,
      srOnlyText,
      suppressNewTabIcon,
      shouldRenderTitleAttribute = false,
      ...props
    } = originalProps;

    const ctaIcon = ctaIconOverride ?? ctaStyle?.ctaIcon;
    const ctaVariant = ctaVariantOverride ?? ctaStyle?.ctaVariant ?? 'link';
    const ctaIconAlignment = ctaIconAlignmentOverride ?? ctaStyle?.ctaIconAlignment ?? 'right';
    const ctaVisibility = ctaVisibilityOverride ?? ctaStyle?.ctaVisibility ?? 'visible';

    const isEditing = useIsEditing() && editable;

    const { renderField } = useFieldWithFallbacks(field, fallbacks);

    let effectiveCtaComponentClass = ctaComponentClass;
    if (effectiveCtaComponentClass === 'default') {
      effectiveCtaComponentClass =
        ctaVariant === 'primary'
          ? 'component-hero-button-color-1'
          : 'component-hero-button-color-2';
    }

    const style = useCtaComponentClass(effectiveCtaComponentClass);

    if (!renderField) {
      return <></>;
    }

    const clonedField = structuredClone(renderField);

    const fieldValue: LinkFieldValue = {
      ...((clonedField as LinkField)?.value ?? (clonedField as LinkFieldValue)),
    };

    const { target, title } = fieldValue;

    const { realText, shouldRender, isInternalAnchor, isCustomProtocol, parsedUrl } = parseLink(
      fieldValue,
      children,
      showLinkTextWithChildrenPresent
    );

    if (parsedUrl?.href?.startsWith('/')) {
      const normalizedPathname = parsedUrl.pathname.toLowerCase();
      const normalizedHref = `${normalizedPathname}${parsedUrl.search}${parsedUrl.hash}`;

      parsedUrl.pathname = normalizedPathname;
      parsedUrl.href = normalizedHref;
    }

    const { base } = linkWrapperTailwindVariant({
      iconAlignment: ctaIconAlignment,
      variant: ctaVariant,
      visibility: ctaVisibility,
      style: style,
    });

    if (isEditing) {
      return (
        <EditModeLink
          {...originalProps}
          {...{
            ctaIcon,
            ctaIconAlignment,
            ctaVariant,
            ctaVisibility,
            ctaComponentClass: effectiveCtaComponentClass ?? 'default',
          }}
          ref={ref}
          field={clonedField}
        />
      );
    }

    if (!shouldRender || !parsedUrl) {
      return <></>;
    }

    const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (renderField?.value) {
        const gtmEventInner = {
          ...gtmEvent,
          'gtm.element.dataset.gtmLinkName': realText || title,
          'gtm.element.dataset.gtmLinkUrl': parsedUrl.href,
        };

        sendGTMEvent(gtmEventInner);
      }

      if (onClick) onClick(e);
    };

    if (isInternalAnchor || isCustomProtocol) {
      return (
        <a
          {...props}
          className={[className, base(), 'group'].join(' ')}
          data-component="helpers/sitecorewrappers/linkwrapper"
          href={isInternalAnchor ? parsedUrl.hash : parsedUrl.href}
          onClick={handleOnClick}
          ref={ref}
          {...(shouldRenderTitleAttribute ? { title: title || realText } : {})}
        >
          {!children ? (
            <span>
              {realText ||
                (parsedUrl.href?.startsWith('/') ? parsedUrl.href.slice(1) : parsedUrl.href)}
            </span>
          ) : (
            <span>{realText}</span>
          )}
          {children}
          <ScreenReaderOnlyTextAndNewTabIcon
            target={processTargetValue(target)}
            srOnlyText={srOnlyText}
            suppressNewTabIcon={suppressNewTabIcon}
            ctaIcon={ctaIcon}
            variant={ctaVariant}
            style={style}
          />
        </a>
      );
    }

    return (
      <NextLink
        {...props}
        className={[className, base(), 'group'].join(' ')}
        data-component="helpers/sitecorewrappers/linkwrapper"
        href={parsedUrl}
        onClick={handleOnClick}
        ref={ref}
        target={processTargetValue(target)}
        {...(shouldRenderTitleAttribute ? { title: title || realText } : {})}
      >
        {realText ? <span>{realText}</span> : null}
        {children}

        <ScreenReaderOnlyTextAndNewTabIcon
          target={processTargetValue(target)}
          srOnlyText={srOnlyText}
          suppressNewTabIcon={suppressNewTabIcon}
          ctaIcon={ctaIcon}
          variant={ctaVariant}
          style={style}
        />
      </NextLink>
    );
  }
);

LinkWrapper.displayName = 'LinkWrapper';

export default LinkWrapper;

function ScreenReaderOnlyTextAndNewTabIcon({
  srOnlyText,
  suppressNewTabIcon,
  target,
  ctaIcon,
  variant,
  style,
}: {
  srOnlyText?: string;
  suppressNewTabIcon?: boolean;
  target?: string;
  ctaIcon?: CtaIcons;
  variant?: string;
  style?: string;
}) {
  const shouldShowNewTabIcon = target === SITECORE_TARGET_OPTIONS.NEW_BROWSER;

  if (!shouldShowNewTabIcon && !srOnlyText && !ctaIcon) {
    return <></>;
  }

  const { icon, iconNewTab } = linkWrapperTailwindVariant({
    variant,
    style,
  });

  const Icon = ctaIcon ? (
    <SvgIcon className={icon()} icon={ctaIcon} size="xs" />
  ) : !suppressNewTabIcon && shouldShowNewTabIcon ? (
    <SvgIcon className={`${icon()} ${iconNewTab()}`} icon="new-tab" size="s" />
  ) : null;

  return (
    <>
      {Icon}

      {srOnlyText ? (
        <span className="sr-only">
          {`${srOnlyText ? srOnlyText : ''}${shouldShowNewTabIcon ? ' (Opens in a new tab)' : ''}`}
        </span>
      ) : null}
    </>
  );
}

const EditModeLink = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  (
    {
      ctaIconAlignment,
      ctaVariant,
      ctaVisibility,
      ctaIcon,
      ctaComponentClass,
      className,
      field,
      children,
      srOnlyText: _srOnlyText,
      suppressNewTabIcon: _suppressNewTabIcon,
      ...props
    },
    ref
  ) => {
    let effectiveCtaComponentClass = ctaComponentClass;
    if (effectiveCtaComponentClass === 'default') {
      effectiveCtaComponentClass =
        ctaVariant === 'primary'
          ? 'component-hero-button-color-1'
          : 'component-hero-button-color-2';
    }

    const style = useCtaComponentClass(effectiveCtaComponentClass);
    const { base, icon } = linkWrapperTailwindVariant({
      iconAlignment: ctaIconAlignment,
      variant: ctaVariant,
      visibility: ctaVisibility,
      style: style,
    });
    const editableClonedField = field?.value ? (field as LinkField) : { value: { ...field } };

    if (
      editableClonedField?.value?.linktype === 'internal' &&
      editableClonedField.value.href === ''
    )
      editableClonedField.value.href = '/';

    return (
      <div className={[className, base()].join(' ')}>
        <JSSLink
          {...props}
          field={editableClonedField}
          internalLinkMatcher={INTERNAL_LINK_REGEX}
          ref={ref}
        >
          {children}
        </JSSLink>
        {ctaIcon && <SvgIcon className={icon()} icon={ctaIcon} size="xs" />}
      </div>
    );
  }
);

EditModeLink.displayName = 'EditModeLink';
