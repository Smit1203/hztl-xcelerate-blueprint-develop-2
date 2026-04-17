// Global
import { useSearchResultsSelectedFilters } from '@sitecore-search/react';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Type isn't explicitly exported, so get the type from the return value.
type SearchResultsSelectedFilters = ReturnType<typeof useSearchResultsSelectedFilters>;

/**
 * Ensures that updating facets updates the url, and returns the selected facets from url
 * to pass to useSearchResults.
 * @returns The current selected facets from the url
 */
export const useFacetUrlSync = () => {
  useEnsureFacetUrl();
  return useFacetsFromUrl();
};

/**
 * Updates the url when selected facets change
 */
const useEnsureFacetUrl = () => {
  const router = useRouter();

  // Get selected facets from Sitecore Search
  const selectedFacets = useSearchResultsSelectedFilters();

  // Convert facets into a url fragment
  const rawFacetUrlFragment = facetToUrlFragment(selectedFacets);

  // Call decodeURI to handle escaped characters, e.g. spaces.
  const decodedFacetUrlFragment = decodeURI(rawFacetUrlFragment);

  const currentHash = router.asPath.split('#')[1] ?? '';

  useEffect(() => {
    // Only update if it's changed
    if (currentHash !== decodedFacetUrlFragment) {
      router.push(
        {
          pathname: window.location.pathname,
          // window.location.search includes the '?' if there is a querystring.
          // This caused extra '?' to be added each time.
          // If there is no querystring, there is no '?' so this issue wasn't caught earlier.
          query: window.location.search.replace(/^\?/, ''),
          hash: decodedFacetUrlFragment,
        },
        undefined,
        { scroll: false }
      );
    }
  }, [router, decodedFacetUrlFragment, currentHash]);
};

// Optional prefix to indicate a hash parameter is a facet.  Recommended so as to not override other hash parameters
const FACET_PREFIX = 'f-';

function facetToUrlFragment(selectedFacets: SearchResultsSelectedFilters): string {
  if (!selectedFacets.length) {
    return '';
  }
  const facets: Record<string, string> = {};
  selectedFacets.forEach((facet) => {
    // Depending on when it's called, sometimes it comes as facet.valueLabel, other times it's facet.facetValueText
    const value = facet.valueLabel; // ?? facet.facetValueText;
    if (!value) {
      return;
    }
    // Get the key, e.g. a facet of "color" would return "f-color"
    const key = FACET_PREFIX + facet.facetId;

    // If there are multiple selected facets with the same key, we join them by '|'
    // E.g. "f-color=red|green|blue"
    // If the key doesn't exist, define it as empty string
    if (!facets[key]) {
      facets[key] = '';
    } else {
      // Otherwise add a pipe before we add the value
      facets[key] += '|';
    }
    facets[key] += value;
  });
  const params = new URLSearchParams(facets);

  return params.toString();
}

function useFacetsFromUrl(): SearchResultsSelectedFilters {
  const router = useRouter();

  const hash = router.asPath.split('#')[1] ?? '';

  // Parse the hash parameter as if it were a querystring
  const hashAsQuery = new URLSearchParams('?' + hash);

  const facets: SearchResultsSelectedFilters = [];

  for (const [key, value] of hashAsQuery.entries()) {
    // We only care about the parameters that are facets
    if (!key.startsWith(FACET_PREFIX)) {
      continue;
    }
    // Get the facet id from the key, e.g. "f-color" would return "color"
    const facetId = key.split(FACET_PREFIX)[1];

    // There could be multiple values, e.g. "f-color=red|green|blue"
    const valueArray = value.split('|');

    // Add each value to the list of facets to return
    valueArray.forEach((x) => {
      facets.push({ type: 'text', facetId, facetValueText: x });
    });
  }

  return facets;
}
