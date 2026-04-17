import { FileListProps } from 'components/authorable/shared/lists/FileList';

const defaultData: FileListProps = {
  params: {
    RenderingIdentifier: 'storybook-filelist',
    selectTheme: 'ThemesLight',
    DynamicPlaceholderId: '1',
  },
  fields: {
    headline: { value: 'Sample File List' },
    description: { value: 'A list of downloadable files for demonstration.' },
    ctaLink: {
      value: {
        href: '#',
        text: 'Download All',
        linktype: 'internal',
      },
    },
    selectFiles: [
      {
        id: '1',
        url: '#',
        name: 'Sample PDF',
        displayName: 'Sample PDF',
        fields: {
          Extension: { value: 'pdf' },
          Size: { value: '204800' },
        },
      },
      {
        id: '2',
        url: '#',
        name: 'Sample DOCX',
        displayName: 'Sample DOCX',
        fields: {
          Extension: { value: 'docx' },
          Size: { value: '102400' },
        },
      },
    ],
  },
  rendering: {
    uid: 'storybook-filelist',
    componentName: 'FileList',
    dataSource: 'storybook',
    params: {},
  },
};

export default defaultData;
