import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { CustomSitecorePageProps } from 'lib/page-props';
import { Plugin } from '..';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import { extractPath } from '@sitecore-content-sdk/nextjs/utils';

class CsdkPropsPlugin implements Plugin {
  order = 1;

  async exec(
    props: CustomSitecorePageProps,
    context: GetServerSidePropsContext | GetStaticPropsContext
  ) {
    const path = extractPath(context);
    let page;

    if (context.preview && isDesignLibraryPreviewData(context.previewData)) {
      page = await client.getDesignLibraryData(context.previewData);
    } else {
      page = context.preview
        ? await client.getPreview(context.previewData)
        : await client.getPage(path, { locale: context.locale });
    }
    if (page) {
      props = {
        page,
        dictionary: await client.getDictionary({
          site: page.siteName,
          locale: page.locale,
        }),
        componentProps: await client.getComponentData(page.layout, context, components),
      };
    }

    return props;
  }
}

export const csdkPropsPlugin = new CsdkPropsPlugin();
