import { QuoteProps } from 'components/authorable/shared/content/Quote';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData = createComponentMockData<QuoteProps>('Quote', {
  title: {
    value: 'This is a Title',
  },
  description: {
    value: 'This is Description.',
  },
  name: {
    value: 'John Doe',
  },
  image: {
    value: {
      src: './assets/female-profile-image.png',
      alt: 'female-profile-png-computer-icons',
      width: '900',
      height: '720',
    },
  },
});

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
