const contentSecurityPolicy = require('../../csp/csp-settings');

/**
 * @param {import('next').NextConfig} nextConfig
 */
const corsHeaderPlugin = (nextConfig = {}) => {
  // Flip CORS logic: default enabled, disable only if DISABLE_CORS is set
  const disableCors = process.env.DISABLE_CORS?.toLowerCase() === 'true';
  if (disableCors) {
    //console.log('CORS is disabled in the environment, not recommended');
    return nextConfig;
  }

  // Use CSP_REPORT_ONLY env variable to control report-only mode
  const cspReportOnly = process.env.CSP_REPORT_ONLY?.toLowerCase() === 'true';
  const cspHeaderKey = cspReportOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy';

  return Object.assign({}, nextConfig, {
    async headers() {
      // Get the Content Security Policy Directives for the head tag
      const cspDirectives = await contentSecurityPolicy.getCSPDirectives();

      if (!cspDirectives) {
        return [];
      }

      const extendHeaders =
        typeof nextConfig.headers === 'function' ? await nextConfig.headers() : [];
      return [
        ...(await extendHeaders),
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains',
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: cspHeaderKey,
              value: cspDirectives,
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Cross-Origin-Resource-Policy',
              value: 'cross-origin',
            },
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'unsafe-none',
            },
          ],
        },
        {
          source: '/_next/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: process.env.SITECORE_API_HOST.replace(/\/$/, ''),
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-Requested-With, Content-Type, Authorization',
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
          ],
        },
      ];
    },
  });
};

module.exports = corsHeaderPlugin;
