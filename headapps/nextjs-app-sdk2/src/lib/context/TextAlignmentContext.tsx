'use client';

import React, { createContext, useContext } from 'react';

export type TextAlignment = 'Left' | 'Center' | 'Right';

interface TextAlignmentContextType {
  textAlignment: TextAlignment;
}

const TextAlignmentContext = createContext<TextAlignmentContextType>({
  textAlignment: 'Left',
});

export const useTextAlignment = () => useContext(TextAlignmentContext);

interface TextAlignmentProviderProps {
  children: React.ReactNode;
  textAlignment: TextAlignment;
}

export const TextAlignmentProvider: React.FC<TextAlignmentProviderProps> = ({
  children,
  textAlignment,
}) => {
  return (
    <TextAlignmentContext.Provider value={{ textAlignment }}>
      {children}
    </TextAlignmentContext.Provider>
  );
};
