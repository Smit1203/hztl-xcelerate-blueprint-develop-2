'use client';

import { useCallback } from 'react';
import { useMessages } from 'next-intl';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const useDictionary = () => {
  const { page } = useSitecore();
  const siteName = page?.siteName || '';
  const messages = useMessages() as Record<string, Record<string, string> | undefined>;
  const namespace = messages?.[siteName];

  const getDictionaryValue = useCallback(
    (key: string, fallback?: string): string => {
      const value = namespace?.[key];
      if (typeof value === 'string' && value.length > 0) return value;
      return fallback ?? key;
    },
    [namespace]
  );

  return { getDictionaryValue };
};

export default useDictionary;
