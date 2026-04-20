'use client';

import { usePathname } from 'next/navigation';
import { extractPath } from '@sitecore-content-sdk/nextjs/utils';

/**
 * The path name on the server includes our rewritten path, which is different from on the client
 * This causes a hydration error.  Use the pathExtractor to get the real path.
 * @returns
 */
export function useRealPathName() {
  const pathName = usePathname();
  const path = extractPath({ params: { path: pathName ?? undefined } });
  return path;
}
