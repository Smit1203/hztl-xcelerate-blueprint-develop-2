const defaultData = {
  editable: false,
  field: {
    value: {
      alt: 'A picture of a series of mountains saved in the WebP image format.',
      height: '1900',
      src: 'https://placehold.co/2800x1900',
      width: '2800',
    },
  },
  layout: 'fill',
  priority: false,
  quality: 75,
  sizes: '',
};

export default defaultData;

export const intrinsicData = {
  ...defaultData,
  field: {
    value: {
      alt: 'A picture of a series of mountains saved in the WebP image format.',
      height: '184',
      src: 'https://placehold.co/275x184',
      width: '275',
    },
  },
  layout: 'intrinsic',
  sizes: '',
};

export const responsiveData = {
  ...defaultData,
  field: {
    value: {
      alt: 'A picture of a series of mountains saved in the WebP image format.',
      height: '1900',
      src: 'https://placehold.co/2800x1900',
      width: '2800',
    },
  },
  layout: 'responsive',
  sizes: '',
};
