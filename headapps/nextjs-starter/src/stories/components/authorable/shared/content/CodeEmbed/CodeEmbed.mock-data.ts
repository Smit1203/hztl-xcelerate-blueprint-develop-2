import { CodeEmbedProps } from 'components/authorable/shared/content/CodeEmbed';

const defaultData: CodeEmbedProps = {
  name: 'CodeEmbed',
  fields: {
    enabled: {
      value: true,
    },
    htmlCode: {
      value:
        "<p id='custom-paragraph'>This paragraph should be blue.</p>\n<p>This paragraph should be styled as normal.</p>\n",
    },
    script: {
      value:
        "const paragraph = document.getElementById('custom-paragraph');\nparagraph.style.backgroundColor = 'blue';\nparagraph.style.color = 'white';\nconsole.log('This should appear in the console.');\n",
    },
    additionalTagAttributes: {
      value: '',
    },
    scriptId: {
      value: '',
    },
    scriptSourceUrl: {
      value: '',
    },
  },
  params: {
    GridParameters: 'basis-full',
    DynamicPlaceholderId: '1',
    FieldNames: 'Default',
  },
  rendering: {
    componentName: 'CodeEmbed',
    dataSource: '/mock/data/embed-source',
  },
};

export default defaultData;
