// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { PageSpecific } from '.generated/PageSpecific/RelatedArticles.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import RelatedArticlesWidget from 'widgets/RelatedArticles';
import { XcelerateArticleDetailPage } from 'src/baseTypes/Xcelerate.HztlFoundation.model';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import useIsEditing from 'lib/hooks/useIsEditing';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';
import { useCurrentPage, useSiteSettings } from 'lib/hooks/sitecore/context';

export type RelatedArticlesProps = PageSpecific.RelatedArticles.RelatedArticles_Component;

const RelatedArticles = (props: RelatedArticlesProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const siteSettings = useSiteSettings();
  const currentPage = useCurrentPage<XcelerateArticleDetailPage>();
  const articleTags = currentPage?.fields?.SxaTags || [];
  const isEditing = useIsEditing();
  const { getDictionaryValue } = useDictionary();
  // Get search sources from site settings
  const searchSources = siteSettings?.globalSearchSourceId?.value;
  const noOfRelatedArticleCount = siteSettings?.noOfRelatedArticlesCount?.value;

  // Parse pipe-separated sources into array
  const sources = searchSources
    ? searchSources
        .split('|')
        .map((s) => s.trim())
        .filter((s) => s)
    : [];
  const rfkid = siteSettings?.globalSearchWidgetId?.value;
  if (articleTags.length === 0) {
    if (isEditing) {
      return (
        <div data-component="authorable/shared/page-specific/relatedarticles">
          <EditingHelpText priority="warning">
            <RichTextWrapper field={{ value: getDictionaryValue('NoArticles') }} tag="p" />
          </EditingHelpText>
        </div>
      );
    }
    return <></>;
  }

  // Get current article tags from the page field data
  const currentArticleTags: string[] = Array.isArray(articleTags)
    ? articleTags.reduce<string[]>((acc, tag) => {
        const tagvalue = tag.fields?.Title?.value;
        if (tagvalue) {
          acc.push(tagvalue);
        }
        return acc;
      }, [])
    : [];

  //Formatted article id for the sitecore search
  const articleIdForSitecoreSearch = currentPage?.id
    ? currentPage.id.replace(/-/g, '').toUpperCase()
    : '';

  const { base, titleStyle } = TAILWIND_VARIANTS();

  return (
    <section
      className={base()}
      id={id ? id : undefined}
      data-component="authorable/shared/page-specific/relatedarticles"
      {...getTestProps(`component-related-articles-${props?.rendering?.uid}`)}
    >
      <PlainTextWrapper
        className={titleStyle()}
        field={props?.fields?.title}
        tag="h2"
        {...getTestProps(`title`)}
      />
      <RelatedArticlesWidget
        rfkId={rfkid || ''}
        currentArticleTags={currentArticleTags}
        currentArticleId={articleIdForSitecoreSearch}
        articleLimit={noOfRelatedArticleCount ?? 3}
        searchSources={sources}
        {...getTestProps(`related-articles-widget`)}
      />
    </section>
  );
};

export const Default = withStandardComponentWrapper(RelatedArticles);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['flex', 'flex-col', 'gap-spacing-spacing-24', 'text-component-feature-title'],
    titleStyle: [
      'text-component-feature-title',
      'font-typography-header-font-family',
      'text-typography-header-medium-font-size',
      'leading-typography-line-height-medium',
      'font-bold',
    ],
  },
});
