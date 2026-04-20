'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import { Field } from '@sitecore-content-sdk/nextjs';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { Lists } from '.generated/Lists/FileList.model';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { SvgIcon } from 'helpers/SvgIcon';
import { BrandAndThemeProvider } from 'lib/context/BrandAndThemeContext';
import { Themes } from 'helpers/Constants/Constant';
import { getTestProps } from 'lib/testing/utils';

export type FileListProps = Lists.FileList.FileList_Component;

interface MediaItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Description?: Field<string>;
    Extension?: Field<string>;
    Keywords?: Field<string>;
    Size?: Field<string>;
    Title?: Field<string>;
  };
}

const FileList = (props: FileListProps): JSX.Element => {
  const { RenderingIdentifier } = props?.params || {};
  const { headline, description, ctaLink, selectFiles } = props?.fields || {};
  const theme = props?.params?.selectTheme as Themes;

  // Helper function to format file size
  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  /*
   * Rendering
   */

  const {
    container,
    list,
    item,
    fileIcon,
    fileInfo,
    fileSize,
    headlineText,
    descriptionText,
    ctaLinkText,
    ctaWrapper,
    rightSection,
    fileDisplayName,
    fileTypeIcon,
    anchor,
  } = TAILWIND_VARIANTS();

  return (
    <section
      data-component="authorable/shared/lists/filelist"
      id={RenderingIdentifier}
      aria-label="Downloadable files"
      {...getTestProps(`component-file-list-${props?.rendering?.uid}`)}
    >
      <BrandAndThemeProvider theme={theme}>
        <div className={container()}>
          <div>
            <PlainTextWrapper
              editable
              field={headline}
              tag="h2"
              className={headlineText()}
              {...getTestProps(`headline`)}
            />
            <RichTextWrapper
              field={description}
              className={descriptionText()}
              {...getTestProps(`description`)}
            />
            <div className={ctaWrapper()}>
              <LinkWrapper
                ctaVariant="primary"
                ctaComponentClass="component-file-list-button-color-1"
                field={ctaLink}
                className={ctaLinkText()}
                {...getTestProps(`cta`)}
              />
            </div>
          </div>
          {selectFiles ? (
            <ul className={list()}>
              {selectFiles.map((fl: MediaItem, _index: number) => (
                <li key={fl.id} className={item()}>
                  <a
                    href={fl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={anchor()}
                    aria-label={`Download ${fl.displayName}${fl.fields.Size?.value ? ` (${formatFileSize(Number(fl.fields.Size.value))})` : ''}${fl.fields.Extension?.value ? ` - ${fl.fields.Extension.value.toUpperCase()} file` : ''}`}
                    {...getTestProps(`file-link-${_index}`)}
                  >
                    <div className={fileInfo()}>
                      <SvgIcon
                        icon="file-download"
                        size="xs"
                        className={fileTypeIcon()}
                        aria-hidden="true"
                      />
                      <span className={fileDisplayName()} {...getTestProps(`file-name-${_index}`)}>
                        {fl.displayName}
                      </span>
                    </div>
                    <div className={rightSection()}>
                      <span className={fileSize()} {...getTestProps(`file-size-${_index}`)}>
                        {fl.fields.Size?.value && formatFileSize(Number(fl.fields.Size.value))}
                      </span>
                      {fl.fields.Size?.value && fl.fields.Extension?.value && ' '}
                      <span
                        className={fileIcon()}
                        aria-label={`File type: ${fl.fields.Extension?.value?.toUpperCase()}`}
                        {...getTestProps(`file-extension-${_index}`)}
                      >
                        {fl.fields.Extension?.value && fl.fields.Extension.value.toUpperCase()}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </BrandAndThemeProvider>
    </section>
  );
};

export const Default = withStandardComponentWrapper(FileList, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    container: [
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'gap-x-space-between-more',
      'gap-y-4',
      'p-spacing-spacing-32',
      'py-component-section-container-padding-y',
      'px-component-section-container-padding-x',
      'bg-component-file-list-bg',
    ],
    list: ['flex', 'flex-col', 'gap-spacing-spacing-8', 'md:gap-spacing-spacing-16'],
    anchor: ['flex', 'items-center', 'justify-between', 'w-full', 'group', 'p-spacing-spacing-16'],
    item: [
      'bg-component-file-list-card-fill',
      'text-component-file-list-card-text',
      'border-component-file-list-card-border',
      'rounded-component-file-list-card-border-radius',
      'border',
      'transition-colors',
      'duration-200',
      'hover:border-color-text-text-brand',
      'gap-spacing-spacing-16',
    ],
    headlineText: [
      'font-bold',
      'text-component-file-list-title',
      'text-typography-header-xlarge-font-size',
      'leading-typography-line-height-xlarge',
      'font-typography-header-font-family',
      'leading-tight',
      'mb-general-spacing-title-margin-bottom',
      'not-italic',
    ],
    descriptionText: [
      'text-component-file-list-body',
      'font-typography-body-font-family',
      'text-typography-body-large-font-size',
      'font-normal',
      'not-italic',
      'leading-typography-line-height-body-large',
      'mb-general-spacing-copy-margin-bottom',
    ],
    ctaWrapper: ['flex', 'justify-start'],
    ctaLinkText: ['mt-2'],
    fileInfo: ['flex', 'flex-row', 'items-center'],
    fileTypeIcon: [
      'flex-shrink-0',
      'mr-2',
      'text-typography-body-small-font-size',
      'text-color-text-text-brand',
    ],
    fileDisplayName: [
      'font-bold',
      'group-hover:text-blue-600',
      'text-typography-body-small-font-size',
      'text-color-text-text-brand',
      'underline',
    ],
    rightSection: [
      'flex',
      'items-center',
      'gap-4',
      'text-typography-body-small-font-size',
      'text-color-text-text-secondary',
    ],
    fileSize: [
      'font-typography-body-font-family',
      'text-typography-body-small-font-size',
      'text-color-text-text-secondary',
    ],
    fileIcon: ['text-typography-body-small-font-size', 'text-color-text-text-secondary'],
  },
});
