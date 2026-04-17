import { LayoutServiceData, LayoutServicePageState } from '@sitecore-content-sdk/nextjs';
import { SiteSettings } from 'lib/page-props-factory/plugins/site-settings';
import { ComponentPropsContext, SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import componentMapWithAliases from '../../../.storybook/component-map-with-aliases';

export const MockProviders = ({
  children,
  layoutData,
  siteSettings,
}: {
  children: React.ReactNode;
  layoutData?: LayoutServiceData;
  siteSettings?: SiteSettings;
}) => {
  const mockLayoutData = layoutData ?? {
    sitecore: {
      route: null,
      context: {
        pageEditing: false,
        siteSettings: siteSettings ?? { socialShareLinks: [] },
        languages: [],
      },
    },
  };
  return (
    <ComponentPropsContext value={{}}>
      <SitecoreProvider
        componentMap={componentMapWithAliases}
        api={scConfig.api}
        page={{
          layout: mockLayoutData,
          locale: 'en',
          mode: {
            name: LayoutServicePageState.Normal,
            designLibrary: { isVariantGeneration: false },
            isNormal: true,
            isPreview: false,
            isEditing: false,
            isDesignLibrary: false,
          },
        }}
      >
        {children}
      </SitecoreProvider>
    </ComponentPropsContext>
  );
};
