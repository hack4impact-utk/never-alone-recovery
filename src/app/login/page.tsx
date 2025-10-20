import { Box } from "@mui/material";
import { ReactNode } from "react";

import LoginCard from "@/components/login-card";

export default function LoginPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginCard />
    </Box>
  );
}
