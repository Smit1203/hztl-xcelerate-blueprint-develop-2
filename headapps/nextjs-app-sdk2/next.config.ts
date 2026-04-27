import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',
  
  // Enable React Strict Mode
  reactStrictMode: true,

  // Disable the X-Powered-By header. Follows security best practices.
  poweredByHeader: false,

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
      // Sitecore XM Cloud edge / experience hosts
      { protocol: 'https', hostname: 'edge*.**', port: '' },
      { protocol: 'https', hostname: 'xmc-*.**', port: '' },
      // Sitecore Cloud (XM Cloud + Content Hub ONE/DAM tenants)
      { protocol: 'https', hostname: '*.sitecorecloud.io', port: '' },
      { protocol: 'https', hostname: '**.sitecorecloud.io', port: '' },
      // Sitecore Content Hub DAM
      { protocol: 'https', hostname: '*.cloud.contenthub.com', port: '' },
      { protocol: 'https', hostname: '**.cloud.contenthub.com', port: '' },
      { protocol: 'https', hostname: '*.sitecorecontenthub.cloud', port: '' },
      { protocol: 'https', hostname: '**.sitecorecontenthub.cloud', port: '' },
      // Local proxy (so /-/media/... goes through next/image without
      // unoptimized=true in production)
      { protocol: 'http', hostname: 'localhost', port: '' },
    ],
    // Include mobile and tablet widths so responsive images are served at appropriate sizes
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable image optimization in development to avoid upstream timeouts
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Sitemap, robots, and AI JSON endpoints via rewrites; handlers live under app/api/
  rewrites: async () => {
    return [
      {
        // Sitecore media library URLs come back from the layout service
        // as relative paths like /-/media/Project/.../foo.png. Route them
        // through our header-stripping proxy because Next's built-in
        // rewrite proxy attaches X-Forwarded-* headers that make Sitecore
        // IIS throw an ASP.NET 500.
        source: '/-/:path*',
        destination: '/api/sitecore-media/:path*',
        locale: false,
      },
      {
        // sitemap.xml serves the main sitemap
        source: '/sitemap.xml',
        destination: '/api/sitemap',
        locale: false,
      },
      {
        // Numbered sitemap index pages (e.g. /sitemap-0.xml, /sitemap-1.xml)
        source: '/sitemap-:id(\\d+).xml',
        destination: '/api/sitemap',
        locale: false,
      },
      {
        // LLM-optimized sitemap for AI crawler ingestion
        source: '/sitemap-llm.xml',
        destination: '/api/sitemap-llm',
        locale: false,
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
        locale: false,
      },
      {
        source: '/llms.txt',
        destination: '/api/llms-txt',
        locale: false,
      },
      {
        source: '/ai/summary.json',
        destination: '/api/ai/summary',
        locale: false,
      },
      {
        source: '/ai/faq.json',
        destination: '/api/ai/faq',
        locale: false,
      },
      {
        source: '/ai/service.json',
        destination: '/api/ai/service',
        locale: false,
      },
      {
        source: '/ai/markdown/:path*',
        destination: '/api/ai/markdown/:path*',
        locale: false,
      },
      {
        source: '/.well-known/ai.txt',
        destination: '/api/well-known/ai-txt',
        locale: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
