'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { Content } from '.generated/Content/Hero.model';
import { Field, LinkField, ComponentParams } from '@sitecore-content-sdk/nextjs';
import { withStandardComponentWrapper } from 'helpers/HOC';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';

import { useCurrentPage } from 'lib/hooks/sitecore/context';
import { XceleratePage } from 'src/baseTypes/Xcelerate.HztlFoundation.model';
import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';
import { Themes, Layout } from 'helpers/Constants/Constant';
import { getTestProps } from 'lib/testing/utils';

export type HeroProps = Content.Hero.Hero_Component;
// Reusable content component for both variants
const HeroContent = ({
  heading,
  description,
  cta1Link,
  cta2Link,
  heroTitle,
  heroDescription,
  eyebrow,
  subHeading,
  layout,
  params,
}: {
  heading?: Field<string>;
  description?: Field<string>;
  cta1Link?: LinkField;
  cta2Link?: LinkField;
  heroTitle?: Field<string>;
  heroDescription?: Field<string>;
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
        fallbacks={[heroTitle]}
        tag="h1"
        {...getTestProps(`heading`)}
      />
      <PlainTextWrapper
        className={subHeadingText()}
        field={subHeading}
        tag="h2"
        {...getTestProps(`sub-heading`)}
      />
      <RichTextWrapper
        className={descriptionText()}
        field={description}
        fallbacks={[heroDescription]}
        tag="div"
        {...getTestProps(`description`)}
      />
      <div className={ctaContainer()}>
        <LinkWrapper
          ctaComponentClass="component-hero-button-color-1"
          className={cta({ style: styles.cta1?.ctaVariant })}
          ctaStyle={getCtaStyle(styles.cta1, 'primary')}
          field={cta1Link}
          suppressNewTabIcon={true}
          {...getTestProps(`link-cta1`)}
        />
        <LinkWrapper
          ctaComponentClass="component-hero-button-color-2"
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

const Hero = (props: HeroProps): JSX.Element => {
  const { cta1Link, cta2Link, description, heading, image, eyebrow, subHeading } =
    props?.fields || {};
  const currentPage = useCurrentPage<XceleratePage>();
  const { heroTitle, heroDescription, heroImage } = currentPage?.fields ?? {};

  const theme = props?.params?.selectTheme as Themes;
  const layout = (props?.params?.layout as Layout) || 'Full'; // Default: Full

  const { base, contentColumn, imageColumnBase, imageColumnRight, imageStyle } = TAILWIND_VARIANTS({
    layout: 'right',
    heroLayout: layout as Layout,
  });

  return (
    <BrandAndThemeProvider theme={theme}>
      <section
        className={base()}
        data-component="authorable/shared/content/hero"
        {...getTestProps(`component-hero-${props?.rendering?.uid}`)}
      >
        <div className={contentColumn()}>
          <HeroContent
            heading={heading}
            description={description}
            cta1Link={cta1Link}
            cta2Link={cta2Link}
            heroTitle={heroTitle}
            heroDescription={heroDescription}
            eyebrow={eyebrow}
            subHeading={subHeading}
            layout="right"
            params={props.params}
          />
        </div>
        <div className={`${imageColumnBase()} ${imageColumnRight()}`}>
          <ImageWrapper
            className={imageStyle()}
            field={image}
            fallbacks={[heroImage]}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            {...getTestProps(`hero-image`)}
          />
        </div>
      </section>
    </BrandAndThemeProvider>
  );
};

const ImageLeftVariant = (props: HeroProps): JSX.Element => {
  const { cta1Link, cta2Link, description, heading, image, eyebrow, subHeading } =
    props?.fields || {};
  const currentPage = useCurrentPage<XceleratePage>();
  const { heroTitle, heroDescription, heroImage } = currentPage?.fields ?? {};

  const theme = props?.params?.selectTheme as Themes;
  const layout = (props?.params?.layout as Layout) || 'Full'; // Default: Full

  const { base, contentColumn, imageColumnBase, imageColumnLeft, imageStyle } = TAILWIND_VARIANTS({
    layout: 'left',
    heroLayout: layout as Layout,
  });

  return (
    <BrandAndThemeProvider theme={theme}>
      <section
        className={base()}
        data-component="authorable/shared/content/hero-image-left"
        {...getTestProps(`component-hero-image-left-${props?.rendering?.uid}`)}
      >
        <div className={`${imageColumnBase()} ${imageColumnLeft()}`}>
          <ImageWrapper
            className={imageStyle()}
            field={image}
            fallbacks={[heroImage]}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            {...getTestProps(`hero-image`)}
          />
        </div>
        <div className={contentColumn()}>
          <HeroContent
            heading={heading}
            description={description}
            cta1Link={cta1Link}
            cta2Link={cta2Link}
            heroTitle={heroTitle}
            heroDescription={heroDescription}
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

export const Default = withStandardComponentWrapper(Hero);

export const ImageLeft = withStandardComponentWrapper(ImageLeftVariant);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    layout: 'right',
  },
  slots: {
    base: [
      'flex',
      'gap-component-hero-space-between',
      'items-center',
      'bg-component-hero-bg',
      'rounded-general-border-radius-wrapper-container',
    ],
    cta: [],
    contentColumn: ['flex', 'w-full', 'md:w-1/2'],
    imageColumnBase: [
      'w-full',
      'md:w-1/2',
      'rounded-component-hero-image-border-radius',
      'aspect-[4/3]',
      'border',
      'border-component-hero-image-border',
      'border-component-hero-image-border-width',
      'overflow-hidden',
    ],
    imageColumnRight: [],
    imageColumnLeft: [],
    contentContainer: ['md:max-w-lg', 'px-0', 'w-full'],
    ctaContainer: [
      'flex',
      'flex-wrap',
      'mt-component-hero-buttons-margin-top',
      'gap-spacing-spacing-8',
      'md:justify-normal',
    ],
    descriptionText: [
      'text-component-hero-body',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-normal',
      'leading-typography-line-height-body-large',
      'sm:line-clamp-2',
      'xl:line-clamp-5',
    ],
    headingText: [
      'font-bold',
      'text-component-hero-title',
      'font-typography-header-font-family',
      'text-typography-header-xlarge-font-size',
      'leading-tight',
      'sm:line-clamp-1',
      'lg:line-clamp-2',
    ],
    eyebrowText: [
      'text-component-hero-eyebrow',
      'font-typography-body-font-family',
      'text-typography-eyebrow-font-size',
      'font-bold',
      'leading-typography-line-height-xsmall',
      'tracking-[2.7px]',
      'mb-general-spacing-eyebrow-margin-bottom',
      'uppercase',
      'line-clamp-1',
    ],
    subHeadingText: [
      'text-component-hero-subtitle',
      'font-typography-header-font-family',
      'text-typography-header-medium-font-size',
      'font-bold',
      'leading-typography-line-height-medium',
      'my-component-hero-content-spacing-vertical',
      'sm:line-clamp-1',
      'lg:line-clamp-2',
    ],
    imageStyle: [
      'w-full',
      'h-full',
      'object-cover',
      'rounded-component-article-card-image-radius',
      'overflow-hidden',
    ],
  },
  variants: {
    style: {
      link: {
        cta: [
          'flex',
          'items-center',
          'my-auto',
          'gap-2',
          'text-base',
          // TODO: NEED TO UPDATE FIGMA TOKENS.
          // This is a temporary fix to make the cta link themeable.
          'text-component-accordion-toggle-active',
        ],
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
      },
      left: {
        base: ['flex-col', 'md:flex-row'],
      },
    },
    heroLayout: {
      Full: {
        base: [
          'py-component-hero-padding-y',
          'px-component-hero-padding-x',
          'xl:px-spacing-spacing-80',
        ],
      },
      Wide: {
        base: [
          'relative',
          'before:z-[-1]',
          'before:h-full',
          'before:absolute',
          'before:top-0',
          'before:left-[calc(-50vw+50%)]',
          'before:bg-component-hero-bg',
          'before:right-[calc(-50vw+50%)]',
          'py-component-hero-padding-y',
          'xl:px-0',
        ],
      },
    },
  },
});
