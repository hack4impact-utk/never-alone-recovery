import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllStaff } from "@/api/staff";
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
        minHeight: "100vh",
        py: 4,
      }}
    >
      <StaffTable staff={staff} />
    </Box>
  );
}
