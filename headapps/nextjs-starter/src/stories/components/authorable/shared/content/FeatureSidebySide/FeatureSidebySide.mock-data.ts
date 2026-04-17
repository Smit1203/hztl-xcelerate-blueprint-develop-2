import { FeatureSidebySideProps } from 'components/authorable/shared/content/FeatureSidebySide';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData = createComponentMockData<FeatureSidebySideProps>(
  'FeatureSidebySide',
  {
    image: {
      value: {
        src: 'https://dummyimage.com/760x760/cfcdc8/2f2d2e',
        alt: 'Feature side by side image',
        width: '760',
        height: '760',
      },
    },
    description: {
      value:
        'Discover innovative solutions that transform your business. Our cutting-edge technology and expert team work together to deliver exceptional results that drive growth and success.',
    },
    heading: {
      value: 'Transform Your Business with Innovation',
    },
    eyebrow: {
      value: 'FEATURED SOLUTION',
    },
    subHeading: {
      value: 'Next-Generation Technology',
    },
    cta1Link: {
      value: {
        text: 'Get Started',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: 'Get Started with our solution',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A804HF435}',
        href: '/',
      },
    },
    cta2Link: {
      value: {
        text: 'View Documentation',
        anchor: '',
        linktype: 'external',
        class: '',
        title: 'View external documentation',
        target: '_blank',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A8044D432}',
        href: 'https://www.example.com/docs',
      },
    },
  },
  {
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta2:ctaVariant:secondary cta2:ctaIcon:download',
  }
);

export const noData = {
  render: {},
  params: [],
};

export default defaultData;
