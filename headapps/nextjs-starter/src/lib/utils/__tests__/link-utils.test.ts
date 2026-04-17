import React from 'react';
import { parseLink } from '../link-utils';
import { LinkField, LinkFieldValue } from '@sitecore-content-sdk/nextjs';

// Mock data for testing
const mockFieldValue: LinkFieldValue = {
  href: 'https://example.com',
  text: 'Example Link',
};

const mockField: LinkField = {
  value: mockFieldValue,
};

// Test cases

describe('parseLink', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    process.env.PUBLIC_URL = 'https://example.com';
  });

  afterEach(() => {
    process.env = originalEnv;
  });
  it('should return shouldRender as false if no URL is provided', () => {
    const result = parseLink();
    expect(result.shouldRender).toBe(false);
  });

  it('should parse a valid URL and return shouldRender as true', () => {
    const result = parseLink(mockField);
    expect(result.shouldRender).toBe(true);
    expect(result.parsedUrl?.href).toBe('https://example.com/');
  });

  it('should handle internal anchors correctly', () => {
    const result = parseLink({ value: { href: '#section' } } as LinkField);
    expect(result.isInternalAnchor).toBe(true);
    expect(result.parsedUrl?.href).toBe('#section');
  });

  it('should merge query strings correctly', () => {
    const result = parseLink({
      value: { href: 'https://example.com', querystring: 'param=value' },
    });
    expect(result.parsedUrl?.href).toBe('https://example.com/?param=value');
    expect(result.parsedUrl?.search).toBe('?param=value');
  });

  it('should override anchor with field value', () => {
    const result = parseLink({
      value: { href: 'https://example.com', anchor: 'top' },
    } as LinkField);
    expect(result.parsedUrl?.hash).toBe('#top');
    expect(result.parsedUrl?.href).toBe('https://example.com/#top');
  });

  it('should return realText based on field value', () => {
    const result = parseLink(mockField);
    expect(result.realText).toBe('Example Link');
  });

  it('should return empty realText if children are present and showLinkTextWithChildrenPresent is false', () => {
    const result = parseLink(mockField, React.createElement('div', null, 'Child'), false);
    expect(result.realText).toBe('');
  });

  it('should return realText if children are present and showLinkTextWithChildrenPresent is true', () => {
    const result = parseLink(mockField, React.createElement('div', null, 'Child'), true);
    expect(result.realText).toBe('Example Link');
  });

  it('should handle custom protocols correctly', () => {
    const result = parseLink({ value: { href: 'mailto:example@example.com' } } as LinkField);
    expect(result.parsedUrl?.href).toBe('mailto:example@example.com');
  });

  it('should handle empty links correctly', () => {
    const result = parseLink({ value: { href: '' } } as LinkField);
    expect(result.shouldRender).toBe(false);
  });

  it('should handle local hash links correctly', () => {
    const result = parseLink({ value: { href: '#section' } } as LinkField);
    expect(result.isInternalAnchor).toBe(true);
    expect(result.parsedUrl?.href).toBe('#section');
    expect(result.parsedUrl?.hash).toBe('#section');
  });

  it('should remove duplicate hash symbols in anchors', () => {
    const result = parseLink({
      value: { href: 'https://example.com', anchor: '##top' },
    } as LinkField);
    expect(result.parsedUrl?.hash).toBe('#top');
    expect(result.parsedUrl?.href).toBe('https://example.com/#top');
  });

  it('should merge query strings correctly', () => {
    const result = parseLink({
      value: { href: 'https://example.com?existing=param', querystring: 'new=param' },
    });
    expect(result.parsedUrl?.href).toBe('https://example.com/?existing=param&new=param');
    expect(result.parsedUrl?.search).toBe('?existing=param&new=param');
  });

  it('should not display text if children are present and showLinkTextWithChildrenPresent is false', () => {
    const result = parseLink(mockField, React.createElement('div', null, 'Child'), false);
    expect(result.realText).toBe('');
  });

  it('should display text if children are present and showLinkTextWithChildrenPresent is true', () => {
    const result = parseLink(mockField, React.createElement('div', null, 'Child'), true);
    expect(result.realText).toBe('Example Link');
  });

  it('should handle undefined href with anchor correctly', () => {
    const result = parseLink({ value: { href: undefined, anchor: 'section' } } as LinkField);
    expect(result.shouldRender).toBe(true);
    expect(result.parsedUrl?.href).toBe('#section');
    expect(result.parsedUrl?.hash).toBe('#section');
    expect(result.isInternalAnchor).toBe(true);
  });

  it('should handle root path correctly', () => {
    const result = parseLink({ value: { href: '/' } } as LinkField);
    expect(result.shouldRender).toBe(true);
    expect(result.parsedUrl?.href).toBe('/');
    expect(result.parsedUrl?.pathname).toBe('/');
  });
});
