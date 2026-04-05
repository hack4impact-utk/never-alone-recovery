import { Box } from "@mui/material";
import { ReactNode } from "react";

type FormSectionProps = {
  children: ReactNode;
};

export default function FormSection({ children }: FormSectionProps): ReactNode {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}
