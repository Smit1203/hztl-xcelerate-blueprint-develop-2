// Global
import dynamic from 'next/dynamic';
import React, { JSX, useMemo } from 'react';
import { tv } from 'tailwind-variants';

/**
 * Standardize SVG icons on a 48x48 grid to allow
 * for consistent use across the project
 *
 * Icon contents should be stored in the icons subdirectory
 * using the naming scheme 'icon--[name].tsx'
 */

export type IconTypes =
  | undefined
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'close'
  | 'menu-close'
  | 'download'
  | 'file-download'
  | 'facebook'
  | 'hamburger-menu'
  | 'instagram'
  | 'magnifier'
  | 'new-tab'
  | 'new-window'
  | 'no-image'
  | 'outline-search'
  | 'pause'
  | 'pinterest'
  | 'play'
  | 'play-control'
  | 'plus'
  | 'refine'
  | 'sorting'
  | 'tiktok'
  | 'youtube'
  | 'share'
  | 'share-close'
  | 'chevron-right'
  | 'checkmark'
  | 'arrow-dash-right'
  | 'chevron-right'
  | 'alert-neutral'
  | 'alert-priority'
  | 'accordion-plus'
  | 'accordion-minus'
  | 'arrow-dash-left'
  | 'video-play'
  | 'loading'
  | 'arrow-down'
  | 'filter-lines'
  | 'carousel-arrow-left'
  | 'carousel-arrow-right'
  | 'carousel-pause'
  | 'carousel-play'
  | 'carousel-pagedot'
  | 'carousel-active-pagedot'
  | 'tag-close';

export type SvgIconSize = 'xxs' | 'xs' | 's' | 'sm' | 'm' | 'md' | 'em' | 'lg';

export type SVGFill = 'currentColor' | 'none';

export interface SvgIconProps {
  className?: string;
  fill?: SVGFill; // The "fill" attribute must be applied to individual <path /> tags in order to be effective. Applying it to <svg /> does nothing.
  icon: IconTypes;
  size?: SvgIconSize;
  viewBox?: string; // This could pretty easily be hard coded as the "size" attribute is doing the hard work here.
  title?: string;
}

const SvgIcon = ({
  className,
  fill = 'currentColor',
  icon,
  size = 'sm',
  viewBox = '0 0 24 24',
  title,
}: SvgIconProps): JSX.Element => {
  const IconContent = useMemo(
    () => (icon ? dynamic(() => import(`./icons/icon--${icon}`)) : null),
    [icon]
  );

  if (!icon || !IconContent) return <></>;

  return (
    <svg
      className={TAILWIND_VARIANTS({ className, size })}
      fill={fill}
      viewBox={viewBox}
      data-icon={icon}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <IconContent />
    </svg>
  );
};

export default React.memo(SvgIcon);

const TAILWIND_VARIANTS = tv({
  base: [],
  variants: {
    size: {
      xxs: ['!h-3', '!w-3'], //added solely for fixing the search and results UI
      xs: ['!h-4', '!w-4'],
      s: ['!h-6', '!w-6'],
      sm: ['!h-8', '!w-8'], // 32px
      m: ['!h-12', '!w-12'], // 48px
      md: ['!h-16', '!w-16'], // 64px
      lg: ['!h-24', '!w-24'],
      em: ['!h-em', '!w-em'],
    },
  },
});
