import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { XceleratePage } from 'src/baseTypes/Xcelerate.HztlFoundation.model';

export const useSitecoreContext = () => {
  const { page } = useSitecore();
  return page?.layout?.sitecore?.context;
};

export const useSiteSettings = () => {
  const context = useSitecoreContext();
  return context?.siteSettings;
};

export const useCurrentPage = <T extends XceleratePage = XceleratePage>() => {
  const { page } = useSitecore();
  return page?.layout?.sitecore?.route as T;
};

export const useSvgCache = () => {
  const context = useSitecoreContext();
  return context?.svgCache;
};

export const useLanguages = () => {
  const context = useSitecoreContext();
  return context?.languages;
};

export const usePageMode = () => {
  const { page } = useSitecore();
  return page?.mode;
};
