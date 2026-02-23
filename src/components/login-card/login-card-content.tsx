import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";

import { handleLogin } from "@/utils/auth/handle-login";

type LoginCardContentProps = {
  status: "loading" | "authenticated" | "unauthenticated";
  callbackUrl: string | null;
};

export default function LoginCardContent({
  status,
  callbackUrl,
}: LoginCardContentProps): ReactNode {
  if (status === "loading" || status === "authenticated") {
    return (
      <Typography variant="h6" color="text.secondary">
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5">Please Sign In</Typography>
      <Typography color="text.secondary" mb={2}>
        Sign in to access your account information
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => handleLogin(callbackUrl)}
      >
        Sign In with Google
      </Button>
    </>
  );
}
