// Global
import { useSearchParams } from 'next/navigation';
import React, { JSX } from 'react';

// Local
import { PageSpecific } from '.generated/PageSpecific/SearchResult.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import SearchResultsWidget from 'widgets/SearchResult';
import { getTestProps } from 'lib/testing/utils';
import { useSiteSettings } from 'lib/hooks/sitecore/context';

export type SearchResultProps = PageSpecific.SearchResult.SearchResult_Component;

const SearchResults = (props: SearchResultProps): JSX.Element => {
  const useKeyphrase = (): string => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    return searchQuery;
  };
  const siteSettings = useSiteSettings();
  // Get search sources from site settings
  const globalSources = siteSettings?.globalSearchSourceId?.value;

  // Parse pipe-separated sources into array
  const sources = [
    ...(globalSources
      ? globalSources
          .split('|')
          .map((s) => s.trim())
          .filter((s) => s)
      : []),
  ];
  const rfkid = siteSettings?.globalSearchWidgetId?.value;
  const id = props?.params?.RenderingIdentifier;
  return (
    <section
      id={id ? id : undefined}
      data-component="authorable/shared/page-specific/searchresult/searchresult"
      {...getTestProps(`component-search-result-${props?.rendering?.uid}`)}
    >
      <SearchResultsWidget
        rfkId={rfkid || ''}
        defaultKeyphrase={useKeyphrase()}
        key={`${useKeyphrase()}-search`}
        searchSources={sources}
      />
    </section>
  );
};

export const Default = withStandardComponentWrapper(SearchResults);
