"use client";
import LoadingIndicator from '@/components/loading-indicator';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <LoadingIndicator />
    );
  }
  
  if (status === 'authenticated') {
    if (session && session.user && session.user.userType.name === "client" && !session.user.churchInfo) {
      // Redirect user to sign-in page with error query params
      return location.href = "/signin?error=you%20have%20not%20been%20assigned%20to%20any%20church%20yet.";
    }
    
    if (session && session.user && session.user.userType.name === "admin") {
      // Redirect admin user to admin churches page
      return location.href = "/admin/churches";

    }
    
    if (session && session.user && session.user.userType.name === "client") {
      // Redirect client user to client giving page
      return location.href ="/client/giving";
    }
  }

  // Default redirect to sign-in page if not authenticated
  return redirect('/signin');
}
