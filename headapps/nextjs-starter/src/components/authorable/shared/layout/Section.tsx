'use client';

// Global
import React, { JSX } from 'react';
// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { Layout } from '.generated/Layout/Section.model';
import { tv } from 'tailwind-variants';
import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';
import { Themes } from 'helpers/Constants/Constant';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { TextAlignmentProvider, TextAlignment } from 'lib/context/TextAlignmentContext';
import { getTestProps } from 'lib/testing/utils';

export type SectionProps = Layout.Section.Section_Component;
export type SectionParametersProps = Layout.Section.SectionParameters_Component;

const Section = (props: SectionProps): JSX.Element => {
  const { DynamicPlaceholderId, RenderingIdentifier } = props?.params || {};
  const {
    title,
    description,
    removePaddingTop,
    removePaddingBottom,
    removePaddingLeftRight,
    displayCenter75,
  } = props?.fields || {};

  const theme = props?.params?.selectTheme as Themes;
  const textAlignment = (props?.params?.alignment as TextAlignment) || 'Left';
  const hasContent = Boolean(title?.value || description?.value);
  const noPaddingTop = Boolean(removePaddingTop?.value);
  const noPaddingBottom = Boolean(removePaddingBottom?.value);
  const noPaddingSides = Boolean(removePaddingLeftRight?.value);
  const isCentered75 = Boolean(displayCenter75?.value);

  const phKey = `section-${DynamicPlaceholderId}`;

  const { base, sectionTitle, sectionDescription, sectionContentWrapper, sectionHeaderWrapper } =
    TAILWIND_VARIANTS({
      textAlignment,
    });

  /*
   * RENDERING
   */

  return (
    <div
      data-component="authorable/shared/layout/section"
      id={RenderingIdentifier}
      {...getTestProps(`component-section-${props?.rendering?.uid}`)}
    >
      <BrandAndThemeProvider theme={theme}>
        <TextAlignmentProvider textAlignment={textAlignment}>
          <div
            className={base({
              textAlignment,
              removePaddingTop: noPaddingTop,
              removePaddingBottom: noPaddingBottom,
              removePaddingLeftRight: noPaddingSides,
            })}
          >
            <div
              className={sectionContentWrapper({
                hasContent,
                displayCenter75: isCentered75,
              })}
            >
              <div className={sectionHeaderWrapper()}>
                <PlainTextWrapper className={sectionTitle()} field={title} tag="h2" />
                <span className={sectionDescription()}>
                  <PlainTextWrapper field={description} />
                </span>
              </div>
              <PlaceholderWrapper name={phKey} rendering={props.rendering} />
            </div>
          </div>
        </TextAlignmentProvider>
      </BrandAndThemeProvider>
    </div>
  );
};

export const Default = withStandardComponentWrapper(Section, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      'flex',
      'bg-component-section-bg',
      'gap-component-section-container-gutter',
      'rounded-general-border-radius-wrapper-container',
      'flex-wrap',
    ],
    sectionTitle: [
      'text-component-section-title',
      'font-typography-header-font-family',
      'text-typography-header-large-font-size',
      'font-bold',
      'leading-tight',
    ],
    sectionDescription: [
      'text-component-section-body',
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'leading-normal',
    ],
    sectionContentWrapper: ['flex', 'flex-col', 'w-full', 'h-auto'],
    sectionHeaderWrapper: [
      'flex',
      'flex-col',
      'gap-general-spacing-title-margin-bottom',
      'max-w-columns-two-third-max-width',
    ],
  },
  variants: {
    textAlignment: {
      Left: {
        base: 'text-left',
      },
      Center: {
        base: 'text-center',
        sectionHeaderWrapper: 'mx-auto',
      },
      Right: {
        base: 'text-right',
      },
    },
    hasContent: {
      true: {
        sectionContentWrapper: 'gap-space-between-more',
      },
      false: {
        sectionContentWrapper: 'gap-0',
      },
    },
    removePaddingTop: {
      true: {
        base: ['pt-0'],
      },
      false: {
        base: ['pt-component-section-container-padding-y'],
      },
    },
    removePaddingBottom: {
      true: {
        base: ['pb-0'],
      },
      false: {
        base: ['pb-component-section-container-padding-y'],
      },
    },
    removePaddingLeftRight: {
      true: {
        base: [],
      },
      false: {
        base: ['px-component-section-container-padding-x'],
      },
    },
    displayCenter75: {
      true: {
        sectionContentWrapper: ['max-w-layout-container-center70-max-width', 'mx-auto'],
      },
      false: {
        sectionContentWrapper: [],
      },
    },
  },
  defaultVariants: {
    textAlignment: 'Left',
    hasContent: false,
    removePaddingTop: false,
    removePaddingBottom: false,
    removePaddingLeftRight: false,
    displayCenter75: false,
  },
});
