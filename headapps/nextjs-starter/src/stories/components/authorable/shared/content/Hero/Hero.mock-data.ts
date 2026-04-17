import { HeroProps } from 'components/authorable/shared/content/Hero';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData = createComponentMockData<HeroProps>(
  'Hero',
  {
    image: {
      value: {
        src: 'https://dummyimage.com/650x480/cfcdc8/2f2d2e',
        alt: 'placeholder_gray_4by3',
        width: '800',
        height: '600',
      },
    },
    description: {
      value:
        '<span style="color: #27272a; background-color: #ffffff;">Explore innovative solutions for your financial needs.</span>',
    },
    heading: {
      value: 'Empower Your Financial Future',
    },
    cta1Link: {
      value: {
        text: 'Get Started',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: 'cta1 title',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A804HF435}',
        href: '/',
      },
    },
    cta2Link: {
      value: {
        text: 'External Resource',
        anchor: '',
        linktype: 'external',
        class: '',
        title: 'Open external resource',
        target: '_blank',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A8044D432}',
        href: 'https://www.example.com',
      },
    },
  },
  {
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:download cta2:ctaVariant:secondary cta2:ctaIcon:arrow-right',
  }
);

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
