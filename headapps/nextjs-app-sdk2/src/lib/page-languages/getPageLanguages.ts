import graphqlClientFactory from 'lib/graphql-client-factory';

export interface ItemLanguage {
  isoCode: string;
  countryCode: string;
  nativeName: string;
}

const CountryOverride: Record<string, string | undefined> = {
  en: 'US',
};

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

export async function getPageLanguages(
  itemId: string,
  language: string
): Promise<ItemLanguage[]> {
  if (!itemId) return [];

  const client = graphqlClientFactory();
  const result = await client.request<GetPageLanguagesType>(LANGUAGE_QUERY, {
    path: itemId,
    language,
  });

  return (
    result.item?.languages.map((x) => ({
      isoCode: x.language.name,
      countryCode:
        CountryOverride[x.language.name] ?? x.language.name.split('-')[1] ?? 'US',
      nativeName: x.language.nativeName,
    })) ?? []
  );
}

export default getPageLanguages;
