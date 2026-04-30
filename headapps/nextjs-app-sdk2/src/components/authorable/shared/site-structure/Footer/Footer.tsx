import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import { Field, ImageField, LinkField, RichTextField } from '@sitecore-content-sdk/nextjs';

import { ComponentProps } from 'lib/component-props';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { getTestProps } from 'lib/testing/utils';
import { ReplacementToken } from 'lib/utils/string-utils';
import { SvgImageWrapper } from 'helpers/SitecoreWrappers/SvgImageWrapper/SvgImageWrapper';

type GenericLinkItem = {
  id?: string;
  fields?: {
    link?: LinkField;
  };
};

type FooterColumnItem = {
  id?: string;
  fields?: {
    columnHeader?: Field<string>;
    columnLinks?: GenericLinkItem[];
  };
};

type SocialMediaItem = {
  id?: string;
  fields?: {
    socialMediaLink?: LinkField;
    socialMediaLogo?: ImageField;
  };
};

type FooterProps = ComponentProps & {
  fields?: {
    footerColumns?: FooterColumnItem[];
    footerLogo?: ImageField;
    footerLogoLink?: LinkField;
    footerDescription?: RichTextField;
    copyrightText?: RichTextField;
    socialMediaLinks?: SocialMediaItem[];
  };
};

