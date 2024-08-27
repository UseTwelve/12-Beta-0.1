"use client";
import React, { useCallback, useEffect, useState } from "react";
import ChannelImage03 from "@/public/images/image.png";
import twelveLogo from "@/public/images/twelve.jpg";
import Image from "next/image";
import PlaidLink from "@/components/PlaidLink";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "@/lib/hooks/usePlaid";

export default function LinkAccountPage() {
  const axiosAuth = useAxiosAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(axiosAuth);

      setToken(data?.link_token);
    };

    getLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken(axiosAuth, public_token);
    },
    []
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center bg-gray-50 p-8 lg:p-0">
        <div className="max-w-md mx-auto text-center lg:text-left">
          <span className="flex items-center justify-center lg:justify-start mb-5">
            <Image
              src={twelveLogo}
              alt="Twelve Logo"
              width={34}
              height={34}
              className="mr-1"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 text-gray-900">
              Twelve
            </h1>
          </span>
          <h1 className="text-3xl font-bold mb-1 text-gray-900">Link Account</h1>
          <p className="text-gray-500 mb-8">Generate customized financial plans for your org's goals and needs</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150"
            onClick={() => open()}
          >
            Connect bank
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex justify-center items-center bg-blue-50 p-8 lg:p-0">
        <Image
          src={ChannelImage03}
          alt="Dashboard Preview"
          className="w-full lg:w-3/4 shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
}
