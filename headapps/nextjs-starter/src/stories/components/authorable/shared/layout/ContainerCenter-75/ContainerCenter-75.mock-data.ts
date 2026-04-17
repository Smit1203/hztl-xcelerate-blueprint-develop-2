import { ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export const mockData = {
  params: {
    DynamicPlaceholderId: 'container-center-75',
  },
  rendering: {
    uid: 'container-center-75-uid',
    componentName: 'ContainerCenter-75',
    dataSource: 'container-center-75-datasource',
    placeholders: {
      'custom-container-medium-container-center-75': [
        {
          uid: 'placeholder-content-uid',
          componentName: 'RichText',
          dataSource: 'placeholder-content-datasource',
          params: {
            RenderingIdentifier: 'center-75-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value:
                '<div class="rte"><p>This is centered content that takes up 75% of the container width.</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
  renderingWithContent: {
    uid: 'container-center-75-with-content-uid',
    componentName: 'ContainerCenter-75',
    dataSource: 'container-center-75-with-content-datasource',
    placeholders: {
      'custom-container-medium-container-center-75': [
        {
          uid: 'feature-content-uid',
          componentName: 'RichText',
          dataSource: 'feature-content-datasource',
          params: {
            RenderingIdentifier: 'feature-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value: `<div class="rte"><h3>Centered Layout</h3><h2>Focused Content</h2><p>This content is centered and takes up 75% of the available width for optimal readability.</p><br /><p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p></div>`,
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
};
