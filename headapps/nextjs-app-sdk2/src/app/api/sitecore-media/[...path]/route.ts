import { NextRequest, NextResponse } from 'next/server';

// Headers we MUST drop before forwarding upstream. Sitecore's IIS uses
// X-Forwarded-* to compute media URLs and throws a runtime 500 when the
// host looks like localhost. Hop-by-hop headers (RFC 7230 §6.1) shouldn't
// cross a proxy boundary either.
const STRIP_REQUEST_HEADERS = new Set([
  'host',
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'x-forwarded-host',
  'x-forwarded-proto',
  'x-forwarded-for',
  'x-forwarded-port',
  'x-real-ip',
  'forwarded',
  'cookie',
]);

// Response hop-by-hop / encoding headers that confuse Next's response
// pipeline. Length is recomputed downstream; encoding is already decoded
// by fetch.
const STRIP_RESPONSE_HEADERS = ['content-encoding', 'content-length', 'transfer-encoding'];

const buildUpstreamUrl = (apiHost: string, segments: string[], search: string) => {
  const base = apiHost.replace(/\/$/, '');
  const path = segments.map(encodeURIComponent).join('/');
  return `${base}/-/${path}${search}`;
};

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const apiHost = process.env.SITECORE_API_HOST;
  if (!apiHost) {
    return new NextResponse('SITECORE_API_HOST is not configured', { status: 500 });
  }

  const { path } = await ctx.params;
  if (!path?.length) {
    return new NextResponse('Bad request', { status: 400 });
  }

  const upstream = buildUpstreamUrl(apiHost, path, req.nextUrl.search);

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!STRIP_REQUEST_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstream, {
      method: req.method,
      headers,
      redirect: 'follow',
      cache: 'no-store',
    });
  } catch (err) {
    return new NextResponse(`Upstream fetch failed: ${(err as Error).message}`, { status: 502 });
  }

  const resHeaders = new Headers(upstreamRes.headers);
  STRIP_RESPONSE_HEADERS.forEach((h) => resHeaders.delete(h));

  // Default cache policy if upstream didn't set one. Media is content-addressed
  // by hash query param, so it's safe to cache aggressively at the edge.
  if (!resHeaders.has('cache-control') && upstreamRes.ok) {
    resHeaders.set('cache-control', 'public, max-age=3600, s-maxage=86400, immutable');
  }

  return new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    statusText: upstreamRes.statusText,
    headers: resHeaders,
  });
}

export const GET = proxy;
export const HEAD = proxy;
