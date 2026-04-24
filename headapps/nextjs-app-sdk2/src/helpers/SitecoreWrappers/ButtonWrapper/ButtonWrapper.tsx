'use client';

// Global
import { sendGTMEvent } from '@next/third-parties/google';
import React, { ButtonHTMLAttributes, forwardRef, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { SvgIcon } from 'helpers/SvgIcon';
import { GtmEvent } from 'lib/utils/gtm-utils';
import { StyleParamRecord } from 'lib/utils/style-param-utils';
import {
  CtaElements,
  CtaIconAlignments,
  CtaIcons,
  CtaStyleProperties,
  CtaVariants,
  CtaVisibility,
} from 'lib/utils/style-param-utils/modules/ctas';

import { useCtaComponentClass, CtaComponentClass } from 'lib/hooks/theming/useCtaComponentClass';

type CtaPropsBase = {
  ctaStyle?: StyleParamRecord<CtaElements, CtaStyleProperties>;
  ctaIcon?: CtaIcons;
  ctaIconAlignment?: CtaIconAlignments;
  ctaVisibility?: CtaVisibility;
};

// ctaComponentClass is optional for custom buttons
type CtaPropsCustom = CtaPropsBase & {
  ctaVariant: 'custom';
  /** This is required.  We can set to default explicitly if not present in design. */
  ctaComponentClass?: undefined;
};

// ctaComponentClass is required for normal buttons
type CtaPropsNormal = CtaPropsBase & {
  ctaVariant?: CtaVariants | 'custom';
  /** This is required.  We can set to default explicitly if not present in design. */
  ctaComponentClass: CtaComponentClass | 'default';
};

export type CtaProps = CtaPropsCustom | CtaPropsNormal;

export type ButtonWrapperProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CtaProps &
  React.PropsWithChildren & {
    className?: string;
    gtmEvent?: GtmEvent;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text?: string;
  };

const ButtonWrapper = forwardRef<HTMLButtonElement, ButtonWrapperProps>(
  (
    {
      className,
      ctaComponentClass,
      gtmEvent,
      onClick,
      text,
      children,
      ...props
    }: ButtonWrapperProps,
    ref
  ): JSX.Element | null => {
    const ctaIcon = props.ctaIcon ?? props.ctaStyle?.ctaIcon;
    const ctaVariant = props.ctaVariant ?? props.ctaStyle?.ctaVariant ?? 'primary';
    const ctaIconAlignment = props.ctaIconAlignment ?? props.ctaStyle?.ctaIconAlignment ?? 'right';

    if (ctaComponentClass === 'default') {
      ctaComponentClass =
        ctaVariant === 'primary'
          ? 'component-hero-button-color-1'
          : 'component-hero-button-color-2';
    }

    const style = useCtaComponentClass(ctaComponentClass);

    const { base, icon } = ctaTailwindVariant({
      className: className,
      iconAlignment: ctaIconAlignment,
      variant: ctaVariant,
      style: style,
    });

    /*
     * EVENT HANDLERS
     */

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (gtmEvent) {
        sendGTMEvent({ ...gtmEvent });
      }

      if (onClick) {
        onClick(e);
      }
    };

    /*
     * RENDERING
     */

    // If no content is present, don't print
    if (!text && !children) return <></>;

    return (
      <button className={base()} onClick={handleOnClick} ref={ref} disabled={props.disabled}>
        {text}
        {children}
        {ctaIcon && <SvgIcon className={icon()} icon={ctaIcon} size="xs" />}
      </button>
    );
  }
);

ButtonWrapper.displayName = 'ButtonWrapper';

export default ButtonWrapper;

