import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllStaff } from "@/api/staff/queries";
import StaffTable from "@/components/staff/staff-table";

export default async function StaffDashboardPage(): Promise<ReactNode> {
  const [staff, error] = await getAllStaff();

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
      <StaffTable staff={staff} />
    </Box>
  );
}
