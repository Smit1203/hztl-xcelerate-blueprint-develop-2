import { InlineIFrameProps } from 'components/authorable/shared/media/InlineIFrame';

const defaultData: InlineIFrameProps = {
  fields: {
    embedUrl: { value: 'https://example.com' },
    title: { value: 'Example IFrame' },
  },
  params: {
    width: '100%',
    height: '500px',
    aspectRatio: '16/9',
  },
  rendering: {
    componentName: 'InlineIFrame',
    dataSource: '/mock/data/source',
  },
};

export const noEmbedUrl: InlineIFrameProps = {
  ...defaultData,
  fields: {
    ...defaultData.fields,
    embedUrl: { value: '' },
  },
};

export const customDimensions: InlineIFrameProps = {
  ...defaultData,
  params: {
    width: '800px',
    height: '600px',
    aspectRatio: '4/3',
  },
};

export default defaultData;
