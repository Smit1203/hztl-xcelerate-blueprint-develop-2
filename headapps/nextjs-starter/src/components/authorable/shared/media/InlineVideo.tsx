'use client';

// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
// Local
import { Media } from '.generated/Media/InlineVideo.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import useDictionary from 'lib/hooks/useDictionary';
import { useVideoWidth } from 'lib/hooks/useVideoWidth';
import { getVideoPlatform, getYouTubeEmbedUrl, getVimeoUrl } from 'lib/utils/videoUtils';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import { getTestProps } from 'lib/testing/utils';

export type InlineVideoProps = Media.InlineVideo.InlineVideo_Component;

const DEFAULT_VIDEO_HEIGHT = 500;

/*
 * RENDERING
 */

const InlineVideo = (props: InlineVideoProps): JSX.Element => {
  const { height, width, url, title } = props?.fields || {};
  const { getDictionaryValue } = useDictionary();
  const videoWidth = `${width?.value}` || 'auto';
  const videoHeight = `${height?.value}` || `${DEFAULT_VIDEO_HEIGHT}`;
  const { videoWrapper, videoIframeStyle } = TAILWIND_VARIANTS();

  const { containerRef, calculatedWidth, calculatedHeight, isFullWidth } = useVideoWidth({
    width: videoWidth,
    height: videoHeight,
  });

  if (!url?.value)
    return (
      <div data-component="authorable/shared/media/inlinevideo" className="video">
        <EditingHelpText priority="warning">
          {getDictionaryValue('VideoUnavailable') || 'No video url is present'}
        </EditingHelpText>
      </div>
    );

  const videoUrl =
    getVideoPlatform(url?.value || '') === 'youtube'
      ? getYouTubeEmbedUrl(url?.value)
      : getVimeoUrl(url?.value);

  const widthInString = isFullWidth ? calculatedWidth : `${calculatedWidth}px`;
  const heightInString = isFullWidth ? calculatedHeight : `${calculatedHeight}px`;
  return (
    <section
      data-component="authorable/shared/media/inlinevideo"
      ref={containerRef}
      {...getTestProps(`component-inline-video-${props?.rendering?.uid}`)}
    >
      <div style={{ width: widthInString, height: heightInString }} className={videoWrapper()}>
        <iframe
          src={videoUrl}
          width={calculatedWidth}
          height={calculatedHeight}
          title={title?.value}
          className={videoIframeStyle({ isFullWidthVimeo: isFullWidth })}
          allowFullScreen
          style={{
            aspectRatio: 16 / 9,
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-presentation"
          {...getTestProps(`video`)}
        ></iframe>
      </div>
    </section>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    videoWrapper: ['relative', 'aspect-video', 'mx-auto'],
    videoIframeStyle: ['mx-auto'],
  },
  variants: {
    isFullWidthVimeo: {
      true: {
        videoIframeStyle: ['absolute', 'inset-0', 'w-full', 'h-full'],
      },
    },
  },
});

export const Default = withStandardComponentWrapper(InlineVideo);
