import { VideoWrapperProps } from 'helpers/GenericWrappers/VideoWrapper/VideoWrapper';

const defaultData: VideoWrapperProps = {
  autoplay: false,
  captions: [],
  controls: true,
  fluid: true,
  height: 'auto',
  loop: false,
  muted: false,
  poster: './assets/videos/oceans.png',
  sources: [
    {
      src: './assets/videos/oceans.mp4',
      type: 'video/mp4',
    },
  ],
  subtitles: [],
  width: '600px',
};

export const videoWithA11yFeatures: VideoWrapperProps = {
  ...defaultData,
  captions: [
    {
      isDefault: true,
      kind: 'captions',
      label: 'English',
      srclang: 'en',
      src: './assets/videos/sintel-captions-en.vtt',
    },
  ],
  poster: './assets/videos/sintel-short.png',
  sources: [
    {
      src: './assets/videos/sintel-short.mp4',
      type: 'video/mp4',
    },
  ],
  subtitles: [
    {
      isDefault: false,
      kind: 'subtitles',
      label: 'Deutsch',
      srclang: 'de',
      src: './assets/videos/sintel-subtitles-de.vtt',
    },
    {
      isDefault: true,
      kind: 'subtitles',
      label: 'English',
      srclang: 'en',
      src: './assets/videos/sintel-subtitles-en.vtt',
    },
    {
      isDefault: false,
      kind: 'subtitles',
      label: 'Español',
      srclang: 'es',
      src: './assets/videos/sintel-subtitles-es.vtt',
    },
  ],
};

export const videoWithYouTubeSource: VideoWrapperProps = {
  ...defaultData,
  poster: './assets/videos/njX2bu-_Vw4.jpg',
  sources: [
    {
      src: 'https://www.youtube.com/watch?v=njX2bu-_Vw4',
      type: 'video/youtube',
    },
  ],
};

export default defaultData;
