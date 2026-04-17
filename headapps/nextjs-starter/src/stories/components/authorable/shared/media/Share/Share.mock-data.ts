import { LayoutServiceData } from '@sitecore-content-sdk/nextjs';

/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultData: LayoutServiceData = {
  sitecore: {
    context: {
      siteSettings: {
        socialShareLinks: [
          {
            id: '705cf8d1-c8eb-4077-843e-3665e1bc4aa7',
            url: 'email',
            name: 'Email',
            displayName: 'Email',
            fields: {
              title: {
                value: 'E-mail',
              },
              icon: {
                value: {
                  src: 'assets/share-mail.svg',
                  alt: '',
                },
              },
              url: {
                value: 'mailto:?subject=$title&body=$title%0A$description%0A$image',
              },
            },
          },
          {
            id: 'bc70b82b-e0e9-4c6f-9825-6788cd3bd378',
            url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/content/HztlFoundation/Global/Social-Sharing-Links/Facebook',
            name: 'Facebook',
            displayName: 'Facebook',
            fields: {
              title: {
                value: 'Facebook',
              },
              url: {
                value: 'https://www.facebook.com/sharer/sharer.php?u=$url',
              },
              icon: {
                value: {
                  src: 'assets/share-fb.svg',
                  alt: '',
                },
              },
            },
          },
          {
            id: '9de2f2e5-beb5-425e-be83-323223309544',
            url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/content/HztlFoundation/Global/Social-Sharing-Links/Pinterest',
            name: 'Pinterest',
            displayName: 'Pinterest',
            fields: {
              title: {
                value: 'Pinterest',
              },
              url: {
                value: 'https://pinterest.com/pin/create/button?url=$url',
              },
              icon: {
                value: {
                  src: 'assets/share-pinterest.svg',
                  alt: '',
                },
              },
            },
          },
          {
            id: '0e66482c-9a94-41ed-90dc-f6627ecfec67',
            url: 'Print',
            name: 'Print',
            displayName: 'Print',
            fields: {
              title: {
                value: 'Print',
              },
              icon: {
                value: {
                  src: 'assets/share-printer.svg',
                  alt: '',
                },
              },
              url: {
                value: 'print',
              },
            },
          },
          {
            id: '95539e61-49ab-4e97-aeea-a5eae0912617',
            url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/content/HztlFoundation/Global/Social-Sharing-Links/Twitter',
            name: 'Twitter',
            displayName: 'Twitter',
            fields: {
              title: {
                value: 'Twitter',
              },
              url: {
                value: 'http://twitter.com/share?url=$url',
              },
              icon: {
                value: {
                  src: 'assets/share-twtr.svg',
                  alt: '',
                },
              },
            },
          },
          {
            id: 'c659c780-89b8-42ca-95d4-1dd203646167',
            url: 'Copy',
            name: 'Copy link',
            displayName: 'Copy link',
            fields: {
              title: {
                value: 'Copy link',
              },
              url: {
                value: 'copy',
              },
              icon: {
                value: {
                  src: 'assets/share-link.svg',
                  alt: '',
                },
              },
            },
          },
        ],
      },
      languages: null,
    },
    route: {
      fields: {
        OpenGraphTitle: {
          value: 'Welcome to Our Website - BrandX',
        },
        OpenGraphDescription: {
          value:
            'Discover our amazing products and services. We offer the best solutions for your needs.',
        },
        OpenGraphImageUrl: {
          value: {
            src: 'https://hztl-blueprint-brandx.vercel.app/',
            alt: '',
          },
        },
      },
      name: '',
      placeholders: undefined as any,
    },
  },
};

export default defaultData;
