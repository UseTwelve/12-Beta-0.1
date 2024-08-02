"use client"

import Link from 'next/link'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { signIn } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const [error, setError] = useState(searchParams?.get('error'));

  useEffect(() => {
    if (error) {
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, '', url);
    }
  }, [error]);

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      setError(result.error); // Handle error by setting state
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100vh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Welcome back!</h1>
              {error && <p className="text-red-500">{error}</p>} {/* Display the error message */}
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input id="email" className="form-input w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" className="form-input w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="on" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link href="/reset-password" className="text-sm underline hover:no-underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <button type="submit" className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3">Sign In</button>
                </div>
              </form>
              {/* <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                <div className="text-sm">
                  Don't have an account? <Link href="/signup" className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400">
                    Sign Up
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  );
}
