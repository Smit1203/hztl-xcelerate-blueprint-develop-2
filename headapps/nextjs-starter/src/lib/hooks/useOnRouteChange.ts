'use client';

// Global
import { RouterEvent, useRouter } from 'next/router';
import { useEffect } from 'react';

export const useOnRouteChange = (
  callback: () => void,
  events: RouterEvent[] = ['routeChangeComplete'],
  runOnHashChange = false
) => {
  const router = useRouter();

  // Ensures that we don't needless attach and detach events due to depencency changing
  const eventString = events.join('|');
  useEffect(() => {
    const events = eventString.length > 0 ? (eventString.split('|') as RouterEvent[]) : [];
    events.forEach((eventName) => router.events.on(eventName, callback));

    return () => {
      events.forEach((eventName) => router.events.off(eventName, callback));
    };
  }, [callback, eventString, router.events]);

  useEffect(() => {
    if (runOnHashChange) {
      window.addEventListener('hashchange', callback);
    }

    return () => {
      if (runOnHashChange) {
        window.removeEventListener('hashchange', callback);
      }
    };
  }, [callback, runOnHashChange]);
};

export function useOnHashChange(callback: () => void) {
  return useOnRouteChange(callback, ['routeChangeComplete'], true);
}
