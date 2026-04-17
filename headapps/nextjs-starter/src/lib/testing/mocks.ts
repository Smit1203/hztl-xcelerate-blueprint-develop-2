// Global
import {
  LayoutServiceData,
  LayoutServicePageState,
  RouteData,
  LayoutServiceContext,
} from '@sitecore-content-sdk/nextjs';

export const mockSitecoreContext: LayoutServiceContext = {
  pageEditing: false,
  site: {
    name: 'HztlFoundation',
  },
  pageState: LayoutServicePageState.Normal,
  language: 'en',
  languages: [
    { isoCode: 'en', nativeName: 'English', countryCode: 'US' },
    { isoCode: 'es-MX', nativeName: 'Spanish (Mexico)', countryCode: 'MX' },
  ],
  itemPath: '/',
  route: {
    name: '',
    placeholders: {},
    fields: {},
  },
  siteSettings: {
    socialShareLinks: [],
  },
  svgCache: {},
};

export const DecorateRouteFieldData = (routeData?: RouteData): LayoutServiceData => {
  return {
    sitecore: {
      context: mockSitecoreContext,
      route: {
        ...(routeData ?? { name: '', placeholders: {}, fields: {} }),
      },
    },
  };
};
