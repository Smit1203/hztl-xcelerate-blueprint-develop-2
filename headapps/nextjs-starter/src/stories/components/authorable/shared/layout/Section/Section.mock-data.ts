import { SectionProps } from 'components/authorable/shared/layout/Section';
import { default as RTE } from 'stories/components/authorable/shared/content/RTE/RTE.mock-data';

/* eslint-disable @typescript-eslint/no-explicit-any */
function toRendering(item: any) {
  return {
    ...item.rendering,
    fields: item.fields,
    params: item.params,
  };
}

const defaultData: SectionProps = {
  params: {
    DynamicPlaceholderId: '1',
    autoClose: '1',
  },
  rendering: {
    componentName: 'Section',
    dataSource: 'Storybook',
    placeholders: {
      'section-1': [toRendering(RTE), toRendering(RTE)],
    },
  },
};

export const withTitleAndDescription: SectionProps = {
  fields: {
    title: {
      value: 'Section Title',
    },
    description: {
      value:
        'This is a section description that provides context and information about the content within this section.',
    },
  },
  params: {
    DynamicPlaceholderId: '2',
    autoClose: '1',
    alignment: 'Left',
  },
  rendering: {
    componentName: 'Section',
    dataSource: 'Storybook',
    placeholders: {
      'section-2': [toRendering(RTE), toRendering(RTE)],
    },
  },
};

export const withTitleAndDescriptionCentered: SectionProps = {
  fields: {
    title: {
      value: 'Centered Section Title',
    },
    description: {
      value:
        'This section demonstrates center-aligned title and description, perfect for showcasing important content.',
    },
  },
  params: {
    DynamicPlaceholderId: '3',
    autoClose: '1',
    alignment: 'Center',
  },
  rendering: {
    componentName: 'Section',
    dataSource: 'Storybook',
    placeholders: {
      'section-3': [toRendering(RTE), toRendering(RTE)],
    },
  },
};

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
