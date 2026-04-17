// Local
import { CarouselProps } from 'components/authorable/shared/lists/Carousel';
import {
  default as CarouselItem1,
  carouselItem2 as CarouselItem2,
  carouselItem3 as CarouselItem3,
} from 'stories/components/authorable/shared/lists/CarouselItem/CarouselItem.mock-data';

const defaultData: CarouselProps = {
  params: {
    DynamicPlaceholderId: '1',
    autoLoop: '0',
    autoPlay: '0',
  },
  rendering: {
    componentName: 'Carousel',
    dataSource: 'Storybook',
    placeholders: {
      'carousel-1': [CarouselItem1.rendering, CarouselItem2.rendering, CarouselItem3.rendering],
    },
  },
};

export const withAutoLoop: CarouselProps = {
  params: {
    DynamicPlaceholderId: '1',
    autoLoop: '1',
    autoPlay: '0',
  },
  rendering: {
    componentName: 'Carousel',
    dataSource: 'Storybook',
    placeholders: {
      'carousel-1': [CarouselItem1.rendering, CarouselItem2.rendering, CarouselItem3.rendering],
    },
  },
};

export const withAutoPlay: CarouselProps = {
  params: {
    DynamicPlaceholderId: '1',
    autoLoop: '0',
    autoPlay: '1',
  },
  rendering: {
    componentName: 'Carousel',
    dataSource: 'Storybook',
    placeholders: {
      'carousel-1': [CarouselItem1.rendering, CarouselItem2.rendering, CarouselItem3.rendering],
    },
  },
};

export const withAutoPlayAndAutoLoop: CarouselProps = {
  params: {
    DynamicPlaceholderId: '1',
    autoLoop: '1',
    autoPlay: '1',
  },
  rendering: {
    componentName: 'Carousel',
    dataSource: 'Storybook',
    placeholders: {
      'carousel-1': [CarouselItem1.rendering, CarouselItem2.rendering, CarouselItem3.rendering],
    },
  },
};

export default defaultData;
