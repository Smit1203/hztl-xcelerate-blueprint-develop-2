/**
 * Normalizes Sitecore media URLs to relative paths that go through Next.js rewrites.
 * This eliminates CORS issues by ensuring media requests go through the Next.js proxy
 * instead of being fetched directly from the XM Cloud host.
 *
 * @param url - The media URL (absolute or relative)
 * @param sitecoreApiHost - Optional Sitecore API host to match against (for server-side usage)
 * @returns A relative URL starting with "/-/" if it's a Sitecore media URL, otherwise returns the original URL
 */
export function normalizeMediaUrl(
  url: string | undefined | null,
  sitecoreApiHost?: string
): string | undefined {
  if (!url) {
    return undefined;
  }

  // If already relative, return as-is
  if (url.startsWith('/')) {
    return url;
  }

  // If not an absolute URL, return as-is
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return url;
  }

  try {
    const urlObj = new URL(url);

    // Check if this is a Sitecore media URL (pathname starts with /-/media/)
    if (!urlObj.pathname.startsWith('/-/media/')) {
      // Not a Sitecore media URL, return as-is
      return url;
    }

    // Get the configured Sitecore API host if not provided
    if (!sitecoreApiHost) {
      if (typeof window === 'undefined') {
        // Server-side: import jssConfig
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const scConfig = require('sitecore.config');
        sitecoreApiHost = scConfig.api?.local?.apiHost;
      } else {
        // Client-side: import config
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const scConfig = require('sitecore.config');
        sitecoreApiHost = scConfig.api?.local?.apiHost;
      }
    }

    // If we have a configured host, check if the URL matches it
    if (sitecoreApiHost) {
      // Normalize both URLs for comparison (remove trailing slashes, protocol)
      const normalizedApiHost = sitecoreApiHost.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const normalizedUrlHost = urlObj.hostname;

      if (normalizedUrlHost === normalizedApiHost || urlObj.origin.includes(normalizedApiHost)) {
        // URL matches Sitecore API host - convert to relative path
        return `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
      }
    }

    // Fallback: Check if URL matches XM Cloud pattern (xmc-horizontald*.sitecorecloud.io)
    // This handles cases where sitecoreApiHost might not be set but we still want to normalize XM Cloud URLs
    const xmCloudPattern = /^https?:\/\/xmc-horizontald[\w-]+-[\w-]+-[\w]+\.sitecorecloud\.io/i;
    if (xmCloudPattern.test(urlObj.origin)) {
      // XM Cloud URL - convert to relative path
      return `${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
    }

    // Not a Sitecore media URL we recognize, return as-is
    return url;
  } catch (_error) {
    // Invalid URL, return as-is
    return url;
  }
}
