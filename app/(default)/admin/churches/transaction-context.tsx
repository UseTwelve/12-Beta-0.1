// useChurchDetail.ts
'use client'

import { createContext, useContext, useState } from 'react';
import { Record } from './invoices-table';

interface ChurchDetailContextProps {
  church: Record | null;
  setChurch: (church: Record | null) => void;
}

const ChurchDetailContext = createContext<ChurchDetailContextProps | undefined>(undefined);

export const ChurchDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [church, setChurch] = useState<Record | null>(null);
  return (
    <ChurchDetailContext.Provider value={{ church, setChurch }}>
      {children}
    </ChurchDetailContext.Provider>
  );
}

export const useChurchDetail = () => {
  const context = useContext(ChurchDetailContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
}
