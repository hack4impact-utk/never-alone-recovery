import Signature from "@/components/common/signature";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default async function ExampleTablePage(): Promise<ReactNode> {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Signature />
    </Box>
  );
}
