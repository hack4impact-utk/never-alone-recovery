import { Box } from "@mui/material";
import { ReactNode } from "react";

import DemographicForm from "@/components/intake-form/demographics";

export default function IntakeFormPage(): ReactNode {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DemographicForm />
    </Box>
  );
}
