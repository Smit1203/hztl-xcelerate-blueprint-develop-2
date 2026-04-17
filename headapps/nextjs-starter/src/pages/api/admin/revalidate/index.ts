import type { NextApiRequest, NextApiResponse } from 'next';

export default handler;
export interface revalidateRequest {
  url?: string;
  secret?: string;
  siteName?: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.info('On Demand Revalidation is called');
  const revalidateRequest = req.body as revalidateRequest;
  let revalidated = false;
  console.info('revalidateRequest', revalidateRequest);

  if (revalidateRequest.secret !== process.env.ISR_REVALIDATE_SECRET) {
    console.info('Failed to revalidate, reason : secret does not match ');
    return res.status(401).json({ revalidated: false, error: 'Invalid secret' });
  }

  try {
    let pathToClear = '/';
    if (revalidateRequest) {
      pathToClear = revalidateRequest?.url || '';
    }
    if (pathToClear === '') {
      return res.status(400).json({ revalidated: false, error: 'No path provided' });
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
    await res.revalidate(structuredPath);
    revalidated = true;

    return res.json({ revalidated, path: structuredPath });
  } catch (err) {
    console.error('error on revalidateRequest', err);
    return res
      .status(500)
      .json({ revalidated: false, error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
