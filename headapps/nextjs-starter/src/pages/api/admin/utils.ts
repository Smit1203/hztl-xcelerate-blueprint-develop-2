import { NextApiResponse } from 'next';
import { GetItemUrl } from 'lib/webhook/revalidate/graphql';
import { TGetItemUrlRoot, TSitecoreItemQueryResult } from 'lib/webhook/revalidate/type';
import graphqlClientFactory from 'lib/graphql-client-factory';

export function fetchItemUrlQuery(id: string, lang: string): Promise<TGetItemUrlRoot> {
  const graphQLClient = graphqlClientFactory({});

  const result = graphQLClient.request<TGetItemUrlRoot>(GetItemUrl, {
    id: id,
    lang: lang,
  });

  return result;
}

export async function fetchItemUrl(
  itemId: string,
  lang: string
): Promise<TSitecoreItemQueryResult> {
  const data = await fetchItemUrlQuery(itemId, lang);
  if (data?.item?.url) {
    const retval = {
      url: data?.item?.url,
      language: data?.item?.language?.name,
      slug: data?.item?.slug?.url,
      slugAncestor: data?.item?.ancestors?.[0]?.displayName,
    };
    return retval;
  }
  return {} as TSitecoreItemQueryResult;
}

export async function revalidate(res: NextApiResponse, pathToClear: string): Promise<boolean> {
  let revalidated = false;
  try {
    await res.revalidate(pathToClear);
    revalidated = true;
  } catch (err) {
    console.info('error on revalidateRequest', err);
  }
  return revalidated;
}
