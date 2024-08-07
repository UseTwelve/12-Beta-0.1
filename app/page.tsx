"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.userType.name === "admin") {
        router.push('/admin/churches');
      } else if (session.user.userType.name === "client") {
        router.push('/client/giving');
      }
    } else if (status !== 'loading') {
      router.push('/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return null; // Return null since the redirects handle all cases
}
