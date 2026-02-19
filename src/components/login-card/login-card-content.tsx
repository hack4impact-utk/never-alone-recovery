import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
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
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Image
          src="/NeverAloneRecoveryLogo.svg"
          alt="NAR Logo"
          width={400}
          height={400}
          style={{ height: "auto" }}
          priority
        />
      </Box>
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
