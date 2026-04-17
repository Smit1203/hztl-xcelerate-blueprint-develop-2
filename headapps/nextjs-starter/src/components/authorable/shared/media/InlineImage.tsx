// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import { getImageProps } from 'next/image';
import { Image as JSSImage } from '@sitecore-content-sdk/nextjs';
// Local
import { Media } from '.generated/Media/InlineImage.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { normalizeImageUrl } from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import { isValidNextImageDomain } from 'lib/next-config/plugins/images';
import { useIsMobile } from 'lib/hooks/useIsMobile';
import useIsEditing from 'lib/hooks/useIsEditing';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';

export type InlineImageProps = Media.InlineImage.InlineImage_Component;

const InlineImage = (props: InlineImageProps): JSX.Element => {
  const { desktopImage, mobileImage, caption } = props?.fields || {};
  const isMobile = useIsMobile();
  const isEditing = useIsEditing();
  const { getDictionaryValue } = useDictionary();

  const { fallbackImage, caption: captionClass, imageContainer } = TAILWIND_VARIANTS();

  // Show placeholder in editing mode if no desktop image is provided
  // Desktop image is mandatory as it's the primary image and required for the component to render
  // Mobile image is optional and only used for responsive optimization on smaller screens
  if (isEditing && !desktopImage?.value?.src) {
    return (
      <>
        <EditingHelpText priority="warning">
          {getDictionaryValue('ImageUnavailable') ||
            'Select the entire InlineImage block to edit both desktop and mobile images.'}
        </EditingHelpText>
        <figure data-component="authorable/shared/media/inline-image">
          <div className={imageContainer()}>
            <JSSImage
              editable={true}
              field={desktopImage}
              className={fallbackImage()}
              alt="No image selected"
            />
          </div>
          <figcaption className={captionClass()}>
            <PlainTextWrapper field={caption} />
          </figcaption>
        </figure>
      </>
    );
  }

  // Don't render if no desktop image is provided
  if (!desktopImage?.value?.src) {
    return <></>;
  }

  // Use desktop image as fallback if mobile image is not provided
  const effectiveMobileImage = mobileImage?.value?.src ? mobileImage : desktopImage;

  // Don't render if effectiveMobileImage doesn't have valid value
  if (!effectiveMobileImage?.value?.src) {
    return <></>;
  }

  // Normalize image URLs and check domain validity
  const normalizedDesktopSrc = normalizeImageUrl(desktopImage.value.src as string);
  const normalizedMobileSrc = normalizeImageUrl(effectiveMobileImage.value.src as string);

  if (!normalizedDesktopSrc || !normalizedMobileSrc) {
    return <></>;
  }

  const isValidDomain = isValidNextImageDomain(normalizedDesktopSrc);

  // Helper function to safely convert string dimensions to numbers from sitecore
  const toDimension = (value: string | number | undefined, fallback: number): number => {
    const parsed = typeof value === 'number' ? value : parseInt(String(value || ''), 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  // Common props for both images (alt not needed since we handle it separately)
  const common = {
    alt: '', // Placeholder - actual alt text handled separately for responsive behavior
    unoptimized: !isValidDomain,
  };

  // Get optimized image props for both desktop and mobile images
  const {
    props: { srcSet: desktopSrcSet, ...desktopRest },
  } = getImageProps({
    ...common,
    src: normalizedDesktopSrc,
    width: toDimension(desktopImage.value.width as string | number, 1280),
    height: toDimension(desktopImage.value.height as string | number, 516),
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...common,
    src: normalizedMobileSrc,
    width: toDimension(effectiveMobileImage.value.width as string | number, 600),
    height: toDimension(effectiveMobileImage.value.height as string | number, 400),
  });

  // Determine which alt text to use based on screen size
  const altText = isMobile
    ? (effectiveMobileImage.value.alt as string) || ''
    : (desktopImage.value.alt as string) || '';

  return (
    <figure
      data-component="authorable/shared/media/inline-image"
      {...getTestProps(`component-inline-image-${props?.rendering?.uid}`)}
    >
      <picture>
        {/* Desktop Image - md+ screens */}
        <source
          media="(min-width: 768px)"
          srcSet={desktopSrcSet || normalizedDesktopSrc}
          {...getTestProps(`desktop-image`)}
        />

        {/* Mobile Image - <md screens */}
        <source
          media="(max-width: 767px)"
          srcSet={mobileSrcSet || normalizedMobileSrc}
          {...getTestProps(`mobile-image`)}
        />

        {/* Fallback image */}
        <img
          {...desktopRest}
          src={normalizedDesktopSrc}
          alt={altText}
          className={fallbackImage()}
          {...getTestProps(`fallback-image`)}
        />
      </picture>

      {/* Caption - PlainTextWrapper handles conditional rendering internally */}
      <figcaption className={captionClass()}>
        <PlainTextWrapper field={caption} {...getTestProps(`caption`)} />
      </figcaption>
    </figure>
  );
};

export const Default = withStandardComponentWrapper(InlineImage);

const TAILWIND_VARIANTS = tv({
  slots: {
    fallbackImage: ['max-w-full', 'h-auto', 'rounded-general-border-radius-image'],
    caption: ['mt-2', 'text-body-small', 'text-color-text-text-secondary', 'italic'],
    imageContainer: ['flex', 'flex-col', 'items-center'],
  },
});
