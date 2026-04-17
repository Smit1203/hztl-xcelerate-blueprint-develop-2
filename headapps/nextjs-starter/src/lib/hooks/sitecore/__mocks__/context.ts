import { type LayoutServiceContext } from '@sitecore-content-sdk/nextjs';
import { XceleratePage } from 'src/baseTypes/Xcelerate.HztlFoundation.model';

export const useSitecoreContext = (): LayoutServiceContext => {
  return {
    siteSettings: {
      socialShareLinks: [],
    },
    languages: [],
    svgCache: {},
  };
};

export const useSiteSettings = () => {
  const context = useSitecoreContext();
  return context?.siteSettings;
};

export const useCurrentPage = <T extends XceleratePage = XceleratePage>() => {
  const context = useSitecoreContext();
  return context?.route as T;
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
  return {
    isNormal: true,
    isEditing: false,
    isPreview: false,
    isDesignLibrary: false,
    isVariantGeneration: false,
  };
};
