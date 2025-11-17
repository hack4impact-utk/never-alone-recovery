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
      <StaffTable staff={staff} />
    </Box>
  );
}
