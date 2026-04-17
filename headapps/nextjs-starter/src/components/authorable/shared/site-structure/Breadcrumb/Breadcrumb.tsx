// Global
import { Text, GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import BreadcrumbQuery, {
  BreadcrumbQueryResult,
} from 'components/authorable/shared/site-structure/Breadcrumb/Breadcrumb.graphql';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import { getTestProps } from 'lib/testing/utils';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { ComponentProps } from 'lib/component-props';

const DISABLED_LINK_FLAG = 'breadcrumb';

export type BreadcrumbDataType = ComponentProps & {
  staticProps: BreadcrumbQueryResult;
};

export const Default = (staticProps: BreadcrumbDataType): JSX.Element => {
  const { ancestors, Title } = staticProps?.staticProps?.currentPage || {};
  const { componentName, dataSource } = staticProps?.rendering || {};
  const filteredAncestors = ancestors
    ?.slice()
    .reverse()
    .filter(
      // Filter out any ancestors have have either no page url or title.
      (ancestor) => ancestor?.url?.path.length && ancestor?.Title?.jsonValue?.value.length
    )
    .filter(
      // Filter out any ancestors that are flagged as disabled for the breadcrumb.
      (ancestor) =>
        !ancestor?.navigationFilter?.targetItems.length ||
        ancestor?.navigationFilter?.targetItems.find(
          (name) => name?.key?.jsonValue?.value !== DISABLED_LINK_FLAG
        )
    );

  if (filteredAncestors.length == 0 && ancestors.length == 0) return <></>;
  /*
   * Rendering
   */

  const { base, icon, linkWrapper, list, listItem, lastLevelText } = TAILWIND_VARIANTS();

  return (
    <nav
      aria-label="Breadcrumb"
      className={base()}
      data-component="authorable/shared/site-structure/breadcrumb"
      {...getTestProps(`component-breadcrumb`)}
    >
      <ul className={list()}>
        {filteredAncestors.map((ancestor, index) => {
          const { url, Title } = ancestor || {};

          return (
            <li className={listItem()} key={url?.path} {...getTestProps(`parent-page-${index}`)}>
              <LinkWrapper
                ctaVariant="custom"
                className={linkWrapper()}
                field={{
                  value: {
                    href: url?.path,
                    text: Title?.jsonValue?.value,
                    title: Title?.jsonValue?.value,
                  },
                }}
                gtmEvent={{
                  event: 'link',
                  type: 'breadcrumb',
                  'gtm.element.dataset.gtmDatasourceId': dataSource,
                  'gtm.element.dataset.gtmComponentName': componentName,
                }}
                {...getTestProps(`link-${index}`)}
              />
              <SvgIcon
                className={icon()}
                fill="none"
                icon="chevron-right"
                size="xs"
                viewBox="0 0 16 16"
              />
            </li>
          );
        })}
        {ancestors?.length > 0 && (
          <li aria-current="true" {...getTestProps(`current-page`)}>
            <Text
              className={lastLevelText()}
              encode={false}
              field={{
                value: Title?.jsonValue?.value,
              }}
              tag="span"
              {...getTestProps(`current-page-text`)}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export const getComponentServerProps: GetComponentServerProps = async (rendering, layoutData) => {
  const graphQLClient = graphqlClientFactory({});

  const result = await graphQLClient.request<BreadcrumbQueryResult>(BreadcrumbQuery, {
    datasource: rendering.dataSource,
    itemID: layoutData?.sitecore?.route?.itemId,
    language: layoutData?.sitecore?.context?.language,
    params: rendering.params,
  });

  return {
    staticProps: result,
  };
};

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['component', 'text-typography-body-small-font-size', 'py-padding-less'],
    list: ['flex', 'flex-wrap', 'gap-spacing-spacing-1', 'items-center', 'list'],
    listItem: ['flex', 'items-center', 'list-none', 'gap-spacing-spacing-1'],
    linkWrapper: ['text-color-text-text-secondary', 'hover:text-color-text-text'],
    lastLevelText: ['text-color-text-text'],
    icon: ['h-auto', 'w-auto'],
  },
});
