import { Box } from "@mui/material";
import { ReactNode } from "react";

import IntakeForm from "@/components/intake-form";

export default function IntakeFormPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IntakeForm />
    </Box>
  );
}
