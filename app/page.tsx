"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => { }, [session,status]);

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'authenticated') {
    if (session.user.userType.name === "admin") {
      return redirect('/admin/churches');
    }
    if (session.user.userType.name === "client") {
      return redirect('/client/giving');
    }
  }

  return redirect('/signin');
}
