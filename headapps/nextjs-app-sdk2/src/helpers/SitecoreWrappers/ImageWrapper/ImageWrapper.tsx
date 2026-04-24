'use client';

import { Image as JSSImage, ImageField } from '@sitecore-content-sdk/nextjs';
import NextImage, { ImageProps } from 'next/image';
import { JSX } from 'react';

import { isValidNextImageDomain } from 'lib/next-config/plugins/images';
import { parseUrlObject } from 'lib/utils/string-utils';
import useIsEditing from 'lib/hooks/useIsEditing';
import { useFieldWithFallbacks } from 'lib/hooks/useFieldWithFallbacks';

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

  if (!renderField) return <></>;

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
  if (!newSrc) return <></>;

  const nextImageProps: ImageProps = {
    alt: (alt as string) || '',
    className,
    priority,
    sizes,
    src: newSrc,
  };

  if (layout === 'responsive') {
    nextImageProps.sizes = '100vw';
    nextImageProps.style = { width: '100%', height: 'auto' };
  }

  if (layout === 'fill') {
    nextImageProps.fill = true;
  } else {
    nextImageProps.height = height as number;
    nextImageProps.width = width as number;
  }

  if (!nextImageProps.fill && !nextImageProps.width) {
    const newField = structuredClone(renderField);
    newField.value = { ...newField.value, src: newSrc };
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

export function normalizeImageUrl(src: string | undefined) {
  let newSrc = src;
  if (src) {
    const imageUrl = parseUrlObject(src);
    if (imageUrl?.pathname.startsWith('/-/media/')) {
      newSrc = src.replace(imageUrl.origin, process.env.NEXT_PUBLIC_SITECORE_API_HOST ?? '');
    }
  }
  return newSrc;
}
