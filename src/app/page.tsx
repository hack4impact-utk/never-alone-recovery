import { Box } from "@mui/material";
import { ReactNode } from "react";

import HomeCard from "@/components/home-card";

export default function HomePage(): ReactNode {
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
      <HomeCard />
    </Box>
  );
}
