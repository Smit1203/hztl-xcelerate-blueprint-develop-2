'use client';

// Global
import { useI18n } from 'next-localization';
import { useCallback } from 'react';

const useDictionary = () => {
  const i18n = useI18n();

  const getDictionaryValue = useCallback(
    (key: string, fallback?: string) => i18n.t(key) ?? fallback,
    [i18n]
  );

  return {
    getDictionaryValue,
  };
};

export default useDictionary;
