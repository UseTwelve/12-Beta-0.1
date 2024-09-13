"use client";

import Link from "next/link";
import AuthHeader from "../auth-header";
import AuthImage from "../auth-image";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Toast02 from "@/components/toast-02";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading indicator

  useEffect(() => {
    if (typeof window !== "undefined") {
      let params = new URLSearchParams(window.location.search);
      let searchParams = params.get("error");
      setError(searchParams);

      if (searchParams) {
        setToastErrorOpen(true);

        // Automatically close the toast after 5 seconds and then remove the query parameter
        setTimeout(() => {
          setToastErrorOpen(false);
          
          // Remove the error parameter from the URL after the toast disappears
          const url = new URL(window.location.href);
          url.searchParams.delete("error");
          window.history.replaceState({}, "", url);
        }, 7000);
      }
    }
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    setError(null); // Clear previous errors

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    setIsLoading(false); // Hide loading indicator

    if (result?.error) {
      setError(result.error); // Handle error by setting state
      setToastErrorOpen(true);

      // Automatically close the toast after 5 seconds
      setTimeout(() => {
        setToastErrorOpen(false);
      }, 5000);
    } else {
      window.location.href = "/";
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true); // Show loading indicator
    setError(null); // Clear previous errors

    try {
      await signIn('google', { callbackUrl:"/" });
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100vh] h-full flex flex-col after:flex-1">
            <AuthHeader />
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
                Welcome back!
              </h1>
              <Toast02
                type="error"
                open={toastErrorOpen}
                setOpen={setToastErrorOpen}
              >
                {error}
              </Toast02>
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      href="/forgot-password"
                      className="text-sm underline hover:no-underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Signing In..." : "Sign In"} {/* Show loading text */}
                  </button>
                </div>
              </form>
              {/* OR Divider */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    OR
                  </span>
                </div>
              </div>
              <div className="mt-4">
                {/* Google Sign-In Button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="btn bg-red-500 hover:bg-red-600 text-white w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In with Google"} {/* Show loading text */}
                </button>
              </div>
            </div>
          </div>
        </div>
        <AuthImage />
      </div>
    </main>
  );
}
