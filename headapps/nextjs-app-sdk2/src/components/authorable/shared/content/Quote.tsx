// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { Content } from '.generated/Content/Quote.model';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import { Themes } from 'helpers/Constants/Constant';
import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import { getTestProps } from 'lib/testing/utils';

export type QuoteProps = Content.Quote.Quote_Component;
export type QuoteParametersProps = Content.Quote.QuoteParameters_Component;

const Quote = (props: QuoteProps): JSX.Element => {
  const { title, name, description, image } = props?.fields || {};
  const theme = props?.params?.selectTheme as Themes;

  const {
    base,
    quoteWrapper,
    quoteTitle,
    quoteTypographyWrapper,
    quoteContentWrapper,
    imageStyle,
    nameStyle,
    descriptionStyle,
  } = TAILWIND_VARIANTS({});

  return (
    <section
      className={base()}
      data-component="authorable/shared/content/Quote"
      {...getTestProps(`component-quote-${props?.rendering?.uid}`)}
    >
      <BrandAndThemeProvider theme={theme}>
        <div className={quoteWrapper()}>
          <div className={quoteTypographyWrapper()}>
            <PlainTextWrapper
              className={quoteTitle()}
              field={title}
              tag="h2"
              {...getTestProps(`quote`)}
            />
            <div className={quoteContentWrapper()}>
              {image && (
                <ImageWrapper className={imageStyle()} field={image} {...getTestProps(`image`)} />
              )}
              <PlainTextWrapper
                className={nameStyle()}
                field={name}
                tag="h3"
                {...getTestProps(`name`)}
              />
              <RichTextWrapper
                className={descriptionStyle()}
                field={description}
                {...getTestProps(`description`)}
              />
            </div>
          </div>
        </div>
      </BrandAndThemeProvider>
    </section>
  );
};

export const Default = withStandardComponentWrapper(Quote);

export default Default;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['relative', 'w-full', 'max-w-columns-full-maxWidth'],
    quoteWrapper: [
      'py-general-spacing-margin-y',
      'px-general-spacing-margin-x',
      'bg-component-quote-bg',
      'w-full',
      'rounded-general-border-radius-wrapper-container',
      'overflow-hidden',
    ],
    quoteTypographyWrapper: [
      'flex',
      'flex-col',
      'items-center',
      'gap-general-spacing-copy-margin-bottom',
      'text-center',
      'text-component-quote-quote',
      'max-w-typography-copy-maxWidth',
    ],
    quoteTitle: [
      'text-component-quote-quote',
      'font-typography-header-font-family',
      'text-typography-header-large-font-size',
      'font-bold',
      'leading-[48px]',
    ],
    quoteContentWrapper: ['text-center', 'flex', 'flex-col', 'gap-spacing-spacing-12'],
    imageStyle: ['w-[64px]', 'h-[64px]', 'mx-auto', 'rounded-[200px]'],
    nameStyle: [
      'text-component-quote-name',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-bold',
    ],
    descriptionStyle: [
      'text-component-quote-details',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
    ],
  },
});
