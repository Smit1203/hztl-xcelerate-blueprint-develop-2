import { CardItemProps } from 'components/authorable/shared/lists/CardItem';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: CardItemProps = createComponentMockData<CardItemProps>(
  'CardItem',
  {
    cardImage: {
      value: {
        alt: 'Image Alt text',
        src: 'https://dummyimage.com/395x300/cfcdc8/2f2d2e',
        title: 'Image title',
      },
    },
    cardLink1: {
      value: {
        href: '#',
        linktype: 'internal',
        text: 'Learn More',
      },
    },
    cardLink2: {
      value: {
        href: 'https://www.example.com',
        linktype: 'external',
        target: '_blank',
        text: 'Download Brochure',
      },
    },
    description: {
      value:
        'Discover tailored financial planning services to help you achieve your long-term goals. Let us guide your journey to financial success.',
    },
    eyebrow: {
      value: 'Financial Planning',
    },
    heading: {
      value: 'Personalized Financial Planning',
    },
    subHeading: {
      value: 'Achieve Your Goals with Confidence',
    },
  },
  {
    DynamicPlaceholderId: '10',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta2:ctaVariant:secondary cta2:ctaIcon:download',
  }
);

export const CardItemA: CardItemProps = createComponentMockData<CardItemProps>(
  'CardItem',
  {
    cardImage: {
      value: {
        src: 'https://dummyimage.com/900x600/cfcdc8/2f2d2e',
        alt: 'Image Alt text',
        title: 'Image title',
      },
    },
    cardLink1: {
      value: {
        linktype: 'internal',
        id: '0e789cbb-8de4-4b66-ac09-69b1a4359003',
        anchor: '',
        querystring: '',
        target: '_blank',
        class: '',
        text: 'Explore Services',
        title: '',
        href: '/Services',
      },
    },
    cardLink2: {
      value: {
        href: 'https://www.example.com',
        linktype: 'internal',
        url: 'https://www.example.com',
        target: '',
        text: 'Download Brochure',
        title: '',
        class: '',
      },
    },
    description: {
      value:
        'Optimize your investments and secure your financial future with our expert wealth management services tailored to your needs.',
    },
    eyebrow: {
      value: 'Wealth Management',
    },
    heading: {
      value: 'Comprehensive Wealth Management',
    },
    subHeading: {
      value: 'Expert Strategies for Financial Growth',
    },
  },
  {
    DynamicPlaceholderId: '11',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta2:ctaVariant:secondary cta2:ctaIcon:download',
  }
);

export const CardItemB: CardItemProps = createComponentMockData<CardItemProps>(
  'CardItem',
  {
    cardImage: {
      value: {
        src: 'https://dummyimage.com/900x600/cfcdc8/2f2d2e',
        alt: 'Image Alt text',
        title: 'Image title',
      },
    },
    cardLink1: {
      value: {
        linktype: 'internal',
        id: '0e789cbb-8de4-4b66-ac09-69b1a4359003',
        anchor: '',
        querystring: '',
        target: '_blank',
        class: '',
        text: 'Discover More',
        title: '',
        href: '/Services',
      },
    },
    cardLink2: {
      value: {
        href: 'https://www.example.com',
        linktype: 'internal',
        url: 'https://www.example.com',
        target: '',
        text: 'Download Brochure',
        title: '',
        class: '',
      },
    },
    description: {
      value:
        'Plan your retirement with confidence. Our tailored solutions ensure a secure and fulfilling post-retirement life.',
    },
    eyebrow: {
      value: 'Retirement Solutions',
    },
    heading: {
      value: 'Secure Your Retirement',
    },
    subHeading: {
      value: 'Tailored Plans for Peace of Mind',
    },
  },
  {
    DynamicPlaceholderId: '12',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:download cta2:ctaVariant:secondary cta2:ctaIcon:arrow-right',
  }
);

export const CardItemC: CardItemProps = createComponentMockData<CardItemProps>(
  'CardItem',
  {
    cardImage: {
      value: {
        src: 'https://dummyimage.com/900x600/cfcdc8/2f2d2e',
        alt: 'Image Alt text',
        title: 'Image title',
      },
    },
    cardLink1: {
      value: {
        linktype: 'internal',
        id: '0e789cbb-8de4-4b66-ac09-69b1a4359003',
        anchor: '',
        querystring: '',
        target: '_blank',
        class: '',
        text: 'Read more',
        title: '',
        href: '/Services',
      },
    },
    cardLink2: {
      value: {
        href: 'https://www.example.com',
        linktype: 'internal',
        url: 'https://www.example.com',
        target: '',
        text: 'Download',
        title: '',
        class: '',
      },
    },
    description: {
      value:
        'Leverage our business financial services to streamline operations, enhance profitability, and secure sustainable growth.',
    },
    eyebrow: {
      value: 'Business Solutions',
    },
    heading: {
      value: 'Empower Your Business',
    },
    subHeading: {
      value: 'Financial Solutions for Success',
    },
  },
  {
    DynamicPlaceholderId: '13',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
    Styles:
      'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right cta2:ctaVariant:secondary cta2:ctaIcon:download',
  }
);

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
