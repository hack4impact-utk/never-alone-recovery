import { signIn } from "next-auth/react";

export const handleLogin = (callbackUrl?: string | null | undefined): void => {
  if (!callbackUrl) {
    callbackUrl = undefined;
  }

  void signIn("google", { callbackUrl });
};
