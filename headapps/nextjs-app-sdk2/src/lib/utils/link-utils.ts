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

  const hrefWithoutHttp = fieldValue.href?.replace(/^https?\:\/\//, '');

  const isEmpty = !hrefWithoutHttp;
  const isLocalHash = !!hrefWithoutHttp?.startsWith('#') || (isEmpty && !!fieldValue.anchor);

  const isCustomProtocol = !!hrefWithoutHttp?.match(/^[a-z][a-z0-9\+\-\.]+\:/i);

  if (isEmpty && fieldValue.anchor) {
    realHref = `#${fieldValue.anchor}`.replace(/^#+/, '#');
  } else if (isLocalHash || isCustomProtocol) {
    realHref = hrefWithoutHttp ?? '';
  }
  const parsedUrl = parseUrlObject(realHref ?? '');

  const realText = getRealText(fieldValue, showLinkTextWithChildrenPresent, children, parsedUrl);

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

  if (fieldValue.anchor) {
    parsedUrl.hash = `#${fieldValue.anchor}`.replace(/^#+/, '#');
  }

  if (fieldValue.querystring) {
    const params = new URLSearchParams(parsedUrl.search ?? '');
    const queryParams = new URLSearchParams(fieldValue.querystring);

    queryParams.forEach((value, key) => {
      params.set(key, value);
    });

    parsedUrl.search = `?${params}`;
  }

  const isInternalAnchor = realHref.startsWith('#');

  parsedUrl.href = parsedUrl.toString();

  const shouldRender = !!parsedUrl.href;

  return { shouldRender, isInternalAnchor, isCustomProtocol, realText, parsedUrl };
}

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
    realText = '';
  } else if (!realText) {
    realText = parsedUrl?.href?.startsWith('/') ? parsedUrl.href.slice(1) : (parsedUrl?.href ?? '');
  }
  return realText;
}

export const getScriptUrl = (isNormalMode: boolean, datasource: ComponentProps): string => {
  const publicUrl = isNormalMode ? '' : process.env.PUBLIC_URL;

  let datasourcePath = datasource.rendering.dataSource;
  if (datasourcePath && datasourcePath[0] !== '/') {
    datasourcePath = `/${datasourcePath}`;
  }

  return `${publicUrl}/api/script${datasourcePath}.js`;
};
