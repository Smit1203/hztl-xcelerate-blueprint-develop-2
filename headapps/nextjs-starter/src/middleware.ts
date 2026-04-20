import { type NextRequest, type NextFetchEvent, NextResponse } from 'next/server';
import { defineMiddleware } from '@sitecore-content-sdk/nextjs/middleware';
import scConfig from 'sitecore.config';
import { multisiteMiddleware } from 'lib/middleware/plugins/multisite';
import { localeMiddleware } from 'lib/middleware/plugins/locale';
import { redirectsMiddleware } from 'lib/middleware/plugins/redirects';
import { personalizeMiddleware } from 'lib/middleware/plugins/personalize';
import { smallCaseMiddleware } from 'lib/middleware/plugins/smallCase';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Skip middlewares only if neither Edge nor local API configuration is available.
  // Middlewares can work with either Edge (contextId) or local (apiHost/apiKey) configuration.
  if (!scConfig.api?.edge?.contextId && !scConfig.api?.local?.apiHost) {
    return NextResponse.next();
  }

  return defineMiddleware(
    multisiteMiddleware,
    localeMiddleware,
    redirectsMiddleware,
    personalizeMiddleware,
    smallCaseMiddleware
  ).exec(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 7. all root files inside /public
   */
  matcher: ['/', '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg).*)'],
};
