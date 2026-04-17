import { tv } from 'tailwind-variants';
import PLACEHOLDER_IMAGE from 'public/assets/article-default-image.png';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import useDictionary from 'lib/hooks/useDictionary';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import ImageWrapper, {
  normalizeImageUrl,
} from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import ArticleTagsWrapper from '../ArticleTagsWrapper/ArticleTagsWrapper';
import formatDate from 'lib/utils/date-formatter';
import { getTestProps } from 'lib/testing/utils';

export type ArticleModel = {
  id: string;
  article_title?: string;
  article_description?: string;
  article_image?: string;
  article_url?: string;
  article_category?: string;
  article_tags?: string[];
  article_publisheddate?: string;
  article_subheading?: string;
};

export type ArticleCardWrapperProps = {
  article: ArticleModel;
  isHorizontalCardLayout?: boolean;
  isOneColHorizontalLayout?: boolean;
};

const ArticleCardWrapper = ({
  article,
  isHorizontalCardLayout = false,
  isOneColHorizontalLayout = false,
}: ArticleCardWrapperProps) => {
  const { getDictionaryValue } = useDictionary();
  const publishedDate = formatDate(article?.article_publisheddate);

  const {
    base,
    imageContainer,
    imageStyle,
    categoryTag,
    articleContentWrapper,
    articleTextContentWrapper,
    articleTitleStyle,
    descriptionStyle,
    textDescriptionWrapper,
    articleDateStyle,
    readMoreButtonStyle,
    articleContentGroup,
  } = TAILWIND_VARIANTS();

  const normalizedImage = normalizeImageUrl(article?.article_image);

  return (
    <div className={base({ isHorizontalCardLayout })}>
      <div className={imageContainer({ isHorizontalCardLayout })}>
        <LinkWrapper
          field={{
            href: article?.article_url,
          }}
          ctaComponentClass="default"
          {...getTestProps(`link`)}
        >
          <ImageWrapper
            className={imageStyle()}
            field={{
              value: {
                src: normalizedImage || PLACEHOLDER_IMAGE?.src,
                alt: article?.article_title,
              },
            }}
            {...getTestProps(`image`)}
          />
        </LinkWrapper>
        <PlainTextWrapper
          className={categoryTag()}
          field={{ value: article?.article_category }}
          tag="p"
          {...getTestProps(`category`)}
        />
      </div>
      <div className={articleContentWrapper({ isHorizontalCardLayout, isOneColHorizontalLayout })}>
        <div className={articleContentGroup()}>
          <div className={articleTextContentWrapper()}>
            <div className={textDescriptionWrapper()}>
              <PlainTextWrapper
                className={articleTitleStyle()}
                field={{ value: article?.article_title }}
                tag="h2"
                {...getTestProps(`title`)}
              />
              <RichTextWrapper
                className={descriptionStyle()}
                field={{ value: article?.article_subheading }}
                tag="p"
                {...getTestProps(`description`)}
              />
            </div>
            <PlainTextWrapper
              className={articleDateStyle()}
              field={{ value: publishedDate }}
              tag="p"
              {...getTestProps(`date`)}
            />
          </div>
          <LinkWrapper
            className={readMoreButtonStyle()}
            field={{
              text: `${getDictionaryValue('ReadMore') || 'Read more'}`,
              href: article?.article_url,
            }}
            ctaComponentClass="default"
            ctaVariant="link"
            ctaIcon="arrow-right"
            role="link"
            ctaIconAlignment="right"
            {...getTestProps(`cta`)}
          />
        </div>
        <ArticleTagsWrapper
          tags={article?.article_tags || []}
          maxTagsBreakPointNumber={3}
          {...getTestProps(`article-tags-wrapper`)}
        />
      </div>
    </div>
  );
};

export default ArticleCardWrapper;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      'flex',
      'flex-col',
      'border-color-border-border',
      'border-border-width-width-025',
      'rounded-general-border-radius-container',
      'bg-color-grayscale-white',
    ],
    imageContainer: ['relative'],
    imageStyle: ['aspect-[16/9]', 'rounded-component-article-card-image-radius', 'object-cover'],
    categoryTag: [
      'absolute',
      'top-4',
      'left-4',
      'px-component-card-label-padding-x',
      'py-component-card-label-padding-y',
      'bg-component-card-label-fill',
      'border-component-card-label-border-width',
      'rounded-component-card-label-border-radius',
      'border-component-card-label-border',
      'text-component-card-label-text',
      'font-typography-body-font-family',
      'text-typography-body-xsmall-font-size',
      'font-semibold',
      'max-w-52',
    ],
    articleContentWrapper: ['flex', 'flex-col', 'gap-2'],
    articleTextContentWrapper: ['flex', 'flex-col', 'gap-spacing-spacing-4'],
    articleContentGroup: ['flex', 'flex-col', 'gap-2'],
    textDescriptionWrapper: [],
    articleTitleStyle: [
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-bold',
      'text-color-text-text',
    ],
    descriptionStyle: [
      'line-clamp-2',
      'text-color-text-text-secondary',
      'overflow-ellipsis',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'font-normal',
    ],
    articleDateStyle: [
      'text-color-text-text',
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'font-normal',
    ],
    readMoreButtonStyle: [
      'flex',
      'p-spacing-spacing-2',
      'gap-spacing-spacing-8',
      'justify-center',
      'items-center',
      'text-component-button-primary-link-text',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'leading-5',
      'border-b',
      'border-transparent',
      'hover:border-b-width-width-025',
      'hover:border-component-button-primary-link-border-hover',
    ],
  },
  variants: {
    isHorizontalCardLayout: {
      true: {
        base: ['flex-col', 'md:flex-row'],
        imageContainer: [
          'w-full',
          'md:w-1/2',
          'py-component-article-card-landscape-image-padding-y',
          'pl-component-article-card-landscape-image-padding-x',
        ],
        articleContentWrapper: [
          'w-full',
          'md:w-1/2',
          'py-component-article-card-landscape-content-padding-y',
          'px-component-article-card-landscape-content-padding-x',
          'justify-center',
        ],
      },
      false: {
        imageContainer: [
          'pt-component-article-card-portrait-image-padding-top',
          'px-component-article-card-portrait-image-padding-x',
          'pb-component-article-card-portrait-image-padding-bottom',
        ],
        articleContentWrapper: [
          'px-component-article-card-portrait-content-padding-x',
          'pt-component-article-card-portrait-content-padding-top',
          'pb-component-article-card-portrait-content-padding-bottom',
          'justify-between',
          'h-full',
        ],
      },
    },
    isOneColHorizontalLayout: {
      true: {
        articleContentWrapper: ['!px-component-article-card-landscape-content-1-col-padding-x'],
      },
    },
  },
});
