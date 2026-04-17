import { ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export const mockData = {
  params: {
    DynamicPlaceholderId: 'container-50-50',
  },
  rendering: {
    uid: 'container-50-50-uid',
    componentName: 'Container-50-50',
    dataSource: 'container-50-50-datasource',
    placeholders: {
      'custom-container-half-left-container-50-50': [
        {
          uid: 'left-column-content-uid',
          componentName: 'RichText',
          dataSource: 'left-column-content-datasource',
          params: {
            RenderingIdentifier: 'left-column-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value: '<div class="rte"><p>This is the left column content (50% width).</p></div>',
            } as Field<string>,
          },
        },
      ],
      'custom-container-half-right-container-50-50': [
        {
          uid: 'right-column-content-uid',
          componentName: 'RichText',
          dataSource: 'right-column-content-datasource',
          params: {
            RenderingIdentifier: 'right-column-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value: '<div class="rte"><p>This is the right column content (50% width).</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
  renderingWithContent: {
    uid: 'container-50-50-with-content-uid',
    componentName: 'Container-50-50',
    dataSource: 'container-50-50-with-content-datasource',
    placeholders: {
      'custom-container-half-left-container-50-50': [
        {
          uid: 'left-content-uid',
          componentName: 'RichText',
          dataSource: 'left-content-datasource',
          params: {
            RenderingIdentifier: 'left-content-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value:
                '<div class="rte"><h3>Left Column</h3><h2>Equal Width Layout</h2><p>This left column takes up exactly 50% of the width. Perfect for balanced content layouts.</p></div>',
            } as Field<string>,
          },
        },
      ],
      'custom-container-half-right-container-50-50': [
        {
          uid: 'right-content-uid',
          componentName: 'RichText',
          dataSource: 'right-content-datasource',
          params: {
            RenderingIdentifier: 'right-content-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value:
                '<div class="rte"><h3>Right Column</h3><h2>Balanced Design</h2><p>This right column also takes up 50% of the width, creating a perfectly balanced layout.</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
};
