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
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        minHeight: 0,
        width: "100%",
        px: { xs: 2, md: "12.5%" },
      }}
    >
      <AuditTable audits={allAudits} />
    </Box>
  );
}
