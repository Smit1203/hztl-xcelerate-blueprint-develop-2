import { ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export const mockData = {
  params: {
    DynamicPlaceholderId: 'container-25-75',
  },
  rendering: {
    uid: 'container-25-75-uid',
    componentName: 'Container-25-75',
    dataSource: 'container-25-75-datasource',
    placeholders: {
      'custom-container-small-container-25-75': [
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
              value: '<div class="rte"><p>This is the sidebar content (25% width).</p></div>',
            } as Field<string>,
          },
        },
      ],
      'custom-container-medium-container-25-75': [
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
              value: '<div class="rte"><p>This is the main content area (75% width).</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
  renderingWithContent: {
    uid: 'container-25-75-with-content-uid',
    componentName: 'Container-25-75',
    dataSource: 'container-25-75-with-content-datasource',
    placeholders: {
      'custom-container-small-container-25-75': [
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
                '<div class="rte"><h3>Sidebar</h3><p>This sidebar takes up 25% of the width. Perfect for navigation, filters, or related links.</p></div>',
            } as Field<string>,
          },
        },
      ],
      'custom-container-medium-container-25-75': [
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
                '<div class="rte"><h3>Main Content</h3><p>This main content area takes up 75% of the width. Ideal for detailed content, articles, or primary information with a sidebar for navigation.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
};