export const ctaTailwindVariant = tv({
  slots: {
    base: ['group'],
    icon: [],
  },
  variants: {
    iconAlignment: {
      left: {
        base: ['flex-row-reverse'],
      },
      right: {
        base: ['flex-row'],
      },
    },
    variant: {
      custom: {
        base: [],
      },
      link: {
        // TODO: Need to revisit this since it will break footer if updated.
        base: [
          'border-0',
          'h-fit',
          'w-fit',
          'font-semibold',
          'focus:outline-color-border-border-focus',
          'focus:underline',
          'font-typography-body-font-family',
        ],
      },
      primary: {
        base: [
          'flex',
          'items-center',
          'justify-center',
          'gap-x-spacing-spacing-8',
          'w-full',
          'md:w-auto',
          'min-w-[7.5rem]',
          'min-h-14',
          'px-spacing-spacing-24',
          'py-spacing-spacing-16',
          'text-center',
          'text-typography-body-large-font-size',
          'font-semibold',
          'leading-none',
          'border-general-border-width-button',
          'rounded-general-border-radius-button',
          'disabled:no-underline',
          'focus:outline-none',
          'focus:ring-4',
          'focus:ring-offset-1',
          'focus:ring-color-border-border-focus',
          'hover:no-underline',
          'hover:component-button-primary-filled-bg-hover',
          'hover:border-component-button-primary-filled-border-hover',
          'transition-colors',
          'duration-300',
          'font-typography-body-font-family',
        ],
      },
      secondary: {
        base: [
          'flex',
          'items-center',
          'justify-center',
          'gap-x-spacing-spacing-8',
          'w-full',
          'md:w-auto',
          'min-w-[7.5rem]',
          'min-h-14',
          'px-spacing-spacing-24',
          'py-spacing-spacing-16',
          'text-center',
          'text-typography-body-large-font-size',
          'font-semibold',
          'leading-none',
          'border-general-border-width-button',
          'rounded-general-border-radius-button',
          'disabled:no-underline',
          'disabled:bg-component-button-primary-filled-bg-disabled',
          'disabled:border-component-button-primary-filled-border-disabled',
          'disabled:text-component-button-primary-filled-text-disabled',
          'focus:outline-none',
          'focus:ring-4',
          'focus:ring-offset-1',
          'focus:ring-color-border-border-focus',
          'hover:no-underline',
          'hover:component-button-primary-filled-bg-hover',
          'transition-colors',
          'duration-300',
          'font-typography-body-font-family',
        ],
      },
      tertiary: {
        base: [
          'focus:outline-none',
          'focus:ring-4',
          'focus:ring-offset-1',
          'focus:ring-color-border-border-focus',
          'gap-x-spacing-spacing-8',
          'font-semibold',
          'rounded-general-border-radius-button',
          'border-general-border-width-button',
          'px-spacing-spacing-24',
          'py-spacing-spacing-16',
          'font-typography-body-font-family',
        ],
      },
    },
    visibility: {
      visible: {
        base: [],
      },
      hidden: {
        base: ['hidden'],
      },
    },
    style: {
      primary: {
        base: [],
      },
      white: {
        base: [],
      },
      tonal: {
        base: [],
      },
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      style: ['primary'],
      class: {
        base: [
          'bg-component-button-primary-filled-bg',
          'border-component-button-primary-filled-border',
          'text-component-button-primary-filled-text',
          'hover:bg-component-button-primary-filled-bg-hover',
          'hover:border-component-button-primary-filled-border-hover',
          'hover:text-component-button-primary-filled-text-hover',
          'focus:bg-component-button-primary-filled-bg-focused',
          'focus:border-component-button-primary-filled-border-focused',
          'focus:text-component-button-primary-filled-text-focused',
          'disabled:bg-component-button-primary-filled-bg-disabled',
          'disabled:border-component-button-primary-filled-border-disabled',
          'disabled:text-component-button-primary-filled-text-disabled',
        ],
        icon: [
          'text-component-button-primary-filled-icon',
          'group-hover:text-component-button-primary-filled-icon-hover',
          'focus:text-component-button-primary-filled-icon-focused',
          'disabled:text-component-button-primary-filled-icon-disabled',
        ],
      },
    },
    {
      variant: 'primary',
      style: ['white'],
      class: {
        base: [
          'bg-component-button-white-filled-bg',
          'border-component-button-white-filled-border',
          'text-component-button-white-filled-text',
          'hover:bg-component-button-white-filled-bg-hover',
          'hover:border-component-button-white-filled-border-hover',
          'hover:text-component-button-white-filled-text-hover',
          'focus:bg-component-button-white-filled-bg-focused',
          'focus:border-component-button-white-filled-border-focused',
          'focus:text-component-button-white-filled-text-focused',
          'disabled:bg-component-button-white-filled-bg-disabled',
          'disabled:border-component-button-white-filled-border-disabled',
          'disabled:text-component-button-white-filled-text-disabled',
        ],
        icon: [
          'text-component-button-white-filled-icon',
          'group-hover:text-component-button-white-filled-icon-hover',
          'focus:text-component-button-white-filled-icon-focused',
          'disabled:text-component-button-white-filled-icon-disabled',
        ],
      },
    },
    {
      variant: 'primary',
      style: ['tonal'],
      class: {
        base: [
          'bg-component-button-tonal-filled-bg',
          'border-component-button-tonal-filled-border',
          'text-component-button-tonal-filled-text',
          'hover:bg-component-button-tonal-filled-bg-hover',
          'hover:border-component-button-tonal-filled-border-hover',
          'hover:text-component-button-tonal-filled-text-hover',
          'focus:bg-component-button-tonal-filled-bg-focused',
          'focus:border-component-button-tonal-filled-border-focused',
          'focus:text-component-button-tonal-filled-text-focused',
          'disabled:bg-component-button-tonal-filled-bg-disabled',
          'disabled:border-component-button-tonal-filled-border-disabled',
          'disabled:text-component-button-tonal-filled-text-disabled',
        ],
        icon: [
          'text-component-button-tonal-filled-icon',
          'group-hover:text-component-button-tonal-filled-icon-hover',
          'focus:text-component-button-tonal-filled-icon-focused',
          'disabled:text-component-button-tonal-filled-icon-disabled',
        ],
      },
    },

    {
      variant: 'secondary',
      style: ['primary'],
      class: {
        base: [
          'bg-component-button-primary-outline-bg',
          'border-component-button-primary-outline-border',
          'text-component-button-primary-outline-text',
          'hover:bg-component-button-primary-outline-bg-hover',
          'hover:border-component-button-primary-outline-border-hover',
          'hover:text-component-button-primary-outline-text-hover',
          'focus:bg-component-button-primary-outline-bg-focused',
          'focus:border-component-button-primary-outline-border-focused',
          'focus:text-component-button-primary-outline-text-focused',
          'disabled:bg-component-button-primary-outline-bg-disabled',
          'disabled:border-component-button-primary-outline-border-disabled',
          'disabled:text-component-button-primary-outline-text-disabled',
        ],
        icon: [
          'text-component-button-primary-outline-icon',
          'group-hover:text-component-button-primary-outline-icon-hover',
          'focus:text-component-button-primary-outline-icon-focused',
          'disabled:text-component-button-primary-outline-icon-disabled',
        ],
      },
    },
    {
      variant: 'secondary',
      style: ['white'],
      class: {
        base: [
          'bg-component-button-white-outline-bg',
          'border-component-button-white-outline-border',
          'text-component-button-white-outline-text',
          'hover:bg-component-button-white-outline-bg-hover',
          'hover:border-component-button-white-outline-border-hover',
          'hover:text-component-button-white-outline-text-hover',
          'focus:bg-component-button-white-outline-bg-focused',
          'focus:border-component-button-white-outline-border-focused',
          'focus:text-component-button-white-outline-text-focused',
          'disabled:bg-component-button-white-outline-bg-disabled',
          'disabled:border-component-button-white-outline-border-disabled',
          'disabled:text-component-button-white-outline-text-disabled',
        ],
        icon: [
          'text-component-button-white-outline-icon',
          'group-hover:text-component-button-white-outline-icon-hover',
          'focus:text-component-button-white-outline-icon-focused',
          'disabled:text-component-button-white-outline-icon-disabled',
        ],
      },
    },
    {
      variant: 'secondary',
      style: ['tonal'],
      class: {
        base: [
          'bg-component-button-tonal-outline-bg',
          'border-component-button-tonal-outline-border',
          'text-component-button-tonal-outline-text',
          'hover:bg-component-button-tonal-outline-bg-hover',
          'hover:border-component-button-tonal-outline-border-hover',
          'hover:text-component-button-tonal-outline-text-hover',
          'focus:bg-component-button-tonal-outline-bg-focused',
          'focus:border-component-button-tonal-outline-border-focused',
          'focus:text-component-button-tonal-outline-text-focused',
          'disabled:bg-component-button-tonal-outline-bg-disabled',
          'disabled:border-component-button-tonal-outline-border-disabled',
          'disabled:text-component-button-tonal-outline-text-disabled',
        ],
        icon: [
          'text-component-button-tonal-outline-icon',
          'group-hover:text-component-button-tonal-outline-icon-hover',
          'focus:text-component-button-tonal-outline-icon-focused',
          'disabled:text-component-button-tonal-outline-icon-disabled',
        ],
      },
    },

    {
      variant: 'tertiary',
      style: ['primary'],
      class: {
        base: [
          'bg-component-button-primary-ghost-bg',
          'border-component-button-primary-ghost-border',
          'text-component-button-primary-ghost-text',
          'hover:bg-component-button-primary-ghost-bg-hover',
          'hover:border-component-button-primary-ghost-border-hover',
          'hover:text-component-button-primary-ghost-text-hover',
          'focus:bg-component-button-primary-ghost-bg-focused',
          'focus:border-component-button-primary-ghost-border-focused',
          'focus:text-component-button-primary-ghost-text-focused',
          'disabled:bg-component-button-primary-ghost-bg-disabled',
          'disabled:border-component-button-primary-ghost-border-disabled',
          'disabled:text-component-button-primary-ghost-text-disabled',
        ],
        icon: [
          'text-component-button-primary-ghost-icon',
          'group-hover:text-component-button-primary-ghost-icon-hover',
          'focus:text-component-button-primary-ghost-icon-focused',
          'disabled:text-component-button-primary-ghost-icon-disabled',
        ],
      },
    },
    {
      variant: 'tertiary',
      style: ['white'],
      class: {
        base: [
          'bg-component-button-white-ghost-bg',
          'border-component-button-white-ghost-border',
          'text-component-button-white-ghost-text',
          'hover:bg-component-button-white-ghost-bg-hover',
          'hover:border-component-button-white-ghost-border-hover',
          'hover:text-component-button-white-ghost-text-hover',
          'focus:bg-component-button-white-ghost-bg-focused',
          'focus:border-component-button-white-ghost-border-focused',
          'focus:text-component-button-white-ghost-text-focused',
          'disabled:bg-component-button-white-ghost-bg-disabled',
          'disabled:border-component-button-white-ghost-border-disabled',
          'disabled:text-component-button-white-ghost-text-disabled',
        ],
        icon: [
          'text-component-button-white-ghost-icon',
          'group-hover:text-component-button-white-ghost-icon-hover',
          'focus:text-component-button-white-ghost-icon-focused',
          'disabled:text-component-button-white-ghost-icon-disabled',
        ],
      },
    },
    {
      variant: 'tertiary',
      style: ['tonal'],
      class: {
        base: [
          'bg-component-button-tonal-ghost-bg',
          'border-component-button-tonal-ghost-border',
          'text-component-button-tonal-ghost-text',
          'hover:bg-component-button-tonal-ghost-bg-hover',
          'hover:border-component-button-tonal-ghost-border-hover',
          'hover:text-component-button-tonal-ghost-text-hover',
          'focus:bg-component-button-tonal-ghost-bg-focused',
          'focus:border-component-button-tonal-ghost-border-focused',
          'focus:text-component-button-tonal-ghost-text-focused',
          'disabled:bg-component-button-tonal-ghost-bg-disabled',
          'disabled:border-component-button-tonal-ghost-border-disabled',
          'disabled:text-component-button-tonal-ghost-text-disabled',
        ],
        icon: [
          'text-component-button-tonal-ghost-icon',
          'group-hover:text-component-button-tonal-ghost-icon-hover',
          'focus:text-component-button-tonal-ghost-icon-focused',
          'disabled:text-component-button-tonal-ghost-icon-disabled',
        ],
      },
    },

    {
      variant: 'link',
      style: ['primary'],
      class: {
        base: [
          'bg-component-button-primary-link-bg',
          'border-component-button-primary-link-border',
          'text-component-button-primary-link-text',
          'hover:bg-component-button-primary-link-bg-hover',
          'hover:border-component-button-primary-link-border-hover',
          'hover:text-component-button-primary-link-text-hover',
          'focus:bg-component-button-primary-link-bg-focused',
          'focus:border-component-button-primary-link-border-focused',
          'focus:text-component-button-primary-link-text-focused',
          'disabled:bg-component-button-primary-link-bg-disabled',
          'disabled:border-component-button-primary-link-border-disabled',
          'disabled:text-component-button-primary-link-text-disabled',
        ],
        icon: [
          'text-component-button-primary-link-icon',
          'group-hover:text-component-button-primary-link-icon-hover',
          'focus:text-component-button-primary-link-icon-focused',
          'disabled:text-component-button-primary-link-icon-disabled',
        ],
      },
    },
    {
      variant: 'link',
      style: ['white'],
      class: {
        base: [
          'bg-component-button-white-link-bg',
          'border-component-button-white-link-border',
          'text-component-button-white-link-text',
          'hover:bg-component-button-white-link-bg-hover',
          'hover:border-component-button-white-link-border-hover',
          'hover:text-component-button-white-link-text-hover',
          'focus:bg-component-button-white-link-bg-focused',
          'focus:border-component-button-white-link-border-focused',
          'focus:text-component-button-white-link-text-focused',
          'disabled:bg-component-button-white-link-bg-disabled',
          'disabled:border-component-button-white-link-border-disabled',
          'disabled:text-component-button-white-link-text-disabled',
        ],
        icon: [
          'text-component-button-white-link-icon',
          'group-hover:text-component-button-white-link-icon-hover',
          'focus:text-component-button-white-link-icon-focused',
          'disabled:text-component-button-white-link-icon-disabled',
        ],
      },
    },
    {
      variant: 'link',
      style: ['tonal'],
      class: {
        base: [
          'bg-component-button-tonal-link-bg',
          'border-component-button-tonal-link-border',
          'text-component-button-tonal-link-text',
          'hover:bg-component-button-tonal-link-bg-hover',
          'hover:border-component-button-tonal-link-border-hover',
          'hover:text-component-button-tonal-link-text-hover',
          'focus:bg-component-button-tonal-link-bg-focused',
          'focus:border-component-button-tonal-link-border-focused',
          'focus:text-component-button-tonal-link-text-focused',
          'disabled:bg-component-button-tonal-link-bg-disabled',
          'disabled:border-component-button-tonal-link-border-disabled',
          'disabled:text-component-button-tonal-link-text-disabled',
        ],
        icon: [
          'text-component-button-tonal-link-icon',
          'group-hover:text-component-button-tonal-link-icon-hover',
          'focus:text-component-button-tonal-link-icon-focused',
          'disabled:text-component-button-tonal-link-icon-disabled',
        ],
      },
    },
  ],
});
