// Global
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

// Local
import { CtaProps, ctaTailwindVariant } from 'helpers/SitecoreWrappers/ButtonWrapper/ButtonWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import useIsEditing from 'lib/hooks/useIsEditing';
import { GtmEvent } from 'lib/utils/gtm-utils';
import { useFieldWithFallbacks } from 'lib/hooks/useFieldWithFallbacks';
import { CtaIcons } from 'lib/utils/style-param-utils/modules/ctas';
import { parseLink } from 'lib/utils/link-utils';
import { useCtaComponentClass } from 'lib/hooks/theming/useCtaComponentClass';

const INTERNAL_LINK_REGEX = /^\/|^\#/g;

// Sitecore target options (from Content Editor dropdown)
const SITECORE_TARGET_OPTIONS = {
  ACTIVE_BROWSER: '_self', // Active Browser - same window
  CUSTOM: '|Custom', // Custom - no target attribute
  NEW_BROWSER: '_blank', // New Browser - new window/tab
} as const;

/**
 * Processes the target value from Sitecore
 * Returns undefined for custom targets (no target attribute)
 * Returns the original target for other values
 */
const processTargetValue = (target?: string): string | undefined => {
  // Handle cases where Sitecore appends "|Custom" to the actual target value
  if (target?.includes('|Custom')) {
    const actualTarget = target.replace('|Custom', '');
    // If the actual target is empty or just whitespace, return undefined (no target attribute)
    return actualTarget.trim() || undefined;
  }

  // Handle the case where target is exactly "|Custom"
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

    // If there's no field, don't render anything. This should only be the case
    // if the field itself is undefined, which should only happen if code is deployed
    // before data templates are published, so this is just a safety check
    if (!renderField) {
      return <></>;
    }

    // Clone the object so we don't modify the original.
    // This addresses some edge cases issues when the same link is rendered more than once
    // and we're modifying the link.  While it may not always be needed, it's safer to include
    const clonedField = structuredClone(renderField);

    // Standardize the field because it can either be LinkField or LinkFieldValue
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

    /*
     * RENDERING
     */

    const { base } = linkWrapperTailwindVariant({
      iconAlignment: ctaIconAlignment,
      variant: ctaVariant,
      visibility: ctaVisibility,
      style: style,
    });

    // If editing, always render
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

    /*
     * EVENT HANDLERS
     */

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

    /*
     * Next/Link doesn't handle named anchors. At all. In the event that the user has defined a named anchor
     * (i.e. anchor has a value, href has no value, and linktype is "internal"),
     * then use a standard anchor tag to render the link.
     */
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
  // Don't show new tab icon or screen reader text for custom targets
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
          {/* Preserve a single space character before SR Tab Text */}
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
      // Even though we don't use these fields, they are here so they get removed from the props
      // Otherwise we get a warning about unknown props on the JSSLink component
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

    // The Link component, in its editable configuration, doesn't handle internal links correctly; i.e. it won't render the link text without a value for href.
    // For internal links, we'll forcibly set the href to '/' to work around the issue in a way that doesn't otherwise affect the editing experience.
    if (
      editableClonedField?.value?.linktype === 'internal' &&
      editableClonedField.value.href === ''
    )
      editableClonedField.value.href = '/';

    return (
      // Adding the CSS classes to a wrapping div so we can include the icon
      <div className={[className, base()].join(' ')}>
        <JSSLink
          {...props}
          field={editableClonedField}
          // className={`${title ? 'flex items-center' : ''}`}
          internalLinkMatcher={INTERNAL_LINK_REGEX}
          ref={ref}
        >
          {children}
        </JSSLink>
        {/* When in edit mode we cannot render anything inside the Link tag (cause duplicate link), 
          but we can rendering it outside of the link and move the styling to a parent div */}
        {ctaIcon && <SvgIcon className={icon()} icon={ctaIcon} size="xs" />}
      </div>
    );
  }
);

EditModeLink.displayName = 'EditModeLink';
