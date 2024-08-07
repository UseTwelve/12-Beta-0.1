"use client";
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  if (status === 'loading') return <p>Loading...</p>;
  
  if (session && !sessionStorage.getItem('reloaded')) {
    sessionStorage.setItem('reloaded', 'true');
    location.reload();
  }
  console.log(session)

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