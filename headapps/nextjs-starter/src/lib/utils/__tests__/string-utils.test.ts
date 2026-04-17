import { parseUrlObject } from '../string-utils';

describe('parseUrlObject', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.PUBLIC_URL = 'https://example.com';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return null for empty input', () => {
    expect(parseUrlObject('')).toBeNull();
  });

  it('should parse fully qualified URLs as is', () => {
    const url = parseUrlObject('https://test.com/path?query=value#hash');
    expect(url?.href).toBe('https://test.com/path?query=value#hash');
    expect(url?.origin).toBe('https://test.com');
    expect(url?.pathname).toBe('/path');
    expect(url?.search).toBe('?query=value');
    expect(url?.hash).toBe('#hash');
  });

  it('should handle relative paths by prepending PUBLIC_URL', () => {
    const url = parseUrlObject('/relative/path');
    expect(url?.href).toBe('/relative/path');
    expect(url?.pathname).toBe('/relative/path');
    expect(url?.origin).toBe('');
    expect(url?.protocol).toBe('');
  });

  it('should handle root path correctly', () => {
    const url = parseUrlObject('/');
    expect(url?.href).toBe('/');
    expect(url?.pathname).toBe('/');
    expect(url?.origin).toBe('');
    expect(url?.protocol).toBe('');
  });

  it('should handle query parameters in relative paths', () => {
    const url = parseUrlObject('/path?param=test');
    expect(url?.href).toBe('/path?param=test');
    expect(url?.pathname).toBe('/path');
    expect(url?.search).toBe('?param=test');
    expect(url?.origin).toBe('');
    expect(url?.protocol).toBe('');
  });

  it('should handle hash fragments in relative paths', () => {
    const url = parseUrlObject('/path#section');
    expect(url?.href).toBe('/path#section');
    expect(url?.pathname).toBe('/path');
    expect(url?.hash).toBe('#section');
    expect(url?.origin).toBe('');
    expect(url?.protocol).toBe('');
  });
  it('should return null for invalid URLs', () => {
    expect(parseUrlObject('https://[invalid')).toBeNull();
    expect(parseUrlObject('https://:80')).toBeNull();
  });

  it('should handle URLs with special characters', () => {
    const url = parseUrlObject('https://test.com/path with spaces?q=test value#section-1');
    expect(url?.href).toBe('https://test.com/path%20with%20spaces?q=test%20value#section-1');
    expect(url?.pathname).toBe('/path%20with%20spaces');
    expect(url?.search).toBe('?q=test%20value');
    expect(url?.hash).toBe('#section-1');
  });

  it('should handle URLs with different protocols', () => {
    const url = parseUrlObject('ftp://test.com/file.txt');
    expect(url?.protocol).toBe('ftp:');
    expect(url?.href).toBe('ftp://test.com/file.txt');
  });
});
