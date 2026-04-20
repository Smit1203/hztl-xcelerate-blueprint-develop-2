'use client';

import { Lists } from '.generated/Lists/Tab.model';
import { ComponentRendering } from '@sitecore-content-sdk/nextjs';
import React, { createContext, useContext, useState, useMemo } from 'react';

interface TabContextType {
  tabs: Lists.Tab.TabItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};

interface TabContextProviderProps<TEntry> extends React.PropsWithChildren {
  tabs: TEntry[];
}

export function TabContextProvider<TEntry extends ComponentRendering>({
  children,
  tabs,
}: TabContextProviderProps<TEntry>) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.uid ?? '');

  const value = useMemo(
    () => ({
      tabs,
      activeTab,
      setActiveTab,
    }),
    [tabs, activeTab]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}
