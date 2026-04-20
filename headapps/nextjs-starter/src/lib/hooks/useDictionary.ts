'use client';

import { useMessages } from 'next-intl';
import { useCallback, useMemo } from 'react';

const useDictionary = () => {
  const messages = useMessages() as Record<string, Record<string, string>> | undefined;

  const dict = useMemo(() => {
    if (!messages) return {};
    const siteName = Object.keys(messages)[0];
    return (siteName ? messages[siteName] : {}) ?? {};
  }, [messages]);

  const getDictionaryValue = useCallback(
    (key: string, fallback?: string) => dict[key] ?? fallback,
    [dict]
  );

  return {
    getDictionaryValue,
  };
};

export default useDictionary;
