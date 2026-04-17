import { GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import React, { JSX } from 'react';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { ComponentProps } from 'lib/component-props';
import ArticleCategoryTabsQuery, {
  ArticleCategoryTabsQueryResult,
} from 'components/authorable/shared/page-specific/ArticleCategoryTabs.graphql';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { tv } from 'tailwind-variants';
import { withStandardComponentWrapper } from 'helpers/HOC';
import { ScrollButton } from '../lists/Tab';
import { useScrollableTabs } from 'lib/hooks/useScrollableTabs';
import { getTestProps } from 'lib/testing/utils';

export type ArticleCategoryTabsDataType = ComponentProps & {
  staticProps: ArticleCategoryTabsQueryResult;
};

const ArticleCategoryTabs = (props: ArticleCategoryTabsDataType): JSX.Element => {
  const current = props.staticProps?.currentPage;
  const isLanding = current?.template?.name === 'Article Landing Page';
  const landingNode = isLanding ? current : current.parent;
  const tabItems = landingNode?.children?.results || [];
  const { RenderingIdentifier } = props?.params || {};
  const { containerRef, isScrollable, isLeftArrowVisible, isRightArrowVisible, handleScroll } =
    useScrollableTabs<HTMLUListElement>();
  const currentPath = current?.url?.path;
  const isLandingActive = currentPath === landingNode?.url?.path;

  const { base, tabsContainerWrapper, tabsWrapper, tabLinkWrapper, tabLink } = TAILWIND_VARIANTS();

  return (
    <section
      className={base()}
      data-component="authorable/shared/page-specific/articlecategorytabs"
      id={RenderingIdentifier}
      {...getTestProps(`component-article-category-tabs-${props?.rendering?.uid}`)}
    >
      <div className={tabsContainerWrapper()}>
        {isScrollable && isLeftArrowVisible && (
          <ScrollButton direction="left" onClick={() => handleScroll('left')} />
        )}
        <ul
          className={tabsWrapper()}
          ref={containerRef}
          role="tablist"
          id="articletab-list"
          aria-label="Article Tab navigation"
        >
          <li
            className={tabLinkWrapper({ isActive: isLandingActive })}
            role="tab"
            aria-controls={`articletab-content-${landingNode?.id}`}
            aria-selected={isLandingActive}
          >
            <LinkWrapper
              ctaComponentClass="default"
              className={tabLink({ isActive: isLandingActive })}
              field={{ href: landingNode?.url?.path }}
              {...getTestProps(`category-link-0`)}
            >
              <PlainTextWrapper
                field={{ value: landingNode?.categoryName?.value }}
                {...getTestProps(`category-name-0`)}
              />
            </LinkWrapper>
          </li>
          {tabItems.map((item, index) => {
            const isActive = currentPath === item.url?.path;
            return (
              <li
                key={item.id}
                className={tabLinkWrapper({ isActive })}
                role="tab"
                aria-controls={`articletab-content-${item.id}`}
                aria-selected={isActive}
              >
                <LinkWrapper
                  ctaComponentClass="default"
                  className={tabLink({ isActive })}
                  ctaVariant="custom"
                  field={{ href: item.url?.path }}
                  {...getTestProps(`category-link-${index + 1}`)}
                >
                  <PlainTextWrapper
                    field={{ value: item.categoryName.value }}
                    {...getTestProps(`category-name-${index + 1}`)}
                  />
                </LinkWrapper>
              </li>
            );
          })}
        </ul>
        {isScrollable && isRightArrowVisible && (
          <ScrollButton
            direction="right"
            onClick={() => handleScroll('right')}
            {...getTestProps(`scroll-button`)}
          />
        )}
      </div>
    </section>
  );
};

export const getComponentServerProps: GetComponentServerProps = async (_rendering, layoutData) => {
  const graphQLClient = graphqlClientFactory({});

  const result = await graphQLClient.request<ArticleCategoryTabsQueryResult>(
    ArticleCategoryTabsQuery,
    {
      contextItem: layoutData?.sitecore?.route?.itemId,
      language: layoutData?.sitecore?.context?.language,
    }
  );

  return {
    staticProps: result,
  };
};

export const Default = withStandardComponentWrapper(ArticleCategoryTabs, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [],
    tabsContainerWrapper: [
      'container',
      'flex',
      'items-center',
      'gap-space-between-micro',
      'relative',
      'pt-margin-less',
      'pb-0',
    ],
    tabArrows: ['absolute', 'py-4', 'px-0', 'w-[44px]', 'h-[68px]'],
    tabsWrapper: [
      'container',
      'overflow-x-auto',
      'bg-component-tab-color-bg',
      'flex',
      'px-component-tab-layout-container-padding-x',
      'py-component-tab-layout-container-padding-y',
    ],
    tabLinkWrapper: [
      'gap-spacing-spacing-8',
      'border-l-component-tab-border-width-left',
      'border-r-component-tab-border-width-right',
      'border-t-component-tab-border-width-top',
      'border-b-component-tab-border-width-bottom',
      'border-component-tab-color-border',
      'hover:border-component-tab-color-border-hover',
      'rounded-component-tab-border-radius',
      'focus:ring-color-border-border-focus',
      'focus:border-component-tab-color-border-focused',
    ],
    tabLink: [
      'flex',
      'items-center',
      'justify-center',
      'px-spacing-spacing-24',
      'py-spacing-spacing-16',
      'min-w-component-tab-layout-min-width',
      'text-typography-body-medium-font-size',
      'font-typography-body-font-family',
      'leading-5',
      'font-semibold',
      'text-component-tab-color-text',
      'bg-component-tab-color-bg',
      'hover:text-component-tab-color-text-hover',
      'hover:bg-component-tab-color-bg-hover',
      'focus:bg-component-tab-color-bg-focused',
      'focus:text-component-tab-color-text-focused',
      'whitespace-nowrap',
      'rounded-component-tab-border-radius',
    ],
  },
  variants: {
    isActive: {
      true: {
        tabLinkWrapper: [
          'border-component-tab-color-border-active',
          'bg-component-tab-color-bg-active',
        ],
        tabLink: ['text-component-tab-color-text-active', 'bg-component-tab-color-bg-active'],
      },
    },
    disabled: {
      true: {
        tabArrows: ['opacity-50', 'cursor-not-allowed', 'hover:bg-transparent'],
      },
    },
    right: {
      true: {
        tabArrows: [
          'right-[-1px]',
          'bg-gradient-to-l',
          'from-color-bg-bg to-color-white-alpha-0 from-[9.61%] to-100%',
        ],
      },
      false: {
        tabArrows: [
          'left-[-1px]',
          'bg-gradient-to-r',
          'from-color-bg-bg to-color-white-alpha-0 from-[9.61%] to-100%',
        ],
      },
    },
  },
});
