'use client';

// Global
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useEnsureSearchUrl = (commitedSearchText: string) => {
  const router = useRouter();

  useEffect(() => {
    if (commitedSearchText) {
      const query = new URLSearchParams(window.location.search);
      query.set('q', commitedSearchText);

      router.push(`${window.location.pathname}?${query.toString()}`, { scroll: false });
    }
  }, [commitedSearchText, router]);
};
