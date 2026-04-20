import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export interface RevalidateRequestBody {
  url?: string;
  secret?: string;
  siteName?: string;
}

export async function POST(req: NextRequest): Promise<Response> {
  console.info('On Demand Revalidation is called');
  const revalidateRequest = (await req.json()) as RevalidateRequestBody;
  console.info('revalidateRequest', revalidateRequest);

  if (revalidateRequest.secret !== process.env.ISR_REVALIDATE_SECRET) {
    console.info('Failed to revalidate, reason : secret does not match ');
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  try {
    let pathToClear = '/';
    if (revalidateRequest) {
      pathToClear = revalidateRequest?.url || '';
    }
    if (pathToClear === '') {
      return NextResponse.json({ revalidated: false, error: 'No path provided' }, { status: 400 });
    }

    // Transform the URL to match Next.js catch-all route structure
    // Remove leading and trailing slashes and split into segments
    const pathSegments = pathToClear.split('/').filter(Boolean);

    // Check if the first segment is a language code (e.g., 'en', 'es')
    const hasLanguagePrefix = /^[a-z]{2}$/.test(pathSegments[0] || '');
    const languagePrefix = hasLanguagePrefix ? pathSegments[0] : '';
    const remainingSegments = hasLanguagePrefix ? pathSegments.slice(1) : pathSegments;
    // Account whether we need to include sitename in path (only applicable if
    // multisite plugin is enabled)
    const structuredPath = revalidateRequest.siteName
      ? `${languagePrefix ? `/${languagePrefix}` : ''}/_site_${revalidateRequest.siteName}/${remainingSegments.join('/')}`
      : `/${pathSegments.join('/')}`;

    console.info('structured path for revalidation:', structuredPath);
    revalidatePath(structuredPath);

    return NextResponse.json({ revalidated: true, path: structuredPath });
  } catch (err) {
    console.error('error on revalidateRequest', err);
    return NextResponse.json(
      {
        revalidated: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
