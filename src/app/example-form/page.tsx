import { Box } from "@mui/material";
import { ReactNode } from "react";

import ExampleForm from "@/components/example-form";

export default function ExampleFormPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ExampleForm />
    </Box>
  );
}
