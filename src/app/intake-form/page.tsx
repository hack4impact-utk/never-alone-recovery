import { Box } from "@mui/material";
import { ReactNode } from "react";

import IntakeForm from "@/components/intake-form";
import IntakeFormProvider from "@/providers/intake-form-provider";

export default function IntakeFormPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "1100px",
        mx: "auto",
        alignItems: "stretch",
      }}
    >
      <IntakeFormProvider>
        <IntakeForm />
      </IntakeFormProvider>
    </Box>
  );
}
