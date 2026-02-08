import { Box } from "@mui/material";
import { JSX } from "react";

type DocumentDisplayProps = {
  pdfUrl?: string;
};

export default function DocumentDisplay({
  pdfUrl,
}: DocumentDisplayProps): JSX.Element {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <iframe
        src={`${pdfUrl}#toolbar=0`}
        width="100%"
        height="100%"
        title="Example Table"
      />
    </Box>
  );
}
