import { Page } from '@sitecore-content-sdk/nextjs';
import { CustomSitecorePageProps } from 'lib/page-props';
import { pageLanguagesPlugin } from './plugins/page-languages';
import { siteSettingsPlugin } from './plugins/site-settings';
import { svgCachePlugin } from './plugins/svg-cache';

export type EnrichPageContextOptions = {
  site: string;
  locale: string;
};

type ContextlessPlugin = {
  order: number;
  exec: (props: CustomSitecorePageProps) => Promise<CustomSitecorePageProps>;
};

export async function enrichPageContextForAppRouter(
  page: Page,
  options: EnrichPageContextOptions
): Promise<Page> {
  const enrichedPage: Page = {
    ...page,
    siteName: page.siteName ?? options.site,
    locale: page.locale ?? options.locale,
  };

  let props: CustomSitecorePageProps = {
    page: enrichedPage,
    notFound: false,
  };

  const plugins: ContextlessPlugin[] = [pageLanguagesPlugin, svgCachePlugin, siteSettingsPlugin];

  for (const plugin of plugins.sort((a, b) => a.order - b.order)) {
    try {
      props = await plugin.exec(props);
    } catch (error) {
      console.warn(`Plugin (order ${plugin.order}) failed:`, error);
    }
  }

  const resultPage = props.page as Page;
  const context = resultPage.layout.sitecore.context as Record<string, unknown>;

  if (context.variantId === undefined || context.variantId === null) {
    context.variantId = '_default';
  }

  return resultPage;
}
