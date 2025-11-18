import { Box } from "@mui/material";
import { ReactNode } from "react";

import DemographicForm from "@/components/intake-form/demographics";

export default function IntakeFormPage(): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DemographicForm />
    </Box>
  );
}
