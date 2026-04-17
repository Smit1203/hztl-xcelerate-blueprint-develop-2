// Global
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useEnsureSearchUrl = (commitedSearchText: string) => {
  const router = useRouter();

  useEffect(() => {
    if (commitedSearchText) {
      // Create a new URLSearchParams so we don't override other querystrings.
      const query = new URLSearchParams(window.location.search);

      query.set('q', commitedSearchText);

      router.push(
        {
          pathname: window.location.pathname,
          query: query.toString(),
          hash: '',
        },
        undefined,
        { scroll: false }
      );
    }
  }, [commitedSearchText, router]);
};
