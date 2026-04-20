'use client';

import { Environment, PageController, WidgetsProvider } from '@sitecore-search/react';
import { useRouter } from 'next/router';

type WidgetsProviderProps = Parameters<typeof WidgetsProvider>[0];

export function SitecoreSearchWidgetsProviderWrapper({ children, ...props }: WidgetsProviderProps) {
  const { locale } = useRouter();

  const apiKey = process.env.NEXT_PUBLIC_SITECORE_SEARCH_API_KEY || props.apiKey;
  const customerKey = process.env.NEXT_PUBLIC_SITECORE_SEARCH_CUSTOMER_KEY || props.customerKey;
  const sitecoreSearchEnv = process.env.NEXT_PUBLIC_SITECORE_SEARCH_ENV || props.env;
  if (!apiKey || !customerKey) {
    console.warn('Sitecore Search API key or Customer Key not provided');
    // We need to return early here.  If configuration isn't correct, the entire site will break
    // return children;
    // return (
    //   <div>
    //     Sitecore Search API key or Customer Key not provided
    //     <pre>{JSON.stringify({ apiKey, customerKey }, null, 2)}</pre>
    //   </div>
    // );

    console.warn(
      'Sitecore Search API key or Customer Key not provided. Search functionality disabled.'
    );
    return <>{children}</>;
  }

  const localValues = splitLanguageAndCountry(locale);
  PageController.getContext().setLocaleLanguage(localValues.language);
  PageController.getContext().setLocaleCountry(localValues.country);

  return (
    <WidgetsProvider
      apiKey={apiKey}
      customerKey={customerKey}
      env={sitecoreSearchEnv as Environment}
      publicSuffix={true}
      {...props}
    >
      {children}
    </WidgetsProvider>
  );
}

function splitLanguageAndCountry(inputValue?: string) {
  const defaultCountry = 'us';
  // Fallback to empty string if input is undefined
  const value = inputValue || '';
  // Split by "-" (e.g., "en-US")
  const [language = '', country = defaultCountry] = value.split('-');
  return {
    language: language.toLowerCase(),
    country: country.toLowerCase(),
  };
}
