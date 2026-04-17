import { LinkField, LinkFieldValue } from '@sitecore-content-sdk/nextjs';
import { parseUrlObject, UrlWithRelativePath } from './string-utils';
import { ComponentProps } from 'lib/component-props';

export interface ParsedLink {
  shouldRender: boolean;
  isInternalAnchor: boolean;
  isCustomProtocol: boolean;
  realText: string;
  parsedUrl?: UrlWithRelativePath;
}

export function parseLink(
  field?: LinkField | LinkFieldValue,
  children?: React.ReactNode,
  showLinkTextWithChildrenPresent?: boolean
): ParsedLink {
  const fieldValue: LinkFieldValue = {
    ...((field as LinkField)?.value ?? (field as LinkFieldValue)),
  };

  let realHref = fieldValue.href ?? '';

  // There's an issue in Page Builder where 'http://' is added
  // when it's not present.  This is fine normally, but there are cases
  // where it behaves oddly.
  const hrefWithoutHttp = fieldValue.href?.replace(/^https?\:\/\//, '');

  // Empty links should not have https:// added
  const isEmpty = !hrefWithoutHttp;
  // Hash without the rest of the url should not have https:// added
  const isLocalHash = !!hrefWithoutHttp?.startsWith('#') || (isEmpty && !!fieldValue.anchor);

  // Custom protocols (e.g. tel:, mailto: and other custom ones like whatsapp:) should not have https:// added
  const isCustomProtocol = !!hrefWithoutHttp?.match(/^[a-z][a-z0-9\+\-\.]+\:/i);

  if (isEmpty && fieldValue.anchor) {
    realHref = `#${fieldValue.anchor}`.replace(/^#+/, '#');
  } else if (isLocalHash || isCustomProtocol) {
    realHref = hrefWithoutHttp ?? '';
  }
  // Parse the url
  const parsedUrl = parseUrlObject(realHref ?? '');

  const realText = getRealText(fieldValue, showLinkTextWithChildrenPresent, children, parsedUrl);

  // If there's no url, don't render it.
  if (!parsedUrl) {
    const href = realHref ?? '';
    if (isLocalHash || isCustomProtocol) {
      return {
        shouldRender: true,
        isInternalAnchor: isLocalHash,
        isCustomProtocol,
        realText: realText,
        parsedUrl: { ...emptyUrlLikeObject, hash: isLocalHash ? href : '', href: href },
      };
    }
    return { shouldRender: false, isInternalAnchor: isLocalHash, isCustomProtocol, realText: '' };
  }

  // If explicitly set, override and remove duplicate hash symbols
  if (fieldValue.anchor) {
    parsedUrl.hash = `#${fieldValue.anchor}`.replace(/^#+/, '#');
  }

  // If query param set, merge it with what was parsed on the main href
  if (fieldValue.querystring) {
    const params = new URLSearchParams(parsedUrl.search ?? '');
    const queryParams = new URLSearchParams(fieldValue.querystring);

    // Merge the params
    queryParams.forEach((value, key) => {
      params.set(key, value);
    });

    parsedUrl.search = `?${params}`;
  }

  // These need to be rendered with a normal <a> tag
  const isInternalAnchor = realHref.startsWith('#');

  // Rebuild the final href after updates
  parsedUrl.href = parsedUrl.toString();

  // Render if we have an href after all the processing
  const shouldRender = !!parsedUrl.href;

  return { shouldRender, isInternalAnchor, isCustomProtocol, realText, parsedUrl };
}

// Returns a URL object that represents a hash link.  Since the hash is not part of the url,
// it's not included in the URL object.  This function manually builds the URL object.
const emptyUrlLikeObject = {
  href: '',
  hash: '',
  host: '',
  hostname: '',
  origin: '',
  password: '',
  pathname: '',
  port: '',
  protocol: '',
  search: '',
  searchParams: new URLSearchParams(),
  username: '',
  toJSON: function (): string {
    return JSON.stringify({ ...this, toJSON: undefined });
  },
};

function getRealText(
  fieldValue: LinkFieldValue,
  showLinkTextWithChildrenPresent: boolean | undefined,
  children: React.ReactNode,
  parsedUrl: UrlWithRelativePath | null
) {
  let realText = fieldValue.text;

  const showText = showLinkTextWithChildrenPresent || !children;
  if (!showText) {
    // If we don't show text, set it to empty
    realText = '';
  } else if (!realText) {
    // Otherwise if there's no text, set it to the
    realText = parsedUrl?.href?.startsWith('/') ? parsedUrl.href.slice(1) : (parsedUrl?.href ?? '');
  }
  return realText;
}

export const getScriptUrl = (isNormalMode: boolean, datasource: ComponentProps): string => {
  // Only use the publicUrl in a non-normal-mode situation (preview mode, usually)
  const publicUrl = isNormalMode ? '' : process.env.PUBLIC_URL;

  let datasourcePath = datasource.rendering.dataSource;
  if (datasourcePath && datasourcePath[0] !== '/') {
    datasourcePath = `/${datasourcePath}`;
  }

  return `${publicUrl}/api/script${datasourcePath}.js`;
};
