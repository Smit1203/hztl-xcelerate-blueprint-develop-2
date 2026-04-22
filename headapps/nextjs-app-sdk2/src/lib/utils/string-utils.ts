/**
 * Matches a protocol (e.g. http:, https:, ftp:, mailto:, etc.)
 */
const PROTOCOL_REGEX = /^[a-z][a-z0-9\+\-\.]+\:/i;

export function parseUrlObject(src: string): UrlWithRelativePath | null {
  if (!src) {
    return null;
  }
  try {
    const publicURL = (process.env.PUBLIC_URL as string) ?? 'https://example.com';

    // If it's a fully qualified url, use it as is, otherwise include the public url

    if (src.match(PROTOCOL_REGEX)) return new URL(src);
    const urlWithDummyDomain = new URL(src, new URL(publicURL));
    const removeLeadingSlash = src.startsWith('#') || src.startsWith('?');
    return new UrlWithRelativePath(urlWithDummyDomain, removeLeadingSlash);
  } catch {
    return null;
  }
}

export class UrlWithRelativePath {
  href: string;
  pathname: string;
  protocol: string;
  origin: string;
  search: string;
  hash: string;

  constructor(url: URL, removeLeadingSlash: boolean = false) {
    this.href = url.href.replace(url.origin, '');
    if (removeLeadingSlash) {
      this.href = this.href.replace(/^\//, '');
    }
    this.pathname = url.pathname;
    this.protocol = '';
    this.origin = '';
    this.search = url.search;
    this.hash = url.hash;
  }
  toString() {
    return this.href;
  }
  toJSON() {
    return this.href;
  }
}

// Validate GUID format
export function isGuid(value: string) {
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return guidRegex.test(value);
}

/*
Replace tokens in the given text with respective values
*/
export interface ReplacementToken {
  key: string;
  value: string;
}

export function tokenReplace(text: string | undefined, tokens: ReplacementToken[] | undefined) {
  // Replace each tokens
  if (text && tokens && tokens.length > 0) {
    tokens?.forEach((token) => {
      text = text?.replace(token.key, token.value);
    });
  }
  return text;
}

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns The string with its first letter capitalized
 * @example
 * capitalizeFirstLetter('hello') // returns 'Hello'
 * capitalizeFirstLetter('world') // returns 'World'
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
