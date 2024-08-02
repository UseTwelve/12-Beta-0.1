"use client"
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import axiosAuth from "../axios";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  let retryCount = 0;  // Variable to keep track of refresh token retries

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.tokens?.accessToken}`;
          config.headers["x-refresh"] = `${session?.tokens?.refreshToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          if (retryCount >= 2) {  // Check if the retry count has reached 2
            signIn();  // Redirect to sign-in page
            return Promise.reject(error);
          }
          prevRequest.sent = true;
          retryCount++;  // Increment the retry count
          await refreshToken();
          // Update the headers with refreshed tokens after attempting to refresh them
          prevRequest.headers["Authorization"] = `Bearer ${session?.tokens?.accessToken}`;
          prevRequest.headers["x-refresh"] = `${session?.tokens?.refreshToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
