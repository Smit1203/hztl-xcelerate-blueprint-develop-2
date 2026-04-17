const micromatch = require('micromatch');
const makeRe = micromatch.makeRe;

/**
 * @param {import('next').NextConfig} nextConfig
 */
const imagesPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    images: nextConfigImages,
  });
};

/** @type {import('next/dist/shared/lib/image-config').ImageConfig} */
const nextConfigImages = {
  dangerouslyAllowSVG: true,
  // Update patterns here
  remotePatterns: [
    {
      hostname: 'edge.sitecorecloud.io',
    },
    {
      hostname: '*.placeholder.com',
    },
    // From latest XMC Starter.  We may need to be more restrictive if security is a concern.
    {
      protocol: 'https',
      hostname: 'edge*.**',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 'xmc-*.**',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 'feaas*.blob.core.windows.net',
      port: '',
    },
  ],
};

module.exports = imagesPlugin;
module.exports.isValidNextImageDomain = isValidNextImageDomain;
module.exports.nextConfigImages = nextConfigImages;

/**
 * @param {string | undefined} src
 */
function isValidNextImageDomain(src) {
  if (!src) {
    return false;
  }
  if (src.startsWith('/')) {
    return true;
  }
  try {
    const url = new URL(src);
    if (nextConfigImages.remotePatterns.some((p) => matchRemotePattern(p, url))) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * @param {import('next/dist/shared/lib/image-config').ImageConfig} pattern
 * @param {URL} url
 * @returns {boolean}
 */
function matchRemotePattern(pattern, url) {
  if (pattern.protocol !== undefined) {
    const actualProto = url.protocol.slice(0, -1);
    if (pattern.protocol !== actualProto) {
      return false;
    }
  }
  if (pattern.port !== undefined) {
    if (pattern.port !== url.port) {
      return false;
    }
  }

  if (pattern.hostname === undefined) {
    throw new Error(`Pattern should define hostname but found\n${JSON.stringify(pattern)}`);
  } else {
    if (!makeRe(pattern.hostname).test(url.hostname)) {
      return false;
    }
  }

  if (!makeRe(pattern.pathname ?? '**').test(url.pathname)) {
    return false;
  }

  return true;
}
