"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { OrbitProgress } from 'react-loading-indicators';

export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <OrbitProgress variant="track-disc" color="#000000" size="medium" text="Loading..." textColor="#000000" />
      </div>
    );
  }

  if (status === 'authenticated') {
    if (session.user.userType.name === "admin") {
      return location.href = "/admin/churches";
    }
    if (session.user.userType.name === "client") {
      return location.href = "/client/giving";
    }
  }

  return redirect('/signin');
}
