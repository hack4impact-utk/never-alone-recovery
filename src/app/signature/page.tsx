import DocumentForm from "@/components/common/document-form";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default async function SignaturePage(): Promise<ReactNode> {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DocumentForm />
    </Box>
  );
}
