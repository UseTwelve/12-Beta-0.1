"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { OrbitProgress } from 'react-loading-indicators';
import { useEffect, useState } from 'react';

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
      <div className="flex items-center justify-center min-h-screen">
        <OrbitProgress variant="track-disc" color={color} size="medium" text="Loading..." textColor={textColor} />
      </div>
    );
  }

  if (status === 'authenticated') {
    if (session.user.userType.name === "admin") {
      return location.href = "/link-account";
    }
    if (session.user.userType.name === "client") {
      return location.href = "/link-account";
    }
  }

  return redirect('/link-account');
}
