'use client';

// Global
import React, { useEffect, JSX } from 'react';
import videojs from 'video.js';
import 'videojs-youtube';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

export type Source = {
  src?: string;
  type?: string;
};

export type Track = {
  isDefault?: boolean;
  kind?: string;
  label?: string;
  srclang?: string;
  src?: string;
};

type VideoJSProps = {
  onReady?: (player: Player) => void;
  options: {
    autoplay?: boolean;
    controls?: boolean;
    fluid?: boolean;
    height?: number | string;
    loop?: boolean;
    muted?: boolean;
    poster?: string;
    sources: Source[];
    tracks: Track[];
    width?: number | string;
    youtubeVideoId?: string;
  };
};

export type VideoWrapperProps = {
  autoplay?: boolean;
  captions: Track[];
  controls?: boolean;
  fluid?: boolean;
  height?: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  sources: Source[];
  subtitles: Track[];
  width?: string;
};

/*
 * RENDERING
 */

const VideoJS = (props: VideoJSProps) => {
  const playerRef = React.useRef<Player | null>(null);
  const videoRef = React.useRef<HTMLDivElement | null>(null);

  const { options, onReady } = props;

  // Initialize the Video.js player once and only once.
  useEffect(() => {
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');

      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        if (onReady) onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [onReady, options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();

        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

const VideoWrapper = (props: VideoWrapperProps): JSX.Element => {
  const {
    autoplay = false,
    captions = [],
    controls = true,
    fluid = true,
    height = 'auto',
    loop = false,
    muted = false,
    poster,
    sources,
    subtitles = [],
    width = '100%',
  } = props || {};

  return (
    <VideoJS
      options={{
        autoplay,
        controls,
        fluid,
        height,
        loop,
        muted,
        poster,
        sources,
        tracks: [...captions, ...subtitles],
        width,
      }}
    />
  );
};

export default VideoWrapper;
