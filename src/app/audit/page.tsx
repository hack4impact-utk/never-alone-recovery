import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllAudits } from "@/api/audits";
import AuditTable from "@/components/audit/audit-table";

export default async function AuditPage(): Promise<ReactNode> {
  const [allAudits, error] = await getAllAudits();

  if (error !== null) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          marginTop: "10vh",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

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
      <AuditTable audits={allAudits} />
    </Box>
  );
}
