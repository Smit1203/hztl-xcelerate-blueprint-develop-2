// Global

// Local
import { CustomSitecorePageProps } from 'lib/page-props';
import { Plugin } from 'lib/page-props-factory';
import graphqlClientFactory from 'lib/graphql-client-factory';

// Manual override, otherwise we'll try to parse from the language, i.e. "es-MX" would return "MX"
// This is mostly for when we use "en" instead of "en-US", but can be expanded for other scenarios.
const CountryOverride: Record<string, string | undefined> = {
  en: 'US',
};

class PageLanguagesPlugin implements Plugin {
  order = 4;

  async exec(props: CustomSitecorePageProps) {
    if (props.notFound || !props.page) return props;

    const graphqlClient = graphqlClientFactory();

    const result = await graphqlClient.request<GetPageLanguagesType>(LANGUAGE_QUERY, {
      path: props.page?.layout.sitecore.route?.itemId ?? '',
      language: props.page?.locale ?? '',
    });

    props.page.layout.sitecore.context.languages =
      result.item?.languages.map((x) => ({
        isoCode: x.language.name,
        countryCode: CountryOverride[x.language.name] ?? x.language.name.split('-')[1] ?? 'US',
        nativeName: x.language.nativeName,
      })) ?? [];

    return props;
  }
}

export const pageLanguagesPlugin = new PageLanguagesPlugin();

export interface ItemLanguage {
  isoCode: string;
  countryCode: string;
  nativeName: string;
}

type GetPageLanguagesType = {
  item?: {
    languages: {
      language: {
        name: string;
        nativeName: string;
      };
    }[];
  };
};

// If TypeScript error, ensure GraphQL version matches what's used by JSS.
// Currently "graphql": "~16.9.0"
const LANGUAGE_QUERY = `
  query GetPageLanguages($path: String!, $language: String = "en") {
    item(language: $language, path: $path) {
      languages {
        language {
          name
          nativeName
        }
      }
    }
  }
`;
