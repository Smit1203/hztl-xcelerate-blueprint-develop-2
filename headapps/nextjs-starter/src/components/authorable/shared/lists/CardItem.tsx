'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Lists } from '.generated/Lists/CardList.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';
import SvgIcon from 'helpers/SvgIcon/SvgIcon';
import { useCardListContext } from './CardList';
import { getTestProps } from 'lib/testing/utils';

export type CardItemProps = Lists.CardList.CardItem_Component;

const CardItem = (props: CardItemProps): JSX.Element => {
  const { cardImage, cardLink1, cardLink2, description, eyebrow, heading, subHeading } =
    props?.fields || {};
  const { RenderingIdentifier } = props?.params || {};

  const styles = parseStyleParams(props.params, ['cta1', 'cta2']);

  // Get column count from CardList context
  const cardListColCount = useCardListContext();

  const {
    container,
    header,
    body,
    contentWrapper,
    content,
    eyebrow: eyebrowTV,
    heading: headingTV,
    subheading: subheadingTV,
    description: descriptionTV,
    footer,
    cta,
    noImageContainer,
    noImageIcon,
    imageWrapper,
  } = TAILWIND_VARIANTS({ colCount: cardListColCount });

  return (
    <article
      className={container()}
      data-component="authorable/shared/lists/carditem"
      id={RenderingIdentifier}
      {...getTestProps(`card-item-${props?.rendering?.uid}`)}
    >
      <div className={header()}>
        {cardImage?.value?.src ? (
          <ImageWrapper field={cardImage} className={imageWrapper()} {...getTestProps(`image`)} />
        ) : (
          <div className={noImageContainer()} {...getTestProps(`no-image`)}>
            <SvgIcon icon="no-image" size="lg" viewBox="0 0 240 240" className={noImageIcon()} />
          </div>
        )}
      </div>
      <div className={body()}>
        <div className={contentWrapper()}>
          <div className={content()}>
            <PlainTextWrapper
              className={eyebrowTV()}
              editable
              field={eyebrow}
              tag="div"
              {...getTestProps(`eyebrow`)}
            />
            <PlainTextWrapper
              className={headingTV()}
              field={heading}
              {...getTestProps(`heading`)}
            />
            <PlainTextWrapper
              className={subheadingTV()}
              field={subHeading}
              {...getTestProps(`sub-heading`)}
            />
            <PlainTextWrapper
              className={descriptionTV()}
              field={description}
              {...getTestProps(`description`)}
            />
          </div>
          <div className={footer()}>
            <LinkWrapper
              ctaComponentClass="component-card-item-button-1-color"
              className={cta()}
              ctaStyle={getCtaStyle(styles.cta1, 'primary')}
              field={cardLink1}
              {...getTestProps(`primary-cta`)}
            />
            <LinkWrapper
              ctaComponentClass="component-card-item-button-2-color"
              className={cta()}
              ctaStyle={getCtaStyle(styles.cta2, 'secondary')}
              field={cardLink2}
              {...getTestProps(`secondary-cta`)}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export const Default = withStandardComponentWrapper(CardItem);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    style: 'primary',
    colCount: '1',
  },
  slots: {
    container: [
      'flex',
      'w-full',
      'h-full',
      'overflow-hidden',
      'border',
      'border-component-card-item-border',
      'rounded-general-border-radius-card',
      'bg-component-card-item-surface',
    ],
    header: [
      'relative',
      'min-h-max',
      'w-full',
      'rounded-component-article-card-image-radius',
      'overflow-hidden',
      'aspect-video',
      'text-color-fill-brand-1',
      'transition',
      'duration-300',
      'ease-in-out',
      'group',
      'pt-component-article-card-portrait-image-padding-top',
      'px-component-article-card-portrait-image-padding-x',
      'pb-component-article-card-portrait-image-padding-bottom',
    ],
    body: ['flex', 'flex-col', 'h-full', 'w-full', 'items-center'],
    contentWrapper: [
      'flex',
      'flex-col',
      'w-full',
      'gap-spacing-spacing-4',
      'pt-component-article-card-portrait-content-padding-top',
      'pb-component-article-card-portrait-content-padding-bottom',
      'px-component-article-card-portrait-content-padding-x',
    ],
    content: ['flex', 'flex-col', 'w-full'],
    eyebrow: [
      'font-semibold',
      'text-component-card-item-eyebrow',
      'text-typography-body-small-font-size',
      'mb-spacing-spacing-4',
      'font-regular',
      'line-clamp-1',
    ],
    heading: [
      'font-typography-font-weight-bold',
      'text-typography-body-large-font-size',
      'text-component-card-item-title',
      'leading-typography-line-height-body-large',
      'line-clamp-1',
    ],
    subheading: [
      'font-semibold',
      'text-typography-body-medium-font-size',
      'leading-typography-line-height-body-medium',
      'text-component-card-item-subtitle',
      'line-clamp-1',
    ],
    description: [
      'text-typography-body-medium-font-size',
      'text-component-card-item-body',
      'leading-typography-line-height-body-medium',
      'mb-spacing-spacing-8',
      'font-typography-body-small-font-weight',
    ],
    footer: ['flex', 'flex-wrap', 'gap-2', 'items-center', 'justify-normal', 'w-full'],
    cta: [
      'flex',
      'gap-spacing-spacing-8',
      'items-center',
      'justify-center',
      'py-spacing-spacing-12',
    ],
    noImageContainer: [
      'flex',
      'items-center',
      'justify-center',
      'h-full',
      'bg-color-grayscale-400',
      'rounded-component-article-card-image-radius',
    ],
    noImageIcon: ['text-color-text-text-secondary', 'opacity-50'],
    imageWrapper: [
      'w-full',
      'h-full',
      'object-cover',
      'rounded-component-article-card-image-radius',
    ],
  },
  variants: {
    colCount: {
      '1': {
        container: ['flex-col', 'md:flex-row', 'md:gap-0'],
        body: ['flex-row', 'items-start', 'text-left', 'lg:pl-0', 'justify-center'],
        description: ['md:line-clamp-3', 'lg:line-clamp-6'],
        content: ['text-left', 'justify-center'],
        contentWrapper: [
          'text-left',
          'justify-center',
          'sm:py-component-article-card-landscape-content-padding-y',
          'sm:px-component-article-card-landscape-content-padding-x',
          'lg:py-component-article-card-landscape-content-1-col-padding-y',
          'lg:px-component-article-card-landscape-content-1-col-padding-x',
        ],
        header: [
          'sm:py-component-article-card-landscape-image-padding-y',
          'sm:px-component-article-card-landscape-image-padding-x',
          'sm:pr-0',
        ],
      },
      '2': {
        container: ['flex-col', 'md:flex-row'],
        body: ['flex-row', 'items-start', 'text-left', 'justify-center'],
        description: ['md:line-clamp-3', 'lg:line-clamp-2'],
        content: ['text-left'],
        contentWrapper: [
          'text-left',
          'justify-center',
          'sm:py-component-article-card-landscape-content-padding-y',
          'sm:px-component-article-card-landscape-content-padding-x',
        ],
        header: [
          'aspect-video',
          'lg:aspect-[5/4]',
          'sm:py-component-article-card-landscape-image-padding-y',
          'sm:px-component-article-card-landscape-image-padding-x',
          'sm:pr-0',
        ],
      },
      '3': {
        container: ['flex-col'],
        body: ['flex-col', 'items-start', 'text-left'],
        content: ['text-left'],
        contentWrapper: ['h-full', 'text-left'],
        footer: ['mt-auto'],
      },
      '4': {
        container: ['flex-col'],
        body: ['flex-col', 'items-center', 'text-left'],
        content: ['text-left'],
        contentWrapper: ['h-full', 'text-left'],
        footer: ['mt-auto'],
      },
    },
  },
});
