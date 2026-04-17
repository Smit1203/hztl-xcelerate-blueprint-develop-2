// Global

// Local
import { VideoCardItemProps } from 'components/authorable/shared/lists/VideoCardItem';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: VideoCardItemProps = createComponentMockData<VideoCardItemProps>(
  'VideoCardItem',
  {
    videoUrl: {
      value: 'https://youtu.be/3tKJ29jNxX0?si=Ob6FH9VwM7azoS0h',
    },
    cardImage: {
      value: {
        src: 'https://placehold.co/1280x720',
        alt: 'Placeholder Image',
      },
    },
    eyebrow: {
      value: 'Video Eyebrow',
    },
    heading: {
      value: 'Video Card Title',
    },
    subHeading: {
      value: 'Subheading Text',
    },
    description: {
      value:
        'This is a description of the video. It can be a few sentences long to give the user an idea of what the video is about.',
    },
    cardLink1: {
      value: {
        href: '#',
        text: 'Primary Link',
      },
    },
    cardLink2: {
      value: {
        href: '#',
        text: 'Secondary Link',
      },
    },
  },
  {
    cta1: 'primary',
    cta2: 'secondary',
  }
);

export const noImage = createComponentMockData<VideoCardItemProps>('VideoCardItem', {
  ...(defaultData.fields as VideoCardItemProps['rendering']['fields']),
  cardImage: {
    value: {},
  },
});

export const vimeoVideo = createComponentMockData<VideoCardItemProps>('VideoCardItem', {
  ...(defaultData.fields as VideoCardItemProps['rendering']['fields']),
  videoUrl: {
    value: 'https://vimeo.com/565486457',
  },
});

export default defaultData;
