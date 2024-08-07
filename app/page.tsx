"use client";
import { useSession } from 'next-auth/react';
import { redirect,useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {

    if(session)  router.refresh();
   }, [session,status]);

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