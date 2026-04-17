import React from 'react';
import { GetComponentServerProps } from '@sitecore-content-sdk/nextjs';
import graphqlClientFactory from 'lib/graphql-client-factory';
import ArticleCategoryTabsQuery, {
  ArticleCategoryTabsQueryResult,
} from 'components/authorable/shared/page-specific/ArticleCategoryTabs.graphql';
import { XcelerateArticleDetailPage, Tag } from 'src/baseTypes/Xcelerate.HztlFoundation.model';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import { tv } from 'tailwind-variants';
import useDictionary from 'lib/hooks/useDictionary';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import ArticleTagsWrapper from 'helpers/GenericWrappers/ArticleTagsWrapper/ArticleTagsWrapper';
import formatDate from 'lib/utils/date-formatter';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { EditingConditionalRender } from 'helpers/Editing/EditingConditionalRender';
import useIsEditing from 'lib/hooks/useIsEditing';
import { getTestProps } from 'lib/testing/utils';

type ArticleContentProps = {
  staticProps: {
    parentCategory?: string;
    articleDetail?: XcelerateArticleDetailPage;
  };
};

const ArticleContent = (props: ArticleContentProps) => {
  const category = props.staticProps.parentCategory;
  const articleDetail = props.staticProps.articleDetail;
  const fields = articleDetail?.fields || {};
  const publishedDate = formatDate(fields.publishedDate?.value);
  const tags = Array.isArray(fields.SxaTags) ? fields.SxaTags : [];
  const stringTagsArray = tags?.map((tag: Tag) => tag?.fields?.Title?.value) || [];
  const { getDictionaryValue } = useDictionary();

  const {
    base,
    imageWithDetailContainer,
    imageStyle,
    authorDetails,
    authorStyleWrapper,
    authorHeadStyleText,
    authorStyleText,
    metaInfo,
  } = TAILWIND_VARIANTS();

  const isEditingMode = useIsEditing();
  const isMetaDataContainerVisible = !!fields.authorName?.value || !!publishedDate || !!category;

  return (
    <div className={base()} {...getTestProps(`component-article-content-${articleDetail?.id}`)}>
      <div className={imageWithDetailContainer()}>
        {fields.image && (
          <ImageWrapper
            className={imageStyle()}
            field={fields.image}
            priority
            {...getTestProps(`image`)}
          />
        )}
        <div
          className={authorDetails({
            isMetaDataContainerVisible: isMetaDataContainerVisible || isEditingMode,
          })}
        >
          <EditingConditionalRender showIf={!!fields.authorName?.value}>
            <div className={authorStyleWrapper()}>
              <div className={authorHeadStyleText()} {...getTestProps(`author-name-label`)}>
                {getDictionaryValue('WrittenBy') || 'Written by'}
              </div>
              <div className={authorStyleText()} {...getTestProps(`author-name`)}>
                <PlainTextWrapper field={fields?.authorName} tag="div" />
              </div>
            </div>
          </EditingConditionalRender>
          <EditingConditionalRender showIf={!!publishedDate}>
            <div className={authorStyleWrapper()}>
              <div className={authorHeadStyleText()} {...getTestProps(`published-date-label`)}>
                {getDictionaryValue('PublishedOn') || 'Published on'}
              </div>
              <div className={authorStyleText()} {...getTestProps(`published-date`)}>
                {publishedDate}
              </div>
            </div>
          </EditingConditionalRender>
          <EditingConditionalRender showIf={!!category}>
            <div className={authorStyleWrapper()}>
              <div className={authorHeadStyleText()} {...getTestProps(`category-label`)}>
                {getDictionaryValue('Category') || 'Category'}
              </div>
              <div className={authorStyleText()} {...getTestProps(`category`)}>
                {category || 'Uncategorized'}
              </div>
            </div>
          </EditingConditionalRender>
        </div>
      </div>
      <div className={metaInfo()}>
        <RichTextWrapper field={fields?.description} tag="p" {...getTestProps(`description`)} />
        <ArticleTagsWrapper tags={stringTagsArray} {...getTestProps(`article-tags-wrapper`)} />
      </div>
    </div>
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

  const parentCategory = result?.currentPage?.parent?.categoryName?.value ?? null;
  const articleDetail = layoutData?.sitecore?.route as XcelerateArticleDetailPage;

  return {
    staticProps: {
      parentCategory,
      articleDetail,
    },
  };
};

export default ArticleContent;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['flex', 'flex-col'],
    imageWithDetailContainer: [
      'flex',
      'flex-col',
      'gap-component-article-hero-image-margin-bottom',
      'border-b',
      'border-b-width-width-025',
      'border-color-border-border',
    ],
    imageStyle: ['object-cover', 'w-full', 'aspect-[21/9]', 'rounded-xl'],
    authorDetails: ['flex', 'gap-space-between-more'],
    authorStyleWrapper: ['flex', 'flex-col', 'gap-spacing-spacing-8'],
    authorHeadStyleText: [
      'text-color-icon-dark',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'font-semibold',
    ],
    authorStyleText: [
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-normal',
    ],
    metaInfo: [
      'max-w-typography-copy-max-Width',
      'mx-auto',
      'pt-general-spacing-margin-y',
      'flex',
      'flex-col',
      'gap-margin-more',
    ],
  },
  variants: {
    isMetaDataContainerVisible: {
      true: {
        authorDetails: ['mb-component-article-hero-image-margin-bottom'],
      },
      false: {
        authorDetails: ['mb-0'],
      },
    },
  },
});
