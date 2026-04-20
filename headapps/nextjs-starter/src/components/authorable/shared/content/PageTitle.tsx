'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import clsx from 'clsx';

// Lib
import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { Content } from '.generated/Content/PageTitle.model';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { Alignment, Themes } from 'helpers/Constants/Constant';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { getCtaStyle } from 'lib/utils/cta-utils';
import { XceleratePage } from 'src/baseTypes/Xcelerate.HztlFoundation.model';
import { getTestProps } from 'lib/testing/utils';
import { useCurrentPage } from 'lib/hooks/sitecore/context';

// Types
export type PageTitleProps = Content.PageTitle.PageTitle_Component;
export type PageTitleParametersProps = Content.PageTitle.PageTitleParameters_Component;

const PageTitle = (props: PageTitleProps): JSX.Element => {
  const styles = parseStyleParams(props.params, ['cta1']);

  const theme = props?.params?.selectTheme as Themes;
  const alignment = (props?.params?.alignment as Alignment) || 'Left'; // Default: Left

  const { description, title, ctaLink } = props?.fields || {};

  const currentPage = useCurrentPage<XceleratePage>();
  const { pageTitle, pageDescription } = currentPage?.fields ?? {};

  const {
    base,
    cta,
    backgroundWrapper,
    contentWrapper,
    titleWrappers,
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
      data-component="authorable/shared/content/pageTitle"
      {...getTestProps(`component-page-title-${props?.rendering?.uid}`)}
    >
      <BrandAndThemeProvider theme={theme}>
        <div className={clsx(backgroundWrapper())} {...getTestProps(`background`)}></div>
        <div className={contentWrapper()}>
          <div className={titleWrappers()}>
            <PlainTextWrapper
              className={clsx(headlineText())}
              field={title}
              fallbacks={[pageTitle]}
              tag="h1"
              {...getTestProps(`headline`)}
            />
            <RichTextWrapper
              className={clsx(descriptionText())}
              field={description}
              fallbacks={[pageDescription]}
              {...getTestProps(`description`)}
            />
          </div>

          <div className={actionButtonWrapper()}>
            <LinkWrapper
              ctaComponentClass="component-section-button-color-1"
              className={cta({ style: styles.cta1?.ctaVariant })}
              ctaStyle={getCtaStyle(styles.cta1, 'primary')}
              field={ctaLink}
              {...getTestProps(`cta`)}
            />
          </div>
        </div>
      </BrandAndThemeProvider>
    </section>
  );
};

export const Default = withStandardComponentWrapper(PageTitle);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    style: 'primary',
  },
  slots: {
    cta: [],
    base: [
      'container',
      'max-w-none',
      'relative',
      'w-full',
      'py-layout-base-margin-y',
      'min-h-height-minHeight-header-minHeight',
    ],
    backgroundWrapper: [
      'absolute',
      'inset-0',
      'z-0',
      'left-[calc(-50vw+50%)]',
      'right-[calc(-50vw+50%)]',
      'bg-component-section-bg',
    ],
    contentWrapper: [
      'relative',
      'flex',
      'flex-col',
      'gap-general-spacing-copy-margin-bottom',
      'lg:max-w-typography-copy-max-Width',
    ],
    titleWrappers: [
      'flex',
      'flex-col',
      'gap-general-spacing-title-margin-bottom',
      'text-component-section-title',
    ],
    headlineText: [
      'text-typography-header-xlarge-font-size',
      'font-typography-header-font-family',
      'font-bold',
      'leading-normal',
      'text-component-section-title',
    ],
    descriptionText: [
      'font-typography-body-font-family',
      'font-normal',
      'leading-normal',
      'text-component-section-body',
      'text-typography-body-large-font-size',
    ],
    actionButtonWrapper: ['flex', 'flex-col', 'md:flex-row'],
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
    style: {
      link: {
        cta: [
          'flex',
          'items-center',
          'gap-2',
          'text-base',
          // TODO: NEED TO UPDAT FIGMA TOKENS.
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
  },
});
