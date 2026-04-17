// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';

// Lib
import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { Content } from '.generated/Content/Feature.model';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { Alignment, Themes } from 'helpers/Constants/Constant';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { getTestProps } from 'lib/testing/utils';

// Types
export type FeatureProps = Content.Feature.Feature_Component;
export type FeatureParametersProps = Content.Feature.FeatureParameters_Component;

const Feature = (props: FeatureProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  const styles: string = props?.params?.Styles ?? '';

  const theme = props?.params?.selectTheme as Themes;
  const alignment = (props?.params?.alignment as Alignment) || 'Left'; // Default: Left

  const { eyebrow, subHeadline, background, icon, headline, description, cta1Link, cta2Link } =
    props?.fields || {};

  const {
    base,
    wrapper,
    imageWrapper,
    bgImage,
    backgroundImageOverlay,
    contentWrapper,
    eyebrowWrapper,
    eyebrowText,
    iconWrapper,
    titleWrappers,
    subHeadlineText,
    headlineText,
    descriptionText,
    actionButtonWrapper,
  } = TAILWIND_VARIANTS({
    alignment: alignment as Alignment,
  });

  /*
   * Rendering
   */

  return (
    <section
      className={clsx(base(), styles)}
      data-component="authorable/shared/content/feature"
      id={id ? id : undefined}
      {...getTestProps(`component-feature-${props?.rendering?.uid}`)}
    >
      <BrandAndThemeProvider theme={theme}>
        <div className={wrapper()}>
          <div className={clsx(imageWrapper())}>
            {background?.value?.src && (
              <ImageWrapper
                className={clsx(bgImage(), background?.value?.src ? 'opacity-15' : 'opacity-0')}
                field={background}
                layout="fill"
                {...getTestProps(`image`)}
              />
            )}
            <div className={clsx(backgroundImageOverlay())} />
          </div>

          <div className={contentWrapper()}>
            <div className={eyebrowWrapper()}>
              <PlainTextWrapper
                className={clsx(eyebrowText())}
                field={eyebrow}
                tag="span"
                {...getTestProps(`eyebrow`)}
              />
            </div>

            {icon?.value?.src && (
              <div className={clsx(iconWrapper())}>
                <ImageWrapper field={icon} {...getTestProps(`icon`)} />
              </div>
            )}

            <div className={titleWrappers()}>
              <PlainTextWrapper
                className={clsx(headlineText())}
                field={headline}
                tag="h2"
                {...getTestProps(`headline`)}
              />
              <PlainTextWrapper
                className={clsx(subHeadlineText())}
                field={subHeadline}
                tag="h3"
                {...getTestProps(`sub-headline`)}
              />
            </div>
            <RichTextWrapper
              className={clsx(descriptionText())}
              field={description}
              {...getTestProps(`description`)}
            />

            <div className={actionButtonWrapper()}>
              <LinkWrapper
                ctaVariant="primary"
                field={cta1Link}
                ctaComponentClass="component-feature-button-color-1"
                {...getTestProps(`cta-1`)}
              />
              <LinkWrapper
                ctaVariant="secondary"
                field={cta2Link}
                ctaComponentClass="component-feature-button-color-2"
                {...getTestProps(`cta-2`)}
              />
            </div>
          </div>
        </div>
      </BrandAndThemeProvider>
    </section>
  );
};

export const Default = withStandardComponentWrapper(Feature);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['relative', 'w-full'],
    wrapper: [
      'py-component-feature-container-copy-container-padding-y',
      'px-component-feature-container-copy-container-padding-x',
      'relative',
      'min-h-height-minHeight-header-minHeight',
      'rounded-general-border-radius-wrapper-container',
      'overflow-hidden',
    ],
    imageWrapper: ['absolute', 'inset-0', 'z-0'],
    bgImage: ['z-0', 'object-cover', 'h-full', 'w-full'],
    backgroundImageOverlay: ['absolute', 'inset-0', '-z-10', 'bg-component-feature-bg'],
    contentWrapper: ['relative', 'flex', 'flex-col', 'lg:max-w-typography-copy-max-Width'],
    eyebrowWrapper: ['pb-general-spacing-eyebrow-margin-bottom', 'text-component-hero-eyebrow'],
    eyebrowText: [
      'font-typography-header-font-family',
      'text-typography-eyebrow-font-size',
      'font-bold',
      'leading-normal',
      'tracking-[0.16875rem] uppercase',
      'text-component-hero-eyebrow',
    ],
    iconWrapper: ['iconWrapper', 'pb-margin-less', 'flex'],
    titleWrappers: [
      'headingWrapper',
      'flex',
      'flex-col',
      'gap-general-spacing-title-margin-bottom',
      'pb-general-spacing-subtitle-margin-bottom',
      'text-component-feature-subtitle',
    ],
    subHeadlineText: [
      'text-typography-header-medium-font-size',
      'font-typography-header-font-family',
      'font-bold',
      'leading-normal',
    ],
    headlineText: [
      'font-typography-header-font-family',
      'text-typography-header-xlarge-font-size',
      'text-component-feature-title',
      'font-bold',
      'leading-none',
    ],
    descriptionText: [
      'font-typography-body-font-family',
      'font-normal',
      'leading-normal',
      'text-component-feature-body',
      'text-typography-header-medium-font-size',
    ],
    actionButtonWrapper: [
      'flex',
      'flex-col',
      'md:flex-row',
      'gap-space-between-less',
      'mt-general-spacing-copy-margin-bottom',
      'pt-general-spacing-buttons-margin-top',
    ],
  },
  variants: {
    alignment: {
      Left: {
        contentWrapper: ['justify-start', 'text-left'],
        actionButtonWrapper: ['justify-start'],
        iconWrapper: ['justify-start'],
      },
      Center: {
        contentWrapper: ['justify-center', 'text-center', 'm-auto'],
        actionButtonWrapper: ['justify-center'],
        iconWrapper: ['justify-center'],
        descriptionText: ['text-center'],
      },
      Right: {
        contentWrapper: ['justify-end', 'text-right', 'float-right'],
        actionButtonWrapper: ['justify-end'],
        iconWrapper: ['justify-end'],
        descriptionText: ['text-right'],
      },
    },
  },
});
