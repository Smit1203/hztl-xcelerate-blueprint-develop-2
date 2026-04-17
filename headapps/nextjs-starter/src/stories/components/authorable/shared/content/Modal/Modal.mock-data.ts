// Global

// Local
import { ModalProps } from 'components/authorable/shared/content/Modal';

import { createComponentMockData } from 'lib/testing/rendering-mock';

// Create custom image data for the modal
const customImageData = createComponentMockData('InlineImage', {
  desktopImage: {
    value: {
      src: 'assets/desktop-image-alt.jpeg',
      alt: 'Financial consultation meeting',
      width: 1280,
      height: 516,
    },
  },
  mobileImage: {
    value: {
      src: 'assets/mobile-image-alt.jpeg',
      alt: 'Financial consultation meeting',
      width: 600,
      height: 400,
    },
  },
  caption: {
    value: 'Our expert financial advisors providing personalized consultation services.',
  },
});

const defaultData: ModalProps = createComponentMockData<ModalProps>(
  'Modal',
  {
    label: { value: 'Demo Modal' },
    modalId: { value: 'defaultmodal' },
    openOnLoad: { value: false },
    size: { value: 'large' },
    title: { value: 'Default Image Modal' },
  },
  {
    DynamicPlaceholderId: '1',
  },
  {
    'custom-modal-1': [customImageData.rendering],
  }
);

export const noData = {
  params: [],
  rnder: {},
};

export default defaultData;
