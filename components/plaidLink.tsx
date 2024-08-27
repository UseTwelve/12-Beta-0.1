import React, { useCallback, useEffect, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/hooks/usePlaid";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

const PlaidLink = () => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [token, setToken] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(axiosAuth);

      setToken(data?.link_token);
    };

    getLinkToken();
  }, [session]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken(axiosAuth, public_token);
      router.push("/");
    },
    [session]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button
      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150"
      onClick={() => open()}
    >
      Connect bank
    </button>
  );
};

export default PlaidLink;
