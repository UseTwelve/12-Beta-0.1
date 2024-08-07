"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Loading...</p>;


  if (status === 'authenticated') {
    if (session.user.userType.name === "admin") {
      return location.href = "/admin/churches";
       redirect('/admin/churches');
    }
    if (session.user.userType.name === "client") {
      return location.href = "/client/giving";
      return redirect('/client/giving');
    }
  }

  return redirect('/signin');
}