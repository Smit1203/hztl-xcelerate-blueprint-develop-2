import { ItemLanguage } from 'src/lib/page-props-factory/plugins/page-languages';
import { SiteSettings } from 'src/lib/page-props-factory/plugins/site-settings';
declare module '@sitecore-content-sdk/nextjs' {
  interface LayoutServiceContext {
    siteSettings: SiteSettings;
    languages: ItemLanguage[] | null;
    svgCache?: Record<string, string>;
  }
}
