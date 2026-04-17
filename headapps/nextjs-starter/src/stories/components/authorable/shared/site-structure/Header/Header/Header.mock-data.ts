import { SiteStructure } from '.generated/SiteStructure/Header.model';
import { createComponentMockData } from 'lib/testing/rendering-mock';

export const defaultData = createComponentMockData<SiteStructure.Header.Header_Component>(
  'Header',
  {
    logo: {
      value: {
        src: 'https://dummyimage.com/50x50',
        alt: 'Horizontal Digital',
        width: '60',
        height: '45',
      },
    },
    logoLink: {
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
    navigationList: [
      {
        displayName: '',
        id: 'C66695A69283458A817B779BAAD2B4CB',

        name: 'Services',
        fields: {
          megaMenuList: [],
          navigationLink: {
            value: {
              anchor: '',
              class: '',
              href: '/Services',
              id: '{0E789CBB-8DE4-4B66-AC09-69B1A4359003}',
              linktype: 'internal',
              querystring: '',
              target: '',
              text: '',
              title: '',
            },
          },

          navigationTitle: {
            value: 'Services',
          },
        },
      },

      {
        displayName: '',
        id: '333B5DD687CC4F01BDFAFF106333A26D',
        name: 'Work',
        fields: {
          navigationLink: {
            value: {
              anchor: '',
              class: '',
              href: '/Work',
              id: '{17215E7D-7E44-45A8-A5E5-E9411CBCF28D}',
              linktype: 'internal',
              querystring: '',
              text: '',
              title: '',
            },
          },

          navigationTitle: {
            value: 'Work',
          },
          megaMenuList: [
            {
              id: '4875973C501943169037B64965FBA072',
              name: 'Work',
              fields: {
                megaMenuTitle: {
                  value: 'Work',
                },

                megaMenuLinks: [
                  {
                    id: '1394A48895914D53BA7E54A2EBA896FD',
                    name: 'Link1',
                    fields: {
                      link: {
                        value: {
                          text: 'Link1',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: 'Link1',
                          target: '',
                          querystring: '',
                          id: '{E9ABAFA1-377C-4577-A419-9A311044D435}',
                          href: '/',
                        },
                      },
                    },
                    url: '',
                    displayName: '',
                  },
                  {
                    id: '9067A7FA8F7C47AB949A53A7EC71AC33',
                    name: 'Link5',
                    fields: {
                      link: {
                        value: {
                          text: 'Link5',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '',
                          querystring: '',
                          id: '{0E789CBB-8DE4-4B66-AC09-69B1A4359003}',
                          href: '/Services',
                        },
                      },
                    },
                    url: '',
                    displayName: '',
                  },
                  {
                    id: 'A9FEA5E77C0C43A3B3C68FA98356386C',
                    name: 'Link3',
                    fields: {
                      link: {
                        value: {
                          text: 'Link3',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '|Custom',
                          querystring: '',
                          id: '{E9ABAFA1-377C-4577-8719-9A3A8044D435}',
                          href: '/',
                        },
                      },
                    },
                    url: '',
                    displayName: '',
                  },
                ],
              },
            },
            {
              id: 'CE259D3D4D1D4AD999FA45E8D9266878',
              name: 'Category 2',
              fields: {
                megaMenuTitle: {
                  value: 'Category 2',
                },
                megaMenuLinks: [
                  {
                    id: 'A8B6DB466E0547629BDE808502D7CBAE',
                    name: 'Link4',
                    fields: {
                      link: {
                        value: {
                          text: 'Link4',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '|Custom',
                          querystring: '',
                          id: '{E9AB35A1-377C-4577-A419-9A3A8044D435}',
                          href: '/',
                        },
                      },
                    },
                    url: '',
                    displayName: '',
                  },
                  {
                    id: '21E9F7FF676542A6ACBFF0F18ACF0B53',
                    name: 'Link2',
                    fields: {
                      link: {
                        value: {
                          href: '/',
                          text: 'Link2',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '|Custom',
                          querystring: '',
                        },
                      },
                    },
                    url: '',
                    displayName: '',
                  },
                  {
                    id: '59244927EEE24B07B8A7D086ECDC1A5E',
                    name: 'Link6',
                    fields: {
                      link: {
                        value: {
                          text: 'Link6',
                          anchor: '',
                          linktype: 'internal',
                          class: '',
                          title: '',
                          target: '|Custom',
                          querystring: '',
                          id: '{E9ABAFA1-377C-4577-A419-976A8044D435}',
                          href: '/',
                        },
                      },
                    },
                    url: '',
                    displayName: '',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        displayName: '',
        id: '469F54C045B24FD2866764AAC54CFA76',
        name: 'About Us',
        url: '',
        fields: {
          navigationLink: {
            value: {
              anchor: '',
              class: '',
              href: '/About-Us',
              id: '72ef333d-7bcb-466f-adb5-55b41989ee0a',
              linktype: 'internal',
              querystring: '',
              target: '',
              text: '',
              title: '',
            },
          },

          navigationTitle: {
            value: 'About Us',
          },
          megaMenuList: [],
        },
      },
      {
        id: 'AF18415D498145B4A2A8738FA72AA167',
        name: 'Contact Us',
        fields: {
          navigationTitle: {
            value: 'Contact Us',
          },
          navigationLink: {
            value: {
              text: '',
              anchor: '',
              linktype: 'internal',
              class: '',
              title: '',
              target: '',
              querystring: '',
              id: '{D30D13EC-CC3D-4970-8710-075332066E1B}',
              href: '/Contact-Us',
            },
          },

          megaMenuList: [],
        },
        url: '',
        displayName: '',
      },
      // {
      //   id: 'EE0E9CEA6DCB47C483D88865C2C602E6',
      //   name: 'Card List',
      //   navigationTitle: {
      //     jsonValue: {
      //       value: 'Card List',
      //     },
      //   },
      //   navigationLink: {
      //     jsonValue: {
      //       value: {
      //         text: '',
      //         anchor: '',
      //         linktype: 'internal',
      //         class: '',
      //         title: '',
      //         target: '',
      //         querystring: '',
      //         id: '{7D31BB28-DBA7-4679-A69B-F9A05CA7BE38}',
      //         href: '/Work/CardList-Page',
      //       },
      //     },
      //   },
      //   megaMenuList: {
      //     items: [],
      //   },
      //   url: '',
      //   displayName: '',
      // },
    ],
    regionList: [
      {
        id: '57b1e073-b02d-49ca-b66b-f327ff3586a1',
        url: '/Data/Site-Structure/Region/North-America',
        name: 'North America',
        displayName: 'North America',
        fields: {
          regionName: {
            value: 'North America',
          },
          languageList: [
            {
              id: 'af584191-45c9-4201-8740-5409f4cf8bdd',
              url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/system/Languages/en',
              name: 'en',
              displayName: 'en',
              fields: {
                'Base Culture': { value: '' },
                'Fallback Region Display Name': { value: '' },
                Charset: { value: '' },
                'Code page': { value: '' },
                Dictionary: { value: 'en-US.tdf' },
                Encoding: { value: '' },
                'Fallback Language': { value: '' },
                Iso: { value: 'en' },
                'Regional Iso Code': { value: 'en-US' },
                'WorldLingo Language Identifier': { value: '' },
              },
            },
            {
              id: 'aaa125bd-e0b3-4663-ae2d-01d7d90e5a82',
              url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/system/Languages/fr-CA',
              name: 'fr-CA',
              displayName: 'fr-CA',
              fields: {
                'Base Culture': { value: '' },
                'Fallback Region Display Name': { value: '' },
                Charset: { value: 'iso-8859-1' },
                'Code page': { value: '65001' },
                Dictionary: { value: '' },
                Encoding: { value: 'utf-8' },
                'Fallback Language': { value: 'es-MX' },
                Iso: { value: 'fr' },
                'Regional Iso Code': { value: 'fr-CA' },
                'WorldLingo Language Identifier': { value: '' },
              },
            },
          ],
        },
      },
      {
        id: '5228ac53-dee1-4764-8c82-e0815f6c82d9',
        url: '/Data/Site-Structure/Region/South-America',
        name: 'South America',
        displayName: 'South America',
        fields: {
          regionName: {
            value: 'South America',
          },
          languageList: [
            {
              id: 'bc4b7f80-6137-4095-b97f-467c1a13df2f',
              url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/system/Languages/pt-BR',
              name: 'pt-BR',
              displayName: 'pt-BR',
              fields: {
                'Base Culture': { value: '' },
                'Fallback Region Display Name': { value: '' },
                Charset: { value: 'iso-8859-1' },
                'Code page': { value: '65001' },
                Dictionary: { value: '' },
                Encoding: { value: 'utf-8' },
                'Fallback Language': { value: 'en' },
                Iso: { value: 'pt' },
                'Regional Iso Code': { value: 'pt-BR' },
                'WorldLingo Language Identifier': { value: '' },
                countryCode: { value: 'BR' },
              },
            },
            {
              id: 'bf231c92-697e-42a8-802e-a7159871f9c6',
              url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/system/Languages/es-MX',
              name: 'es-MX',
              displayName: 'es-MX',
              fields: {
                'Base Culture': { value: '' },
                'Fallback Region Display Name': { value: '' },
                Charset: { value: 'iso-8859-1' },
                'Code page': { value: '65001' },
                Dictionary: { value: '' },
                Encoding: { value: 'utf-8' },
                'Fallback Language': { value: 'en' },
                Iso: { value: 'es' },
                'Regional Iso Code': { value: 'es-MX' },
                'WorldLingo Language Identifier': { value: '' },
                countryCode: { value: 'MX' },
              },
            },
          ],
        },
      },
      {
        id: '00236181-17e8-4e52-89e7-91f6fdd9edbb',
        url: '/Data/Site-Structure/Region/Asia-Pacific',
        name: 'Asia Pacific',
        displayName: 'Asia Pacific',
        fields: {
          regionName: {
            value: 'Asia Pacific',
          },
          languageList: [
            {
              id: '9f307a0c-5540-45c5-b39d-13bbb2113968',
              url: 'https://xmc-horizontald4ecc-hztlxcelera396c-dev9275.sitecorecloud.io/en/sitecore/system/Languages/ar-AE',
              name: 'ar-AE',
              displayName: 'ar-AE',
              fields: {
                'Base Culture': { value: '' },
                'Fallback Region Display Name': { value: '' },
                Charset: { value: 'windows-1256' },
                'Code page': { value: '65001' },
                Dictionary: { value: '' },
                Encoding: { value: 'utf-8' },
                'Fallback Language': { value: 'en' },
                Iso: { value: 'ar' },
                'Regional Iso Code': { value: 'ar-AE' },
                'WorldLingo Language Identifier': { value: '' },
                countryCode: { value: 'AE' },
              },
            },
          ],
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
