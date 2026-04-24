'use client';

import { useSitecore } from '@sitecore-content-sdk/nextjs';
import type { SiteSettings } from 'lib/site-settings/types';

export const useSitecoreContext = () => {
  const { page } = useSitecore();
  return page?.layout?.sitecore?.context as
    | (Record<string, unknown> & { siteSettings?: SiteSettings })
    | undefined;
};

export const useSiteSettings = (): SiteSettings | undefined => {
  return useSitecoreContext()?.siteSettings;
};

export const usePageMode = () => {
  const { page } = useSitecore();
  return page?.mode;
};

export const useSvgCache = (): Record<string, string> | undefined => {
  return useSitecoreContext()?.svgCache as Record<string, string> | undefined;
};
