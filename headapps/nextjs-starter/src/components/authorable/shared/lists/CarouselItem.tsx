// Global
import { tv } from 'tailwind-variants';
import { JSX } from 'react';
// Local
import { Lists } from '.generated/Lists/Carousel.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';
import { getTestProps } from 'lib/testing/utils';

export type CarouselItemProps = Lists.Carousel.CarouselItem_Component;

const CarouselItem = (props: CarouselItemProps): JSX.Element => {
  const { description, image, primaryCTA, secondaryCTA, title } = props?.fields || {};

  /*
   * Rendering
   */

  const {
    content,
    cta,
    ctaButtons,
    descriptionText,
    heading,
    imageWrapper,
    slide,
    slideContent,
    slideMedia,
    wrapper,
  } = TAILWIND_VARIANTS();

  const styles = parseStyleParams(props.params, ['cta1', 'cta2']);

  return (
    <div
      className={slide()}
      data-component="authorable/shared/lists/carouselitem"
      {...getTestProps(`carousel-item-${props?.rendering?.uid}`)}
    >
      <div className={slideMedia()}>
        <ImageWrapper className={imageWrapper()} field={image} {...getTestProps(`image`)} />
        <div className={slideContent()}>
          <div className={content()}>
            <div className={wrapper()}>
              <PlainTextWrapper
                className={heading()}
                field={title}
                tag="h2"
                {...getTestProps(`heading`)}
              />
              {description && (
                <RichTextWrapper
                  className={descriptionText()}
                  field={description}
                  {...getTestProps(`description`)}
                />
              )}
            </div>
            {primaryCTA && (
              <div className={ctaButtons()}>
                <LinkWrapper
                  ctaComponentClass="default"
                  aria-label={primaryCTA?.value.text}
                  className={cta({ style: styles.cta1?.ctaVariant })}
                  ctaStyle={getCtaStyle(styles.cta1, 'primary')}
                  field={primaryCTA}
                  {...getTestProps(`primary-cta`)}
                ></LinkWrapper>
                <LinkWrapper
                  ctaComponentClass="default"
                  aria-label={secondaryCTA?.value.text}
                  className={cta({ style: styles.cta2?.ctaVariant })}
                  ctaStyle={getCtaStyle(styles.cta2, 'secondary')}
                  field={secondaryCTA}
                  {...getTestProps(`secondary-cta`)}
                ></LinkWrapper>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = withStandardComponentWrapper(CarouselItem);

const TAILWIND_VARIANTS = tv({
  slots: {
    content: [
      'slide-content-inner',
      'flex',
      'flex-col',
      'justify-center',
      'bg-color-surface-white',
      'rounded-general-border-radius-card',
      'gap-component-carousel-buttons-margin-top',
      'md:max-w-sm',
      'lg:max-w-xl',
    ],
    cta: [],
    descriptionText: [
      'carousel-rich-text',
      'text-color-text-text-secondary',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-normal',
      'leading-[27px]',
      'line-clamp-3',
    ],
    ctaButtons: ['flex', 'flex-col', 'gap-spacing-spacing-12', 'md:flex-row'],
    heading: [
      'text-color-text-text',
      'font-typography-header-font-family',
      'text-typography-header-large-font-size',
      'font-bold',
      'md:leading-[48px]',
      'leading-[38px]',
      'line-clamp-1',
    ],
    imageWrapper: [
      'relative',
      'md:absolute',
      'inset-0',
      'object-cover',
      'w-full',
      'rounded-general-border-radius-wrapper-container',
      'aspect-video',
      'bg-center',
      'bg-cover',
      'left-0',
      'top-0',
      'xl:h-[550px]',
      'md:h-[470px]',
      'h-[192px]',
    ],
    slide: [
      'flex',
      'md:justify-center',
      'xl:h-[550px]',
      'md:min-h-[470px]',
      'flex-col',
      'gap-spacing-spacing-16',
      'relative',
      'md:py-general-spacing-margin-y',
      'md:px-general-spacing-margin-x',
    ],
    slideContent: [
      'slide-content',
      'relative',
      'w-full',
      'z-10',
      'md:box-border',
      'md:text-left',
      'md:max-w-max',
      'bg-color-surface-white',
      'md:rounded-general-border-radius-card',
      'h-full',
      'overflow-auto',
      'md:content-center',
      'content-start',
      'md:p-spacing-spacing-40',
    ],
    slideMedia: [
      'slide-media',
      'h-full',
      'md:gap-0',
      'flex',
      'flex-col',
      'gap-spacing-spacing-16',
      'md:min-h-full',
      'min-h-[495px]',
    ],
    wrapper: ['flex', 'flex-col', 'gap-component-carousel-content-spacing-vertical'],
  },
  variants: {
    style: {
      link: {
        cta: ['text-base'],
      },
      primary: {
        cta: ['px-4'],
      },
      secondary: {
        cta: ['px-4'],
      },
      tertiary: {
        cta: ['px-4'],
      },
    },
  },
});
