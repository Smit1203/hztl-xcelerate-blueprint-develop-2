import { PageTitleProps } from 'components/authorable/shared/content/PageTitle';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData = createComponentMockData<PageTitleProps>(
  'PageTitle',
  {
    title: {
      value: 'This is a Title',
    },
    description: {
      value: 'This is Description.',
    },
    ctaLink: {
      value: {
        href: 'https://hztl-blueprint-brandx-dev.vercel.app/',
        text: 'External Link',
        linktype: 'external',
        target: '_blank',
      },
    },
  },
  {
    alignment: 'Left',
    Styles: 'cta1:ctaVariant:primary cta1:ctaIcon:arrow-right',
  }
);

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
