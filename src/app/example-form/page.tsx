import { Box } from "@mui/material";
import { ReactNode } from "react";

import ExampleForm from "@/components/example-form";

export default function ExampleFormPage(): ReactNode {
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
      <ExampleForm />
    </Box>
  );
}
