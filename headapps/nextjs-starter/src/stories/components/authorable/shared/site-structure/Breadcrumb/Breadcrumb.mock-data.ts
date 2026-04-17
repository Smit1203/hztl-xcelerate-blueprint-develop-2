import { BreadcrumbDataType } from 'components/authorable/shared/site-structure/Breadcrumb/Breadcrumb';

// Realistically this is going to have a lot more data from Sitecore or XM Cloud, but this is a good example mock data set.
const defaultData: BreadcrumbDataType = {
  rendering: {
    uid: 'f29a1f60-e8b8-446d-ab82-f56bca7201f2',
    componentName: 'Default',
    dataSource: 'Storybook',
    params: {
      GridParameters: 'col-12',
      FieldNames: 'Default',
      DynamicPlaceholderId: '1',
    },
  },
  staticProps: {
    currentPage: {
      Title: {
        jsonValue: {
          value: 'Accordion',
        },
      },
      url: {
        path: '/work/available-components#accordion-page',
      },
      navigationFilter: {
        targetItems: [],
      },
      ancestors: [
        {
          Title: {
            jsonValue: {
              value: 'Available Components',
            },
          },
          url: {
            path: '/work/available-components',
          },
          navigationFilter: {
            targetItems: [],
          },
        },
        {
          Title: {
            jsonValue: {
              value: 'Work',
            },
          },
          url: {
            path: '/work',
          },
          navigationFilter: {
            targetItems: [],
          },
        },
        {
          Title: {
            jsonValue: {
              value: 'Home',
            },
          },
          url: {
            path: '/',
          },
          navigationFilter: {
            targetItems: [],
          },
        },
      ],
    },
  },
};

export const withHiddenAncestor: BreadcrumbDataType = {
  rendering: {
    uid: 'f29a1f60-e8b8-446d-ab82-f56bca7201f2',
    componentName: 'Default',
    dataSource: 'Storybook',
    params: {
      GridParameters: 'col-12',
      FieldNames: 'Default',
      DynamicPlaceholderId: '1',
    },
  },
  staticProps: {
    currentPage: {
      Title: {
        jsonValue: {
          value: 'Accordion',
        },
      },
      url: {
        path: '/work/available-components#accordion-page',
      },
      navigationFilter: {
        targetItems: [],
      },
      ancestors: [
        {
          Title: {
            jsonValue: {
              value: 'Available Components',
            },
          },
          url: {
            path: '/work/available-components',
          },
          navigationFilter: {
            targetItems: [
              {
                key: {
                  jsonValue: { value: 'breadcrumb' },
                },
              },
            ],
          },
        },
        {
          Title: {
            jsonValue: {
              value: 'Work',
            },
          },
          url: {
            path: '/work',
          },
          navigationFilter: {
            targetItems: [],
          },
        },
        {
          Title: {
            jsonValue: {
              value: 'Home',
            },
          },
          url: {
            path: '/',
          },
          navigationFilter: {
            targetItems: [],
          },
        },
      ],
    },
  },
};

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
