"use client";

import axios from "lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refreshToken", {
      token: session?.tokens.refreshToken,
    });

    if (session) {
      session.tokens.accessToken = res.data.accessToken;
      session.tokens.refreshToken = res.data.refreshToken;
    } else {
      
      signIn();
    }
  };
  return refreshToken;
};
