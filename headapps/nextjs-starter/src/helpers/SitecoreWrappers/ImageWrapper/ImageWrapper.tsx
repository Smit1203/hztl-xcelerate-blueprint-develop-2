// SEE: https://nextjs.org/docs/app/api-reference/components/image
// SEE: https://refine.dev/blog/using-next-image/#src

// Global
import { Image as JSSImage, ImageField } from '@sitecore-content-sdk/nextjs';
import NextImage, { ImageProps } from 'next/image';
import { JSX } from 'react';
// Lib
import { isValidNextImageDomain } from 'lib/next-config/plugins/images';
import { parseUrlObject } from 'lib/utils/string-utils';
import useIsEditing from 'lib/hooks/useIsEditing';
import { useFieldWithFallbacks } from 'lib/hooks/useFieldWithFallbacks';

/**
 * JSS does not yet support Next Image in Experience Editor
 * This component will switch between the two based on environment
 * which allows us to get the various performance benefits from Next Image.
 *
 * NOTE: Images may display slightly differently in
 * Experience Editor as the JSS Image component doesn't have the same layout options.
 */

interface SizedImageFieldProps extends ImageField {
  value?: {
    alt?: string;
    height: number | `${number}`;
    src?: string;
    width: number | `${number}`;
  };
}

export interface ImageWrapperProps {
  className?: string;
  editable?: boolean;
  field?: SizedImageFieldProps | ImageField;
  fallbacks?: (SizedImageFieldProps | ImageField | undefined)[];
  layout?: NextImageLayoutOption;
  priority?: boolean;
  sizes?: string;
}

type NextImageLayoutOption = 'fill' | 'intrinsic' | 'responsive';

const ImageWrapper = ({
  className,
  editable,
  field,
  fallbacks,
  layout = 'intrinsic',
  priority,
  sizes = '100vw',
}: ImageWrapperProps): JSX.Element => {
  const isEditing = useIsEditing();

  const { renderField } = useFieldWithFallbacks(field, fallbacks);

  // If there's no field, don't render anything. This should only be the case
  // if the field itself is undefined, which should only happen if code is deployed
  // before data templates are published, so this is just a safety check
  if (!renderField) {
    return <></>;
  }

  const { alt, height, src, width } = renderField?.value || {};

  if (isEditing) {
    return (
      <JSSImage
        data-component="helpers/fieldwrappers/imagewrapper"
        editable={editable}
        field={renderField}
        className={className}
      />
    );
  }

  const newSrc = normalizeImageUrl(src);

  if (!newSrc) {
    // If there's no src, only render it if we're in editing mode.

    return <></>;
  }

  const nextImageProps: ImageProps = {
    alt: (alt as string) || '',
    className: className,
    priority,
    sizes,
    src: newSrc,
  };

  // Remove layout and update with new usage based on NextImage in Next 13+
  if (layout === 'responsive') {
    nextImageProps.sizes = '100vw';
    nextImageProps.style = {
      width: '100%',
      height: 'auto',
    };
  }

  if (layout === 'fill') {
    nextImageProps.fill = true;
  } else {
    nextImageProps.height = height as number;
    nextImageProps.width = width as number;
  }

  // for images that are missing width property.
  if (!nextImageProps.fill && !nextImageProps.width) {
    // Copy the field instead of updating the original
    const newField = structuredClone(renderField);

    newField.value = {
      ...newField.value,
      src: newSrc,
    };
    return (
      <JSSImage
        {...nextImageProps}
        data-component="helpers/fieldwrappers/imagewrapper"
        field={newField}
      />
    );
  }
  const isValidDomain = isValidNextImageDomain(newSrc);

  return (
    <NextImage
      data-component="helpers/fieldwrappers/imagewrapper"
      {...nextImageProps}
      unoptimized={!isValidDomain}
    />
  );
};

export default ImageWrapper;

/**
 * To support preview site we normalize media urls to strip out the domain if it is coming from Sitecore.
 */

export function normalizeImageUrl(src: string | undefined) {
  let newSrc = src;

  if (src) {
    const imageUrl = parseUrlObject(src);

    // If we're using the preview endpoint, replace the domain
    if (imageUrl?.pathname.startsWith('/-/media/')) {
      // `process.env.SITECORE_API_HOST` is only exposed for localhost.
      // In localhost XMC throws an error proxying from http to https, so we
      // need to use the SITECORE_API_HOST directly.
      // Otherwise we can just remove the domain and it will resolve correctly,
      // either on CM directly, or it will be proxied to the CM via the rewrite rule
      newSrc = src.replace(imageUrl.origin, process.env.NEXT_PUBLIC_SITECORE_API_HOST ?? '');
    }
  }

  return newSrc;
}
