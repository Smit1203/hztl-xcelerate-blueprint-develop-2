// Import plugins directly - Content SDK 1.3.2 doesn't require generated file
const feaasPlugin = require('./src/lib/next-config/plugins/feaas.js');
const graphqlPlugin = require('./src/lib/next-config/plugins/graphql.js');
const imagesPlugin = require('./src/lib/next-config/plugins/images.js');
const robotsPlugin = require('./src/lib/next-config/plugins/robots.js');
const sassPlugin = require('./src/lib/next-config/plugins/sass.js');
const sitemapPlugin = require('./src/lib/next-config/plugins/sitemap.js');
const corsHeaderPlugin = require('./src/lib/next-config/plugins/cors-header.js');

const plugins = {
  feaas: typeof feaasPlugin === 'function' ? feaasPlugin : feaasPlugin.default || feaasPlugin,
  graphql:
    typeof graphqlPlugin === 'function' ? graphqlPlugin : graphqlPlugin.default || graphqlPlugin,
  images: typeof imagesPlugin === 'function' ? imagesPlugin : imagesPlugin.default || imagesPlugin,
  robots: typeof robotsPlugin === 'function' ? robotsPlugin : robotsPlugin.default || robotsPlugin,
  sass: typeof sassPlugin === 'function' ? sassPlugin : sassPlugin.default || sassPlugin,
  sitemap:
    typeof sitemapPlugin === 'function' ? sitemapPlugin : sitemapPlugin.default || sitemapPlugin,
  corsHeader: corsHeaderPlugin,
};

const publicUrl = process.env.PUBLIC_URL;

const isVercel = process.env.VERCEL === '1';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Allow easier debugging.
  productionBrowserSourceMaps: process.env.ENABLE_SOURCE_MAPS === 'true',

  // Set assetPrefix to our public URL
  // In Vercel we need to set it to undefined for preview deployments to work
  // Since the preview url will be different from the public url
  // assetPrefix: isVercel ? undefined : publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
    NEXT_PUBLIC_DEFAULT_SITE_NAME: process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME,
    // Only expose the SITECORE_API_HOST on localhost because proxying for media doesn't
    // work anymore from http to https in XMC.
    SITECORE_API_HOST:
      process.env.PUBLIC_URL === 'http://localhost:3000'
        ? process.env.SITECORE_API_HOST
        : undefined,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'es-MX', 'fr-CA', 'ar-AE'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: process.env.SITECORE_DEFAULT_LANGUAGE || 'en',
  },

  // See headapps\nextjs-starter\src\lib\next-config\plugins\images.js
  // images: {},

  // Enable React Strict Mode
  reactStrictMode: true,

  // Disable the X-Powered-By header. Follows security best practices.
  poweredByHeader: false,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${process.env.SITECORE_API_HOST}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${process.env.SITECORE_API_HOST}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${process.env.SITECORE_API_HOST}/sitecore/service/:path*`,
      },
    ];
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      // Add a loader to strip out getComponentServerProps from components in the client bundle
      config.module.rules.unshift({
        test: /src\\components\\.*\.tsx$/,
        use: ['@sitecore-content-sdk\\nextjs\\component-props-loader'],
      });
    } else {
      // Force use of CommonJS on the server for FEAAS SDK since Content SDK also uses CommonJS entrypoint to FEAAS SDK.
      // This prevents issues arising due to FEAAS SDK's dual CommonJS/ES module support on the server (via conditional exports).
      // See https://nodejs.org/api/packages.html#dual-package-hazard.
      config.externals = [
        {
          '@sitecore-feaas/clientside/react': 'commonjs @sitecore-feaas/clientside/react',
          '@sitecore/byoc': 'commonjs @sitecore/byoc',
          '@sitecore/byoc/react': 'commonjs @sitecore/byoc/react',
        },
        ...config.externals,
      ];
    }

    return config;
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  const finalNextConfig = Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
  // console.log('finalNextConfig', JSON.stringify(finalNextConfig, null, 2));
  return finalNextConfig;
};
