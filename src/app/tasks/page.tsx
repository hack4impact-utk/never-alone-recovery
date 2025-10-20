import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function TasksPage(): ReactNode {
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
      Tasks
    </Box>
  );
}
