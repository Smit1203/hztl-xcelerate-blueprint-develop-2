import { Media } from '.generated/Media/InlineImage.model';

export const defaultData: Media.InlineImage.InlineImage_Component = {
  fields: {
    desktopImage: {
      value: {
        src: `assets/desktop-image-default.jpeg`,
        alt: 'Modern office building desktop view',
        width: 1280,
        height: 516,
      },
    },
    mobileImage: {
      value: {
        src: `assets/mobile-image-alt.jpeg`,
        alt: 'Modern office building mobile view',
        width: 600,
        height: 400,
      },
    },
    caption: {
      value: 'Our headquarters in downtown showcasing modern financial services.',
    },
  },
  params: {
    DynamicPlaceholderId: '10',
    FieldNames: 'Default',
    GridParameters: 'basis-full',
  },
  rendering: {
    componentName: 'InlineImage',
    dataSource: '/mock/data/source',
  },
};

export const desktopImageOnly: Media.InlineImage.InlineImage_Component = {
  ...defaultData,
  fields: {
    ...defaultData.fields,
    desktopImage: {
      value: {
        src: `assets/desktop-image-alt.jpeg`,
        alt: 'Financial consultation meeting',
        width: 1280,
        height: 516,
      },
    },
    mobileImage: {
      value: {
        src: '',
        alt: '',
        width: 0,
        height: 0,
      },
    },
    caption: {
      value: '',
    },
  },
};

export const withoutCaption: Media.InlineImage.InlineImage_Component = {
  ...defaultData,
  fields: {
    ...defaultData.fields,
    desktopImage: {
      value: {
        src: `assets/desktop-image-alt.jpeg`,
        alt: 'Investment portfolio overview',
        width: 1280,
        height: 516,
      },
    },
    mobileImage: {
      value: {
        src: `${process.env.PUBLIC_URL}/assets/mobile-image-alt.jpeg`,
        alt: 'Investment portfolio overview',
        width: 600,
        height: 400,
      },
    },
    caption: {
      value: '',
    },
  },
};

export const largeImage: Media.InlineImage.InlineImage_Component = {
  ...defaultData,
  fields: {
    ...defaultData.fields,
    desktopImage: {
      value: {
        src: `assets/desktop-image-default.jpeg`,
        alt: 'Financial team collaboration in modern workspace',
        width: 1920,
        height: 1080,
      },
    },
    mobileImage: {
      value: {
        src: `assets/mobile-image-alt.jpeg`,
        alt: 'Financial team collaboration in modern workspace',
        width: 800,
        height: 600,
      },
    },
    caption: {
      value:
        'Our expert financial advisors working together to provide comprehensive wealth management solutions for our clients.',
    },
  },
};

export default defaultData;
