import { ContextualNavDataType } from 'components/authorable/shared/lists/ContextualNav';

// Mock data that matches the ContextualNav component structure
export const defaultData: ContextualNavDataType = {
  params: {},
  rendering: {
    componentName: 'ContextualNav',
    dataSource: '{12345678-1234-5678-9ABC-DEF123456789}',
    uid: '{12345678-1234-5678-9ABC-DEF123456789}',
  },
  staticProps: {
    currentPage: {
      id: '{ANALYTICS-ID}',
      pageTitle: { jsonValue: { value: 'Analytics' } },
      url: { path: '/products/software/analytics' },
      navigationFilter: { targetItems: [] },
      children: { results: [] },
      ancestors: [
        {
          id: '{ROOT-ID}',
          pageTitle: { jsonValue: { value: 'Home' } },
          url: { path: '/' },
          navigationFilter: { targetItems: [] },
          children: { results: [] },
        },
        {
          id: '{PRODUCTS-ID}',
          pageTitle: { jsonValue: { value: 'Products' } },
          url: { path: '/products' },
          navigationFilter: { targetItems: [] },
          children: { results: [] },
        },
        {
          id: '{SOFTWARE-ID}',
          pageTitle: { jsonValue: { value: 'Software' } },
          url: { path: '/products/software' },
          navigationFilter: { targetItems: [] },
          children: { results: [] },
        },
      ],
    },
    navRoot: {
      id: '{PRODUCTS-ID}',
      pageTitle: { jsonValue: { value: 'Products' } },
      url: { path: '/products' },
      navigationFilter: { targetItems: [] },
      children: {
        results: [
          {
            id: '{SOFTWARE-ID}',
            pageTitle: { jsonValue: { value: 'Software' } },
            url: { path: '/products/software' },
            navigationFilter: { targetItems: [] },
            children: {
              results: [
                {
                  id: '{ANALYTICS-ID}',
                  pageTitle: { jsonValue: { value: 'Analytics' } },
                  url: { path: '/products/software/analytics' },
                  navigationFilter: { targetItems: [] },
                  children: {
                    results: [
                      {
                        id: '{BUSINESS-ANALYTICS-ID}',
                        pageTitle: { jsonValue: { value: 'Business Analytics' } },
                        url: { path: '/products/software/analytics/business' },
                        navigationFilter: { targetItems: [] },
                        children: { results: [] },
                      },
                      {
                        id: '{DATA-VISUALIZATION-ID}',
                        pageTitle: { jsonValue: { value: 'Data Visualization' } },
                        url: { path: '/products/software/analytics/visualization' },
                        navigationFilter: { targetItems: [] },
                        children: { results: [] },
                      },
                    ],
                  },
                },
                {
                  id: '{CRM-ID}',
                  pageTitle: { jsonValue: { value: 'CRM Solutions' } },
                  url: { path: '/products/software/crm' },
                  navigationFilter: { targetItems: [] },
                  children: { results: [] },
                },
                {
                  id: '{ERP-ID}',
                  pageTitle: { jsonValue: { value: 'ERP Systems' } },
                  url: { path: '/products/software/erp' },
                  navigationFilter: { targetItems: [] },
                  children: {
                    results: [
                      {
                        id: '{FINANCE-ERP-ID}',
                        pageTitle: { jsonValue: { value: 'Finance Management' } },
                        url: { path: '/products/software/erp/finance' },
                        navigationFilter: { targetItems: [] },
                        children: { results: [] },
                      },
                      {
                        id: '{INVENTORY-ERP-ID}',
                        pageTitle: { jsonValue: { value: 'Inventory Control' } },
                        url: { path: '/products/software/erp/inventory' },
                        navigationFilter: { targetItems: [] },
                        children: { results: [] },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: '{HARDWARE-ID}',
            pageTitle: { jsonValue: { value: 'Hardware' } },
            url: { path: '/products/hardware' },
            navigationFilter: { targetItems: [] },
            children: {
              results: [
                {
                  id: '{SERVERS-ID}',
                  pageTitle: { jsonValue: { value: 'Servers' } },
                  url: { path: '/products/hardware/servers' },
                  navigationFilter: { targetItems: [] },
                  children: { results: [] },
                },
                {
                  id: '{STORAGE-ID}',
                  pageTitle: { jsonValue: { value: 'Storage Solutions' } },
                  url: { path: '/products/hardware/storage' },
                  navigationFilter: { targetItems: [] },
                  children: { results: [] },
                },
              ],
            },
          },
          {
            id: '{SERVICES-ID}',
            pageTitle: { jsonValue: { value: 'Services' } },
            url: { path: '/products/services' },
            navigationFilter: { targetItems: [] },
            children: {
              results: [
                {
                  id: '{CONSULTING-ID}',
                  pageTitle: { jsonValue: { value: 'Consulting' } },
                  url: { path: '/products/services/consulting' },
                  navigationFilter: { targetItems: [] },
                  children: { results: [] },
                },
                {
                  id: '{SUPPORT-ID}',
                  pageTitle: { jsonValue: { value: 'Technical Support' } },
                  url: { path: '/products/services/support' },
                  navigationFilter: { targetItems: [] },
                  children: { results: [] },
                },
                {
                  id: '{TRAINING-ID}',
                  pageTitle: { jsonValue: { value: 'Training Programs' } },
                  url: { path: '/products/services/training' },
                  navigationFilter: { targetItems: [] },
                  children: { results: [] },
                },
              ],
            },
          },
          {
            id: '{CLOUD-ID}',
            pageTitle: { jsonValue: { value: 'Cloud Solutions' } },
            url: { path: '/products/cloud' },
            navigationFilter: { targetItems: [] },
            children: { results: [] },
          },
          {
            id: '{SECURITY-ID}',
            pageTitle: { jsonValue: { value: 'Security Tools' } },
            url: { path: '/products/security' },
            navigationFilter: { targetItems: [] },
            children: { results: [] },
          },
        ],
      },
    },
    language: 'en',
  },
};

// Alternative scenario: Simple navigation without deep nesting
export const simpleNavData: ContextualNavDataType = {
  ...defaultData,
  staticProps: {
    ...defaultData.staticProps,
    currentPage: {
      id: '{ABOUT-ID}',
      pageTitle: { jsonValue: { value: 'About Us' } },
      url: { path: '/about' },
      navigationFilter: { targetItems: [] },
      children: { results: [] },
      ancestors: [
        {
          id: '{ROOT-ID}',
          pageTitle: { jsonValue: { value: 'Home' } },
          url: { path: '/' },
          navigationFilter: { targetItems: [] },
          children: { results: [] },
        },
      ],
    },
    navRoot: {
      id: '{COMPANY-ID}',
      pageTitle: { jsonValue: { value: 'Company' } },
      url: { path: '/company' },
      navigationFilter: { targetItems: [] },
      children: {
        results: [
          {
            id: '{ABOUT-ID}',
            pageTitle: { jsonValue: { value: 'About Us' } },
            url: { path: '/about' },
            navigationFilter: { targetItems: [] },
            children: { results: [] },
          },
          {
            id: '{TEAM-ID}',
            pageTitle: { jsonValue: { value: 'Our Team' } },
            url: { path: '/team' },
            navigationFilter: { targetItems: [] },
            children: { results: [] },
          },
          {
            id: '{CAREERS-ID}',
            pageTitle: { jsonValue: { value: 'Careers' } },
            url: { path: '/careers' },
            navigationFilter: { targetItems: [] },
            children: { results: [] },
          },
        ],
      },
    },
  },
};

// Alternative scenario: No children (leaf section)
export const leafNavData: ContextualNavDataType = {
  ...defaultData,
  staticProps: {
    ...defaultData.staticProps,
    currentPage: {
      id: '{CONTACT-ID}',
      pageTitle: { jsonValue: { value: 'Contact Us' } },
      url: { path: '/contact' },
      navigationFilter: { targetItems: [] },
      children: { results: [] },
      ancestors: [],
    },
    navRoot: {
      id: '{CONTACT-ID}',
      pageTitle: { jsonValue: { value: 'Contact Us' } },
      url: { path: '/contact' },
      navigationFilter: { targetItems: [] },
      children: {
        results: [],
      },
    },
  },
};

// Alternative scenario: Navigation with sidebar filters
export const filteredNavData: ContextualNavDataType = {
  ...defaultData,
  staticProps: {
    ...defaultData.staticProps,
    currentPage: {
      id: '{DASHBOARD-ID}',
      pageTitle: { jsonValue: { value: 'Dashboard' } },
      url: { path: '/dashboard' },
      navigationFilter: { targetItems: [] },
      children: { results: [] },
      ancestors: [
        {
          id: '{ROOT-ID}',
          pageTitle: { jsonValue: { value: 'Home' } },
          url: { path: '/' },
          navigationFilter: { targetItems: [] },
          children: { results: [] },
        },
      ],
    },
    navRoot: {
      id: '{ADMIN-ID}',
      pageTitle: { jsonValue: { value: 'Admin' } },
      url: { path: '/admin' },
      navigationFilter: { targetItems: [] },
      children: {
        results: [
          {
            id: '{DASHBOARD-ID}',
            pageTitle: { jsonValue: { value: 'Dashboard' } },
            url: { path: '/dashboard' },
            navigationFilter: {
              targetItems: [{ key: { value: 'sidebar' } }],
            },
            children: { results: [] },
          },
          {
            id: '{SETTINGS-ID}',
            pageTitle: { jsonValue: { value: 'Settings' } },
            url: { path: '/settings' },
            navigationFilter: {
              targetItems: [{ key: { value: 'main' } }],
            },
            children: { results: [] },
          },
          {
            id: '{USERS-ID}',
            pageTitle: { jsonValue: { value: 'Users' } },
            url: { path: '/users' },
            navigationFilter: { targetItems: [] },
            children: { results: [] },
          },
        ],
      },
    },
  },
};

export default defaultData;
