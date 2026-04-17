import { VideoType } from 'helpers/Constants/Constant';

// Utility to extract Vimeo video ID
export const getVimeoId = (url: string): string | null => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

// Check video type.
export const getVideoPlatform = (url: string): VideoType => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return 'youtube';
    }

    if (hostname.includes('vimeo.com')) {
      return 'vimeo';
    }

    return undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const getYouTubeEmbedUrl = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
};

export const getVimeoUrl = (url: string): string => {
  const videoId = getVimeoId(url || '');
  return `https://player.vimeo.com/video/${videoId}`;
};

// Enhanced version for modal with autoplay
export const getYouTubeEmbedUrlWithAutoplay = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : url;
};

export const getVimeoUrlWithAutoplay = (url: string): string => {
  const videoId = getVimeoId(url || '');
  return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
};

// Generic function to get processed video URL with autoplay
export const getProcessedVideoUrl = (url: string): string => {
  if (!url) return '';

  const platform = getVideoPlatform(url);

  switch (platform) {
    case 'youtube':
      return getYouTubeEmbedUrlWithAutoplay(url);
    case 'vimeo':
      return getVimeoUrlWithAutoplay(url);
    default:
      return url;
  }
};
