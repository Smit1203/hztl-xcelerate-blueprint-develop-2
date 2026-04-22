'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const useDictionary = () => {
  const { page } = useSitecore();
  const siteName = page?.siteName || '';
  const t = useTranslations(siteName);

  const getDictionaryValue = useCallback(
    (key: string, fallback?: string): string => {
      try {
        const value = t(key);
        return value === key ? fallback ?? key : value;
      } catch {
        return fallback ?? key;
      }
    },
    [t]
  );

  return { getDictionaryValue };
};

export default useDictionary;
