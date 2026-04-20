'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Content } from '.generated/Content/FeatureSideBySide.model';
import { Field, LinkField, ComponentParams } from '@sitecore-content-sdk/nextjs';
import { withStandardComponentWrapper } from 'helpers/HOC';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';

import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';
import { Themes } from 'helpers/Constants/Constant';
import { getTestProps } from 'lib/testing/utils';

export type FeatureSidebySideProps = Content.FeatureSideBySide.FeatureSideBySide_Component;

// Reusable content component for both variants
const FeatureSidebySideContent = ({
  heading,
  description,
  cta1Link,
  cta2Link,
  eyebrow,
  subHeading,
  layout,
  params,
}: {
  heading?: Field<string>;
  description?: Field<string>;
  cta1Link?: LinkField;
  cta2Link?: LinkField;
  eyebrow?: Field<string>;
  subHeading?: Field<string>;
  layout: 'left' | 'right';
  params?: ComponentParams;
}): JSX.Element => {
  const styles = parseStyleParams(params, ['cta1', 'cta2']);

  const {
    contentContainer,
    headingText,
    descriptionText,
    ctaContainer,
    cta,
    eyebrowText,
    subHeadingText,
  } = TAILWIND_VARIANTS({ layout });

  return (
    <div className={contentContainer()}>
      <PlainTextWrapper
        className={eyebrowText()}
        field={eyebrow}
        tag="div"
        {...getTestProps(`eyebrow`)}
      />
      <PlainTextWrapper
        className={headingText()}
        field={heading}
        tag="h2"
        {...getTestProps(`heading`)}
      />
      <PlainTextWrapper
        className={subHeadingText()}
        field={subHeading}
        tag="h3"
        {...getTestProps(`sub-heading`)}
      />
      <RichTextWrapper
        className={descriptionText()}
        field={description}
        tag="div"
        {...getTestProps(`description`)}
      />
      <div className={ctaContainer()}>
        <LinkWrapper
          ctaComponentClass="component-promo-button-color-1"
          className={cta({ style: styles.cta1?.ctaVariant })}
          ctaStyle={getCtaStyle(styles.cta1, 'primary')}
          field={cta1Link}
          suppressNewTabIcon={true}
          {...getTestProps(`link-cta1`)}
        />
        <LinkWrapper
          ctaComponentClass="component-promo-button-color-2"
          className={cta({ style: styles.cta2?.ctaVariant })}
          ctaStyle={getCtaStyle(styles.cta2, 'secondary')}
          field={cta2Link}
          suppressNewTabIcon={true}
          {...getTestProps(`link-cta2`)}
        />
      </div>
    </div>
  );
};

const FeatureSidebySide = (props: FeatureSidebySideProps): JSX.Element => {
  const { cta1Link, cta2Link, description, heading, image, eyebrow, subHeading } =
    props?.fields || {};

  const theme = props?.params?.selectTheme as Themes;

  const { base, contentColumn, imageColumnBase, imageStyle } = TAILWIND_VARIANTS({
    layout: 'right',
  });

  return (
    <BrandAndThemeProvider theme={theme}>
      <section
        className={base()}
        data-component="authorable/shared/content/feature-sidebyside"
        {...getTestProps(`component-feature-side-by-side-${props?.rendering?.uid}`)}
      >
        <div className={contentColumn()}>
          <FeatureSidebySideContent
            heading={heading}
            description={description}
            cta1Link={cta1Link}
            cta2Link={cta2Link}
            eyebrow={eyebrow}
            subHeading={subHeading}
            layout="right"
            params={props.params}
          />
        </div>
        <div className={imageColumnBase()}>
          <ImageWrapper className={imageStyle()} field={image} {...getTestProps(`image`)} />
        </div>
      </section>
    </BrandAndThemeProvider>
  );
};

const ImageLeftVariant = (props: FeatureSidebySideProps): JSX.Element => {
  const { cta1Link, cta2Link, description, heading, image, eyebrow, subHeading } =
    props?.fields || {};

  const theme = props?.params?.selectTheme as Themes;

  const { base, contentColumn, imageColumnBase, imageStyle } = TAILWIND_VARIANTS({
    layout: 'left',
  });

  return (
    <BrandAndThemeProvider theme={theme}>
      <section
        className={base()}
        data-component="authorable/shared/content/feature-sidebyside-image-left"
        {...getTestProps(`component-feature-side-by-side-image-left-${props?.rendering?.uid}`)}
      >
        <div className={imageColumnBase()}>
          <ImageWrapper className={imageStyle()} field={image} {...getTestProps(`image`)} />
        </div>
        <div className={contentColumn()}>
          <FeatureSidebySideContent
            heading={heading}
            description={description}
            cta1Link={cta1Link}
            cta2Link={cta2Link}
            eyebrow={eyebrow}
            subHeading={subHeading}
            layout="left"
            params={props.params}
          />
        </div>
      </section>
    </BrandAndThemeProvider>
  );
};

