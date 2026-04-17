import { SiteStructure } from '.generated/SiteStructure/Footer.model';
import { createComponentMockData } from 'lib/testing/rendering-mock';

export const defaultData = createComponentMockData<SiteStructure.Footer.Footer_Component>(
  'Footer',
  {
    footerLogo: {
      value: {
        src: './assets/hztl_logo.png',
        alt: 'Horizontal Digital',
        width: '60',
        height: '45',
      },
    },

    footerLogoLink: {
      value: {
        text: '',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{E9ABAFA1-377C-4577-A419-9A3A804554D435}',
        href: '/',
      },
    },
    copyrightText: {
      value:
        'Need a digital marketing solution? Visit our partner company <strong><a href="https://www.horizontaldigital.com" target="_blank">Horizontal Digital\n<span class="svg-icon inline-flex align-middle -ml-3 h-6 w-6">\n    <svg aria-hidden="true" class="inline ml-2 -mt-1 h-em w-em" fill="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" cliprule="evenodd" fillrule="evenodd"></path>\n    </svg>\n  </span></a></strong>.',
    },
    footerColumns: [
      {
        id: '0e298857-f457-4fe2-b203-44c2d8057c84',
        url: '/Data/Site-Structure/Footer/Resources',
        name: 'Resources',
        displayName: 'Resources',
        fields: {
          columnHeader: {
            value: 'Resources',
          },
          columnLinks: [
            {
              id: '7f9bef12-e156-4934-8b2d-3aefa010b070',
              url: '/Data/Site-Structure/Footer/FooterColumn1/Generic-Link1',
              name: 'Generic Link1',
              displayName: 'Generic Link1',
              fields: {
                link: {
                  value: {
                    class: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    querystring: '',
                    anchor: '',
                    target: '',
                    title: '',
                    linktype: 'internal',
                    text: 'Link1',
                    url: '/HztlFoundation/BrandX/Home',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '1b465b4a-8f92-418e-aba8-fcf51b3b2389',
              url: '/Data/Site-Structure/Footer/FooterColumn1/Generic-Link2',
              name: 'Generic Link2',
              displayName: 'Generic Link2',
              fields: {
                link: {
                  value: {
                    text: 'Financial Calculators',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '_blank',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '6301beca-8e47-4edc-b5cc-9dc496920a52',
              url: '/Data/Site-Structure/Footer/FooterColumn1/Generic-Link3',
              name: 'Generic Link3',
              displayName: 'Generic Link3',
              fields: {
                link: {
                  value: {
                    text: 'Link3',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: '3112318f-1d33-415a-b536-a0e3cf1bf411',
        url: '/Data/Site-Structure/Footer/FooterColumn2',
        name: 'FooterColumn2',
        displayName: 'FooterColumn2',
        fields: {
          columnHeader: {
            value: 'FooterColumn2',
          },
          columnLinks: [
            {
              id: 'e8ded7c4-56c1-40e4-a4b8-1318e8cf2272',
              url: '/Data/Site-Structure/Footer/FooterColumn2/Generic-Link1',
              name: 'Articles',
              displayName: 'Articles',
              fields: {
                link: {
                  value: {
                    class: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    querystring: '',
                    anchor: '',
                    target: '',
                    title: '',
                    linktype: 'internal',
                    text: 'Insights & Articles',
                    url: '/HztlFoundation/BrandX/Home',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '4db6e222-00ea-4cfa-b445-14f2d04157b4',
              url: '/Data/Site-Structure/Footer/FooterColumn2/Generic-Link2',
              name: 'FAQ',
              displayName: 'FAQ',
              fields: {
                link: {
                  value: {
                    text: 'Frequently Asked Questions',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: 'b6e01295-594f-43b7-bafe-3d03deec94a3',
              url: '/Data/Site-Structure/Footer/FooterColumn2/Generic-Link3',
              name: 'Generic Link3',
              displayName: 'Generic Link3',
              fields: {
                link: {
                  value: {
                    text: 'Link3',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: '38e7e904-6636-4e6f-b5e1-2fe9f984cda3',
        url: '/Data/Site-Structure/Footer/FooterColumn3',
        name: 'Company',
        displayName: 'Company',
        fields: {
          columnHeader: {
            value: 'Company',
          },
          columnLinks: [
            {
              id: 'e4a6e4f6-d709-4705-a9fd-932f6757c72e',
              url: '/Data/Site-Structure/Footer/FooterColumn3/Generic-Link1',
              name: 'About Us',
              displayName: 'About Us',
              fields: {
                link: {
                  value: {
                    class: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    querystring: '',
                    anchor: '',
                    target: '',
                    title: '',
                    linktype: 'internal',
                    text: 'Our Story',
                    url: '/HztlFoundation/BrandX/Home',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '3a7f0fb2-911b-42cb-a7cb-6d1b1140c650',
              url: '/Data/Site-Structure/Footer/FooterColumn3/Generic-Link2',
              name: 'Careers',
              displayName: 'Careers',
              fields: {
                link: {
                  value: {
                    text: 'Join Our Team',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{BFC09FC6-22F9-4AA2-8A26-CA200502FB58}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '3fb93d8c-f0e9-49c9-922c-c988f5e5c7f6',
              url: '/Data/Site-Structure/Footer/FooterColumn3/Generic-Link3',
              name: 'Contact',
              displayName: 'Contact',
              fields: {
                link: {
                  value: {
                    text: 'Get in Touch',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: '3ddc6fb6-0a62-4f84-9da8-dd2a58688ec9',
        url: '/Data/Site-Structure/Footer/FooterColumn4',
        name: 'Legal',
        displayName: 'Legal',
        fields: {
          columnHeader: {
            value: 'Legal',
          },
          columnLinks: [
            {
              id: '73d3c5c7-4400-413a-a1c9-117d81291373',
              url: '/Data/Site-Structure/Footer/FooterColumn4/Generic-Link1',
              name: 'Privacy',
              displayName: 'Privacy',
              fields: {
                link: {
                  value: {
                    class: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    querystring: '',
                    anchor: '',
                    target: '',
                    title: '',
                    linktype: 'internal',
                    text: 'Link1',
                    url: '/HztlFoundation/BrandX/Home',
                    href: '/',
                  },
                },
              },
            },
            {
              id: 'c1c174e8-2065-47e8-bcd8-a4a8f5ba6436',
              url: '/Data/Site-Structure/Footer/FooterColumn4/Generic-Link2',
              name: 'Generic Link2',
              displayName: 'Generic Link2',
              fields: {
                link: {
                  value: {
                    text: 'Privacy Policy',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '96519e92-8d4e-46f2-aeb7-c31264296a73',
              url: '/Data/Site-Structure/Footer/FooterColumn4/Generic-Link3',
              name: 'Terms',
              displayName: 'Terms',
              fields: {
                link: {
                  value: {
                    text: 'Terms of Service',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{BFC09FC6-22F9-4AA2-8A26-CA200502FB58}',
                    href: '/',
                  },
                },
              },
            },
          ],
        },
      },
      {
        id: '0aa7757a-ce58-456b-b10d-2802a51beda1',
        url: '/Data/Site-Structure/Footer/Legal',
        name: 'Social',
        displayName: 'Social',
        fields: {
          columnHeader: {
            value: 'Social',
          },
          columnLinks: [
            {
              id: '03b2cf9f-d677-4ddb-ade3-d630fa5b59cb',
              url: '/Data/Site-Structure/Footer/Legal/Terms',
              name: 'LinkedIn',
              displayName: 'LinkedIn',
              fields: {
                link: {
                  value: {
                    text: 'LinkedIn',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '9492d0b9-be34-41ee-a17e-919ed85faaf0',
              url: '/Data/Site-Structure/Footer/Legal/Privacy',
              name: 'Twitter',
              displayName: 'Twitter',
              fields: {
                link: {
                  value: {
                    text: 'Twitter',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: 'ba464b4a-c43b-4f72-9710-c702f92840ce',
              url: '/Data/Site-Structure/Footer/Legal/Cookies',
              name: 'Cookies',
              displayName: 'Cookies',
              fields: {
                link: {
                  value: {
                    text: 'Cookies',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: 'ea1c1333-2088-4568-8c54-ec80128aa08d',
              url: '/Data/Site-Structure/Footer/Legal/License',
              name: 'License',
              displayName: 'License',
              fields: {
                link: {
                  value: {
                    text: 'License',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
            {
              id: '675baaa8-26e3-41ed-9a1d-e87a8503b469',
              url: '/Data/Site-Structure/Footer/Legal/Settings',
              name: 'Settings',
              displayName: 'Settings',
              fields: {
                link: {
                  value: {
                    text: 'Settings',
                    anchor: '',
                    linktype: 'internal',
                    class: '',
                    title: '',
                    target: '|Custom',
                    querystring: '',
                    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
                    href: '/',
                  },
                },
              },
            },
          ],
        },
      },
    ],
    footerDescription: {
      value: 'Design amazing connected experiences that create more happy in the world.<br />',
    },
    socialMediaLinks: [
      {
        id: 'a6f0c6bf-c2e5-46bd-a7fc-72066adc7a5c',
        url: '/Data/Site-Structure/Social-Media/Facebook',
        name: 'Facebook',
        displayName: 'Facebook',
        fields: {
          socialMediaLink: {
            value: {
              href: 'https://www.horizontaldigital.com/',
              linktype: 'external',
              url: 'https://www.horizontaldigital.com/',
              anchor: '',
              target: '_blank',
            },
          },
          socialMediaLogo: {
            value: {
              src: 'assets/footer-facebook.svg',
              alt: 'Facebook',
            },
          },
        },
      },
      {
        id: 'e664cc98-df41-484b-b59b-f5af150d2507',
        url: '/Data/Site-Structure/Social-Media/Instagram',
        name: 'Instagram',
        displayName: 'Instagram',
        fields: {
          socialMediaLink: {
            value: {
              href: 'https://www.instagram.com/hztldigital/',
              linktype: 'external',
              url: 'https://www.instagram.com/hztldigital/',
              anchor: '',
              target: '_blank',
            },
          },
          socialMediaLogo: {
            value: {
              src: 'assets/footer-instagram.svg',
              alt: 'Instagram',
            },
          },
        },
      },
      {
        id: 'ff81cd97-c15a-451e-a012-210f505d82e9',
        url: '/Data/Site-Structure/Social-Media/Pinterest',
        name: 'Pinterest',
        displayName: 'Pinterest',
        fields: {
          socialMediaLink: {
            value: {
              href: 'https://www.horizontaldigital.com/',
              linktype: 'external',
              url: 'https://www.horizontaldigital.com/',
              anchor: '',
              target: '_blank',
            },
          },
          socialMediaLogo: {
            value: {
              src: 'assets/footer-pinterest.svg',
              alt: 'Pinterest',
            },
          },
        },
      },
      {
        id: 'abd363fe-1cc8-44fc-9fb7-9971bc74ff23',
        url: '/Data/Site-Structure/Social-Media/Youtube',
        name: 'Youtube',
        displayName: 'Youtube',
        fields: {
          socialMediaLink: {
            value: {
              href: 'https://www.horizontaldigital.com/',
              linktype: 'external',
              url: 'https://www.horizontaldigital.com/',
              anchor: '',
              target: '_blank',
            },
          },
          socialMediaLogo: {
            value: {
              src: 'assets/footer-youtube.svg',
              alt: 'YouTube',
            },
          },
        },
      },
      {
        id: 'e60a1ffb-93a7-4d82-bd89-8214f636ca04',
        url: '/Data/Site-Structure/Social-Media/Tiktok',
        name: 'Tiktok',
        displayName: 'Tiktok',
        fields: {
          socialMediaLink: {
            value: {
              href: 'https://www.horizontaldigital.com/',
              linktype: 'external',
              url: 'https://www.horizontaldigital.com/',
              anchor: '',
              target: '_blank',
            },
          },
          socialMediaLogo: {
            value: {
              src: 'assets/footer-tiktok.svg',
              alt: 'TikTok',
            },
          },
        },
      },
    ],
  },

  {
    DynamicPlaceholderId: '1',
    FieldNames: 'Default',
  }
);

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
