import { FeatureProps } from 'components/authorable/shared/content/Feature';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData = createComponentMockData<FeatureProps>(
  'Feature',
  {
    background: {
      value: {
        src: './assets/feature-promo-image.png',
        alt: 'Feature',
        width: '1680',
        height: '704',
      },
    },
    subHeadline: {
      value: 'This is a Sub-Headline',
    },
    cta1Link: {
      value: {
        href: 'https://hztl-blueprint-brandx-dev.vercel.app/',
        text: 'Button 1',
        linktype: 'external',
        target: '_blank',
      },
    },
    headline: {
      value: 'This is a Headline',
    },
    description: {
      value: 'This is Description.',
    },
    cta2Link: {
      value: {
        href: '/',
        text: 'Button 2',
        linktype: 'internal',
        target: '',
      },
    },
    eyebrow: {
      value: 'Eyebrow test',
    },
    icon: {
      value: {
        src: './assets/hztl_logo.png',
      },
    },
  },
  {
    background: 'Default',
    alignment: 'Center',
    layout: 'Full',
    GridParameters: 'basis-full',
    DynamicPlaceholderId: '2',
    FieldNames: 'Default',
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta2:ctaVariant:secondary cta2:ctaIcon:download',
  }
);

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