export const Default = withStandardComponentWrapper(FeatureSidebySide);

export const ImageLeft = withStandardComponentWrapper(ImageLeftVariant);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    layout: 'right',
  },
  slots: {
    base: [
      'flex',
      'items-center',
      'bg-component-promo-bg',
      'overflow-hidden',
      'rounded-general-border-radius-wrapper-container',
      'py-component-promo-container-promo-container-padding-y',
      'px-component-promo-container-promo-container-padding-x',
      'sm:pl-component-promo-container-promo-container-padding-x',
      'md:pr-0',
    ],
    cta: [],
    contentColumn: [
      'flex',
      'w-full',
      'bg-component-promo-surface',
      'py-component-promo-content-padding-y',
      'px-component-promo-content-padding-x',
      'rounded-component-promo-content-radius',
      'h-fill-available',
      'md:w-3/5',
      'lg:w-1/2',
      // 'lg:my-component-promo-content-padding-y',
      'z-10',
    ],
    imageColumnBase: [
      'w-full',
      'overflow-hidden',
      'relative',
      'aspect-[1/1]',
      'py-component-promo-image-padding-y',
      'px-component-promo-image-padding-x',
      'rounded-component-promo-image-radius',
      'overflow-hidden',
      'md:min-h-[-webkit-fill-available]',
      'md:w-2/5',
      'lg:w-1/2',
      'xl:aspect-square',
    ],
    contentContainer: [
      'md:max-w-xl',
      'px-0',
      'w-full',
      'rounded-component-promo-content-radius',
      'sm:py-component-promo-image-padding-y',
      'md:px-0',
      'bg-component-promo-surface',
    ],
    ctaContainer: [
      'flex',
      'flex-wrap',
      'gap-space-between-less',
      'py-general-spacing-buttons-margin-top',
      'md:justify-normal',
    ],
    eyebrowText: [
      'text-component-promo-eyebrow',
      'font-typography-body-font-family',
      'text-typography-eyebrow-font-size',
      'font-bold',
      'uppercase',
      'line-clamp-1',
      'leading-typography-line-height-xsmall',
      'tracking-[2.7px]',
      'mb-general-spacing-eyebrow-margin-bottom',
      'overflow-hidden',
      'sm:mb-spacing-spacing-24',
    ],
    headingText: [
      'font-bold',
      'text-component-promo-title',
      'font-typography-header-font-family',
      'text-typography-header-xlarge-font-size',
      'leading-tight',
      'sm:line-clamp-2',
      'lg:line-clamp-auto',
    ],
    subHeadingText: [
      'text-component-promo-subtitle',
      'font-typography-header-font-family',
      'text-typography-header-medium-font-size',
      'font-bold',
      'leading-typography-line-height-medium',
      'sm:mb-spacing-spacing-16',
      'mb-general-spacing-subtitle-margin-bottom',
    ],
    descriptionText: [
      'mb-spacing-spacing-24',
      'text-component-promo-body',
      'font-typography-body-font-family',
      'text-typography-body-xlarge-font-size',
      'font-normal',
      'leading-typography-line-height-body-xlarge',
      'sm:line-clamp-3',
      'lg:line-clamp-4',
    ],

    imageStyle: [
      'w-full',
      'h-full',
      'object-cover',
      'object-center',
      'overflow-hidden',
      'rounded-component-promo-image-radius',
    ],
  },
  variants: {
    style: {
      link: {
        cta: ['text-base'],
      },
      primary: {
        cta: ['px-8'],
      },
      secondary: {
        cta: ['px-8'],
      },
      tertiary: {
        cta: ['px-8'],
      },
    },
    layout: {
      right: {
        base: ['flex-col', 'md:flex-row'],
        imageColumnBase: [
          'md:ml-component-promo-container-promo-container-gutter',
          'md:mr-component-promo-container-promo-container-padding-y',
        ],
      },
      left: {
        base: ['flex-col', 'md:flex-row'],
        imageColumnBase: ['md:mr-component-promo-container-promo-container-gutter'],
        contentColumn: ['md:mr-component-promo-container-promo-container-padding-y'],
      },
    },
    theme: {
      ThemesWhite: {
        imageColumnBase: ['rounded-border-radius-radius-3'],
      },
    },
  },
});
