import { NextApiRequest, NextApiResponse } from 'next';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { Content } from '.generated/Content/CodeEmbed.model';
import { isGuid } from 'lib/utils/string-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { scriptPath } = req.query;

  if (!scriptPath) {
    console.warn(`[api/script.handler] no scriptPath param`);
    return res.redirect('/404');
  }

  if (!Array.isArray(scriptPath)) {
    console.warn(`[api/script.handler] scriptPath is not a full path`);
    return res.redirect('/404');
  }

  // Handle local/site/shared datasource paths
  const itemPath = scriptPath.join('/').replaceAll('.js', '');
  const fullScriptPath = `${isGuid(itemPath) ? '' : '/'}` + itemPath;
  const scriptContent = await getScriptByPath(fullScriptPath);

  if (!scriptContent) {
    console.warn(
      `[api/script.handler] no item or script content found for script path:`,
      fullScriptPath
    );
    return res.redirect('/404');
  }

  return res.status(200).setHeader('content-type', 'application/javascript').send(scriptContent);
}

async function getScriptByPath(scriptPath: string | undefined): Promise<string | undefined> {
  if (!scriptPath) {
    return undefined;
  }
  const graphQLClient = graphqlClientFactory({ fetch: fetch });
  const result = await graphQLClient.request<CodeEmbedScriptData>(CodeEmbedScriptQuery, {
    path: scriptPath,
    language: 'en',
  });

  return result?.item?.script?.jsonValue?.value;
}

type CodeEmbedScriptData = {
  item: Content.CodeEmbed.CodeEmbedJson;
};

const CodeEmbedScriptQuery = `
query CodeEmbedScriptQuery ($path: String!, $language: String!) {
  item: item(path: $path, language: $language) {
    id
    path
    ... on CodeEmbed {
      script {
        jsonValue
      }
    }
  }
}`;
