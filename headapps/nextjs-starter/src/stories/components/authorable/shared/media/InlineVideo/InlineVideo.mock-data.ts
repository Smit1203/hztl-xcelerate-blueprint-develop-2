import { InlineVideoProps } from 'components/authorable/shared/media/InlineVideo';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: InlineVideoProps = createComponentMockData<InlineVideoProps>(
  'InlineVideo',
  {
    title: {
      value: 'This is the title',
    },
    url: {
      value: 'https://youtu.be/3tKJ29jNxX0?si=Ob6FH9VwM7azoS0h',
    },
    height: {
      value: 'auto',
    },
    width: {
      value: '600px',
    },
  },
  {
    DynamicPlaceholderId: '11',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
  }
);

export const vimeoData: InlineVideoProps = createComponentMockData<InlineVideoProps>(
  'InlineVideo',
  {
    title: {
      value: 'This is the title',
    },
    url: {
      value: 'https://vimeo.com/46926279',
    },
    height: {
      value: 'auto',
    },
    width: {
      value: '100%',
    },
  },
  {
    DynamicPlaceholderId: '11',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
  }
);

export const noData = {
  params: [],
  rnder: {},
};

export default defaultData;
