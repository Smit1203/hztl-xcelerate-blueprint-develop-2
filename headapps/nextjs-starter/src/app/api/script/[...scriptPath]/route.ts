import { NextRequest, NextResponse } from 'next/server';
import graphqlClientFactory from 'lib/graphql-client-factory';
import { Content } from '.generated/Content/CodeEmbed.model';
import { isGuid } from 'lib/utils/string-utils';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ scriptPath: string[] }> };

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

export async function GET(req: NextRequest, ctx: RouteContext): Promise<Response> {
  const { scriptPath } = await ctx.params;

  if (!scriptPath || !Array.isArray(scriptPath)) {
    console.warn(`[api/script.handler] no scriptPath param`);
    return NextResponse.redirect(new URL('/404', req.url));
  }

  const itemPath = scriptPath.join('/').replaceAll('.js', '');
  const fullScriptPath = `${isGuid(itemPath) ? '' : '/'}` + itemPath;
  const scriptContent = await getScriptByPath(fullScriptPath);

  if (!scriptContent) {
    console.warn(
      `[api/script.handler] no item or script content found for script path:`,
      fullScriptPath
    );
    return NextResponse.redirect(new URL('/404', req.url));
  }

  return new NextResponse(scriptContent, {
    status: 200,
    headers: { 'content-type': 'application/javascript' },
  });
}
