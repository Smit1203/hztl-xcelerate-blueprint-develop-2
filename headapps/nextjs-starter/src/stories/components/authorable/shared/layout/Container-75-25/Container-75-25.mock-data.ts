import { ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export const mockData = {
  params: {
    DynamicPlaceholderId: 'container-75-25',
  },
  rendering: {
    uid: 'container-75-25-uid',
    componentName: 'Container-75-25',
    dataSource: 'container-75-25-datasource',
    placeholders: {
      'custom-container-medium-container-75-25': [
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
              value: '<div class="rte"><p>This is the main content area (75% width).</p></div>',
            } as Field<string>,
          },
        },
      ],
      'custom-container-small-container-75-25': [
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
              value: '<div class="rte"><p>This is the sidebar content (25% width).</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
  renderingWithContent: {
    uid: 'container-75-25-with-content-uid',
    componentName: 'Container-75-25',
    dataSource: 'container-75-25-with-content-datasource',
    placeholders: {
      'custom-container-medium-container-75-25': [
        {
          uid: 'main-content-uid',
          componentName: 'RichText',
          dataSource: 'main-content-datasource',
          params: {
            RenderingIdentifier: 'main-content-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value:
                '<div class="rte"><h3>Main Content</h3><h2>Primary Information</h2><p>This is the main content area that takes up 75% of the width. Perfect for detailed content, articles, or primary information.</p></div>',
            } as Field<string>,
          },
        },
      ],
      'custom-container-small-container-75-25': [
        {
          uid: 'sidebar-content-uid',
          componentName: 'RichText',
          dataSource: 'sidebar-content-datasource',
          params: {
            RenderingIdentifier: 'sidebar-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value:
                '<div class="rte"><h3>Sidebar</h3><h2>Related Info</h2><p>This sidebar takes up 25% of the width. Great for navigation, related links, or supplementary information.</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
};
