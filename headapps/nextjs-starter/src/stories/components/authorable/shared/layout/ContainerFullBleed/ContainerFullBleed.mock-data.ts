import { ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export const mockData = {
  params: {
    DynamicPlaceholderId: 'container-full-bleed',
  },
  rendering: {
    uid: 'container-full-bleed-uid',
    componentName: 'ContainerFullBleed',
    dataSource: 'container-full-bleed-datasource',
    placeholders: {
      'custom-container-extra-large-container-full-bleed': [
        {
          uid: 'placeholder-content-uid',
          componentName: 'RichText',
          dataSource: 'placeholder-content-datasource',
          params: {
            RenderingIdentifier: 'full-bleed-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value:
                '<div class="rte"><p>This is full bleed content that extends to the viewport edges.</p></div>',
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
  renderingWithContent: {
    uid: 'container-full-bleed-with-content-uid',
    componentName: 'ContainerFullBleed',
    dataSource: 'container-full-bleed-with-content-datasource',
    placeholders: {
      'custom-container-extra-large-container-full-bleed': [
        {
          uid: 'hero-content-uid',
          componentName: 'RichText',
          dataSource: 'hero-content-datasource',
          params: {
            RenderingIdentifier: 'hero-rich-text',
            styles: '',
          },
          fields: {
            text: {
              value: `<div class="rte"><h3>Full Bleed Hero</h3><h2>Immersive Experience</h2><p>This content spans the full width of the viewport for maximum impact.</p><br /><p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p></div>`,
            } as Field<string>,
          },
        },
      ],
    },
  } as ComponentRendering,
};
