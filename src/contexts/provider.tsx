import React, { createContext, useState, ReactNode } from 'react';

interface SorveteriaContextType {
  defaultValue: () => void;
  teste: any
  setTeste: any
  // Add other properties if needed
}

export const defaultContextValue: SorveteriaContextType = {
  defaultValue: () => {},
  teste: {},
  setTeste: () => {}
  // Initialize other properties
};

export const SorveteriaContext = createContext<SorveteriaContextType>(defaultContextValue);

interface SorveteriaProviderProps {
  children: ReactNode;
}

export const SorveteriaProvider: React.FC<SorveteriaProviderProps> = ({ children }) => {
  const [teste, setTeste] = useState()
  return (
    <SorveteriaContext.Provider value={{...defaultContextValue, teste, setTeste}}>
      {children}
    </SorveteriaContext.Provider>
  );
};
