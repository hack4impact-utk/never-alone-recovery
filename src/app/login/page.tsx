import { Box } from "@mui/material";
import { ReactNode } from "react";

import LoginCard from "@/components/login-card";

export default function LoginPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginCard />
    </Box>
  );
}
