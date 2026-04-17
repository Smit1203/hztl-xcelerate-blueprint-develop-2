import { CarouselItemProps } from 'components/authorable/shared/lists/CarouselItem';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: CarouselItemProps = createComponentMockData<CarouselItemProps>(
  'CarouselItem',
  {
    description: {
      value: 'Explore tailored financial solutions that empower your goals and secure your future.',
    },
    image: {
      value: {
        src: 'https://dummyimage.com/2560x1000/cfcdc8/2f2d2e',
        alt: 'carousel img',
        width: '1280',
        height: '500',
      },
    },
    primaryCTA: {
      value: {
        text: 'Discover More',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
        href: '/',
      },
    },
    secondaryCTA: {
      value: {
        text: 'Contact Us',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{3677269A-E29B-4802-8C2A-4611C266DFD8}',
        href: '/Card-Page',
      },
    },
    title: {
      value: 'Empower Your Financial Future',
    },
  },
  {
    DynamicPlaceholderId: '11',
    FieldNames: 'Default',
  }
);

export const carouselItem2: CarouselItemProps = createComponentMockData<CarouselItemProps>(
  'CarouselItem',
  {
    description: {
      value: 'Maximize your wealth with our expert financial management and investment strategies.',
    },
    image: {
      value: {
        src: 'https://dummyimage.com/2560x1000/cfcdc8/2f2d2e',
        alt: 'carousel img',
        width: '1280',
        height: '500',
      },
    },
    primaryCTA: {
      value: {
        text: 'Learn More',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-937C-4577-A419-9A3A8044D435}',
        href: '/',
      },
    },
    secondaryCTA: {
      value: {
        text: 'Schedule a Call',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{3677269A-E29B-4896-8C2A-4611C266DFD8}',
        href: '/Card-Page',
      },
    },
    title: {
      value: 'Wealth Management Services',
    },
  },
  {
    DynamicPlaceholderId: '12',
    FieldNames: 'Default',
  }
);

export const carouselItem3: CarouselItemProps = createComponentMockData<CarouselItemProps>(
  'CarouselItem',
  {
    description: {
      value: 'Plan for tomorrow with personalized retirement strategies that offer peace of mind.',
    },
    image: {
      value: {
        src: 'https://dummyimage.com/2560x1000/cfcdc8/2f2d2e',
        alt: 'carousel img',
        width: '1280',
        height: '500',
      },
    },
    primaryCTA: {
      value: {
        text: 'Start Planning',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{E9A00FA1-377C-4577-A419-9A3A8044D435}',
        href: '/',
      },
    },
    secondaryCTA: {
      value: {
        text: 'Speak to an Advisor',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{3677269A-E29B-4342-8C2A-4611C266DFD8}',
        href: '/Card-Page',
      },
    },
    title: {
      value: 'Secure Your Retirement',
    },
  },
  {
    DynamicPlaceholderId: '13',
    FieldNames: 'Default',
  }
);

export default defaultData;
