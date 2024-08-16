"use client";

import Link from "next/link";
import AuthHeader from "../auth-header";
import AuthImage from "../auth-image";
import { useState } from "react";
import Toast02 from "@/components/toast-02";
import axiosAuth from "@/lib/axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await axiosAuth.post("/auth/forgot-password", {
        email,
      });

      if (response.status === 200) {
        setSuccess("A reset link has been sent to your email address.");
        setToastSuccessOpen(true);
      } else {
        setError("Something went wrong. Please try again.");
        setToastErrorOpen(true);
      }
    } catch (err) {
      setError(
        (err as any).response?.data?.message || "An error occurred. Please try again."
      );
      setToastErrorOpen(true);
    } finally {
      setIsLoading(false); // Hide loading indicator after the process is complete
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
                Forgot your Password
              </h1>
              <Toast02
                type="error"
                open={toastErrorOpen}
                setOpen={setToastErrorOpen}
              >
                {error}
              </Toast02>
              <Toast02
                type="success"
                open={toastSuccessOpen}
                setOpen={setToastSuccessOpen}
              >
                {success}
              </Toast02>
              {/* Form */}
              <form onSubmit={onSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="on"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
                    disabled={isLoading} // Disable the button while loading
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}{" "}
                    {/* Show loading text */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
