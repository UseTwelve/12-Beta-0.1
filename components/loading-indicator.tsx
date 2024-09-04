"use client";
import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';

export default function LoadingIndicator() {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
      <OrbitProgress variant="track-disc" color={color} size="medium" text="Loading..." textColor={textColor} />
    </div>
    );
}