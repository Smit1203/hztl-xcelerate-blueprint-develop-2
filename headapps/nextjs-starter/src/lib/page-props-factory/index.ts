import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { debug } from '@sitecore-content-sdk/nextjs';
import { CustomSitecorePageProps } from 'lib/page-props';
import { csdkPropsPlugin } from './plugins/csdk-props';
import { pageLanguagesPlugin } from './plugins/page-languages';
import { siteSettingsPlugin } from './plugins/site-settings';
import { svgCachePlugin } from './plugins/svg-cache';

/**
 * Determines whether context is GetServerSidePropsContext (SSR) or GetStaticPropsContext (SSG)
 * @param {GetServerSidePropsContext | GetStaticPropsContext} context
 */
export const isServerSidePropsContext = function (
  context: GetServerSidePropsContext | GetStaticPropsContext
): context is GetServerSidePropsContext {
  return (<GetServerSidePropsContext>context).req !== undefined;
};

export interface Plugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during page props generation
   */
  exec(
    props: CustomSitecorePageProps,
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<CustomSitecorePageProps>;
}

export class SitecorePagePropsFactory {
  /**
   * Create SitecorePageProps for given context (SSR / GetServerSidePropsContext or SSG / GetStaticPropsContext)
   * @param {GetServerSidePropsContext | GetStaticPropsContext} context
   * @see CustomSitecorePageProps
   */
  public async create(
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<CustomSitecorePageProps> {
    const startTimestamp = Date.now();
    debug.common('page-props-factory start');

    const plugins = [csdkPropsPlugin, pageLanguagesPlugin, siteSettingsPlugin, svgCachePlugin];
    const extendedProps = await plugins
      .sort((p1, p2) => p1.order - p2.order)
      .reduce(
        async (result, plugin) => {
          const props = await result;
          const newProps = await plugin.exec(props, context);
          return newProps;
        },
        Promise.resolve({} as CustomSitecorePageProps)
      );

    debug.common('page-props-factory end in %dms', Date.now() - startTimestamp);

    return extendedProps;
  }
}

export const sitecorePagePropsFactory = new SitecorePagePropsFactory();
