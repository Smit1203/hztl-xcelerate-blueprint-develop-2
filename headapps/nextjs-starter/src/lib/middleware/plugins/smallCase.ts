import { NextRequest, NextResponse } from 'next/server';
import { Middleware } from '@sitecore-content-sdk/nextjs/middleware';

class SmallCaseMiddleware implements Middleware {
  /**
   * exec async method - Redirects to lowercase URL if URL is not lowercase
   * @param req<NextRequest>
   * @param res?<NextResponse>
   * @returns Promise<NextResponse>
   */
  async handle(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const response = res ?? NextResponse.next();
    const { pathname } = req.nextUrl;
    if (pathname === pathname.toLowerCase()) {
      return response;
    }
    const url = req.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }
}

export const smallCaseMiddleware = new SmallCaseMiddleware();
