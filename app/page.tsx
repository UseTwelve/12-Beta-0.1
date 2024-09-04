"use client";
import LoadingIndicator from '@/components/loading-indicator';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';

export default function Home() {
  const { data: session, status } = useSession();
  const [color, setColor] = useState("#000000"); 
  const [textColor, setTextColor] = useState("#000000"); 

  useEffect(() => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      setColor("#FFFFFF"); 
      setTextColor("#FFFFFF"); 
    } else {
      setColor("#000000"); 
      setTextColor("#000000"); 
    }
  }, []);
  
  if (status === 'loading') {
    return (
      <LoadingIndicator />
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