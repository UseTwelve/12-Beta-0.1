"use client";

import Link from "next/link";
import AuthHeader from "../auth-header";
import AuthImage from "../auth-image";
import { useEffect, useState } from "react";
import Toast02 from "@/components/toast-02";
import axiosAuth from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let params = new URLSearchParams(window.location.search);
  const token = params.get("token");
      setToken(token)
    }
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setToastErrorOpen(true);
      setTimeout(() => {
        setToastErrorOpen(false);
      }, 5000);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosAuth.post(`/auth/reset-password/${token}`, {
        password,
      });

      if (response.status === 200) {
        setSuccess("Your password has been reset successfully.");
        setToastSuccessOpen(true);
        setTimeout(() => {
          router.push("/signin"); // Redirect to sign in page after success
        }, 3000);
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
                Reset your Password
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
                      htmlFor="password"
                    >
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="on"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="confirmPassword"
                    >
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      className="form-input w-full"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {isLoading ? "Resetting..." : "Reset Password"} {/* Show loading text */}
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