export const Default = (props: FooterProps): JSX.Element => {
  const { RenderingIdentifier } = props?.params || {};
  const footerColumns = props.fields?.footerColumns;
  const footerLogo = props.fields?.footerLogo;
  const footerLogoLink = props.fields?.footerLogoLink;
  const footerDescription = props?.fields?.footerDescription;
  const copyRightText = props?.fields?.copyrightText;
  const socialMediaLinks = props?.fields?.socialMediaLinks;

  const footerTokens: ReplacementToken[] = [
    { key: '{{year}}', value: new Date().getFullYear().toString() },
  ];

  if (!props.fields) return <></>;

  const extendedTailwindVariants = tv({
    extend: TAILWIND_VARIANTS,
    slots: {
      base: [props?.params?.styles],
    },
  });

  const {
    base,
    contentContainer,
    linkListContainer,
    linkListItem,
    linkListLink,
    linkListTitle,
    logoContainer,
    logoDescription,
    linkListText,
    footerSocialLinksSection,
    footerSectionWrapper,
    copyRightTextStyle,
    socialMediaLinkWrapper,
    socialMediaImageWrapper,
    socialIconImage,
    navContainer,
  } = extendedTailwindVariants();

  return (
    <div
      data-component="authorable/shared/site-structure/footer/footer"
      id={RenderingIdentifier}
      {...getTestProps(`component-footer-` + props?.rendering?.uid)}
      className={base()}
    >
      <div className={contentContainer()}>
        <div className={logoContainer()}>
          <LinkWrapper
            ctaComponentClass="default"
            {...getTestProps(`footer-logo`)}
            field={footerLogoLink}
          >
            <ImageWrapper field={footerLogo} />
          </LinkWrapper>
          <div>
            <RichTextWrapper
              {...getTestProps(`footer-description`)}
              className={logoDescription()}
              field={footerDescription}
              tag="p"
            />
          </div>
        </div>
        <div className={linkListContainer()}>
          {footerColumns?.map((groupLabel) => {
            const links = groupLabel?.fields?.columnLinks;
            return (
              <ul className={navContainer()} key={groupLabel?.id}>
                <li className={linkListItem()}>
                  <PlainTextWrapper
                    {...getTestProps(`footer-nav-header`)}
                    className={linkListTitle()}
                    field={groupLabel?.fields?.columnHeader}
                    tag="h3"
                  />
                </li>
                {links?.map((link) => (
                  <li className={linkListItem()} key={link?.id}>
                    <LinkWrapper
                      ctaComponentClass="default"
                      {...getTestProps(`footer-nav-link`)}
                      className={linkListLink()}
                      field={link?.fields?.link}
                    >
                      <span className={linkListText()}>{link?.fields?.link?.value?.text}</span>
                    </LinkWrapper>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>
      <div className={footerSectionWrapper()}>
        <div className={footerSocialLinksSection()}>
          <RichTextWrapper
            {...getTestProps('copyright-info')}
            className={copyRightTextStyle()}
            field={copyRightText}
            tag="p"
            tokens={footerTokens}
          />
          <ul className={socialMediaLinkWrapper()} {...getTestProps(`social-media`)}>
            {socialMediaLinks?.map((socialMediaLink) => {
              const link = socialMediaLink?.fields?.socialMediaLink;
              const iconURL = socialMediaLink?.fields?.socialMediaLogo?.value?.src || '';
              return (
                <li key={socialMediaLink?.id}>
                  <LinkWrapper
                    ctaComponentClass="default"
                    {...getTestProps(`social-media-link`)}
                    className={socialMediaImageWrapper()}
                    field={link}
                    suppressNewTabIcon={true}
                  >
                    <SvgImageWrapper
                      className={socialIconImage()}
                      src={iconURL}
                      alt={
                        (socialMediaLink?.fields?.socialMediaLogo?.value?.alt as string) ||
                        'Social media icon'
                      }
                    />
                  </LinkWrapper>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Default;

const TAILWIND_VARIANTS = tv({
  slots: {
    base: [
      'w-full',
      'bg-component-footer-bg',
      'border-t',
      'border-t-border-width-width-025',
      'border-t-solid',
      'border-t-color-component-footer-top-border',
    ],
    contentContainer: [
      'flex',
      'flex-col',
      'gap-spacing-spacing-64',
      'lg:flex',
      'lg:flex-row',
      'lg:gap-spacing-spacing-64',
      'lg:pt-spacing-spacing-64',
      'py-spacing-spacing-48',
      'lg:col-span-4',
      'm-auto',
      'max-w-screen-dimensions-max-width',
      'min-w-screen-dimensions-min-width',
      'px-general-spacing-margin-x',
      'py-spacing-spacing-24',
    ],
    linkListContainer: [
      'gap-spacing-spacing-32',
      'lg:flex',
      'flex-1',
      'lg:flex-nowrap',
      'flex-wrap',
      'items-start',
      'self-stretch',
      'lg:basis-1/2',
      'lg:justify-end',
      'grid',
      'grid-cols-2',
      'lg:grid-cols-none',
    ],
    navContainer: ['w-full'],
    linkListItem: ['first:pb-1', 'first:pt-0', 'group', 'pt-3'],
    linkListLink: [
      'flex',
      'items-center',
      '!text-component-footer-link-text',
      'hover:!text-component-footer-link-text-hover',
      'hover:underline',
    ],
    linkListText: [
      'font-typography-body-medium-sb-font-weight',
      'text-typography-body-medium-font-size',
      'leading-typography-line-height-body-medium',
      'text-component-footer-link-text',
      'group-hover:text-component-footer-link-text-hover',
      'flex',
      'gap-spacing-spacing-8',
      'items-center',
    ],
    linkListTitle: [
      'font-semibold',
      'text-typography-body-small-font-size',
      'text-component-footer-category-label',
      'leading-typography-line-height-body-small',
    ],
    svgIconClass: ['scale-x-0', '!h-5', '!w-5', 'fill-current'],
    logoContainer: ['lg:w-1/4', 'flex', 'flex-col', 'gap-6'],
    logoDescription: [
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'font-typography-body-small-font-weight',
      'leading-typography-line-height-body-medium',
      'text-component-footer-description-text',
    ],
    footerSectionWrapper: ['w-full', 'py-10', 'lg:py-12', 'bg-component-footer-utility-bg'],
    footerSocialLinksSection: [
      'm-auto',
      'lg:items-center',
      'flex',
      'flex-col-reverse',
      'lg:flex-row',
      'gap-spacing-spacing-32',
      'justify-between',
      'max-w-screen-dimensions-max-width',
      'min-w-screen-dimensions-min-width',
      'px-general-spacing-margin-x',
      'py-spacing-spacing-24',
    ],
    copyRightTextStyle: [
      'font-typography-body-small-font-weight',
      'text-typography-body-medium-font-size',
      'text-component-footer-legal-text',
    ],
    socialMediaLinkWrapper: ['flex', 'gap-6', 'items-center'],
    socialMediaImageWrapper: ['!w-6', 'block', 'group'],
    socialIconImage: [
      'w-6',
      'h-6',
      'fill-component-footer-social-icon',
      'group-hover:fill-component-footer-social-icon-hover',
    ],
  },
});
