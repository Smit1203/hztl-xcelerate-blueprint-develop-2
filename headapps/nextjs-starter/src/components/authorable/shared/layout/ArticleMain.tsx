'use client';

// Global
import React, { JSX } from 'react';
// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { tv } from 'tailwind-variants';
import { findComponent } from 'lib/utils/object-utils';
import { getTestProps } from 'lib/testing/utils';
import { useCurrentPage } from 'lib/hooks/sitecore/context';

export type ArticleMainProps = ComponentProps;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['w-full'],
    articleMainContent: ['flex', ' flex-col'],
  },
  variants: {
    isArticleContent: {
      true: {
        articleMainContent: ['pt-0', 'gap-margin-macro'],
      },
      false: {
        articleMainContent: ['py-general-spacing-margin-y', 'gap-padding-loose'],
      },
    },
  },
});

const ArticleMain = (props: ArticleMainProps): JSX.Element => {
  const { rendering } = props;
  const { RenderingIdentifier } = props?.params || {};
  const currentPage = useCurrentPage();
  const itemId = currentPage?.id?.toUpperCase()?.replace(/-/g, '');
  const { base, articleMainContent } = TAILWIND_VARIANTS();

  const isArticleContent = findComponent(props.rendering, 'ArticleContent');
  const role = isArticleContent ? 'none' : 'tabpanel';
  return (
    <div
      data-component="authorable/shared/layout/article-main"
      id={RenderingIdentifier}
      className={base()}
      {...getTestProps(`component-article-main-${props?.rendering?.uid}`)}
    >
      <PlaceholderWrapper name="custom-article-top-content-header" rendering={rendering} />
      <div
        className={articleMainContent({ isArticleContent: isArticleContent?.length > 0 })}
        id={`articletab-content-${itemId}`}
        role={role}
      >
        <PlaceholderWrapper name="custom-article-top-content-main" rendering={rendering} />
        <PlaceholderWrapper name="custom-article-main-content" rendering={rendering} />
        <PlaceholderWrapper name="custom-article-bottom-content" rendering={rendering} />
      </div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(ArticleMain, false);
