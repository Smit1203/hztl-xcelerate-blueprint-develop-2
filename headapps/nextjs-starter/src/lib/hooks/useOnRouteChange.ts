'use client';

// Global
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * App Router replacement for Pages Router's `router.events` subscription.
 * Invokes `callback` after the route (pathname or search params) changes.
 * The `events` parameter is kept for backwards compatibility but is ignored;
 * a zero-length array disables the route-change subscription.
 */
export const useOnRouteChange = (
  callback: () => void,
  events: string[] = ['routeChangeComplete'],
  runOnHashChange = false
) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  const isSubscribed = events.length > 0;
  const search = searchParams?.toString() ?? '';

  useEffect(() => {
    if (!isSubscribed) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    callback();
  }, [callback, isSubscribed, pathname, search]);

  useEffect(() => {
    if (!runOnHashChange) return;
    window.addEventListener('hashchange', callback);
    return () => {
      window.removeEventListener('hashchange', callback);
    };
  }, [callback, runOnHashChange]);
};

export function useOnHashChange(callback: () => void) {
  return useOnRouteChange(callback, ['routeChangeComplete'], true);
}
