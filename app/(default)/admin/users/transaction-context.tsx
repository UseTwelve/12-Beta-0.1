// useMemberDetail.ts
'use client'

import { Member } from '@/types/church-member';
import { createContext, useContext, useState } from 'react';

interface MemberDetailContextProps {
  member: Member | null;
  setMember: (member: Member | null) => void;
}

const MemberDetailContext = createContext<MemberDetailContextProps | undefined>(undefined);

export const MemberDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [member, setMember] = useState<Member | null>(null);
  return (
    <MemberDetailContext.Provider value={{ member, setMember }}>
      {children}
    </MemberDetailContext.Provider>
  );
}

export const useMemberDetail = () => {
  const context = useContext(MemberDetailContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}
