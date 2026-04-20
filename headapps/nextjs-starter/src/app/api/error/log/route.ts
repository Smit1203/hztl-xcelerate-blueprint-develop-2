import { NextRequest, NextResponse } from 'next/server';
import scConfig from 'sitecore.config';
import client from 'lib/sitecore-client';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest): Promise<Response> {
  const locale = req.nextUrl.searchParams.get('language') || scConfig.defaultLanguage;
  const error = req.nextUrl.searchParams.get('error') ?? undefined;

  if (error) {
    console.error('Client side error:');
    try {
      console.error(JSON.parse(error));
    } catch {
      console.error(error);
    }
  }

  const errorPages = await client.getErrorPages({
    site: scConfig.defaultSite,
    locale,
  });

  return new NextResponse(errorPages?.serverErrorPagePath ?? '', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
