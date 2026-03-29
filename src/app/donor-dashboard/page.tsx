import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllDonors } from "@/api/donor/queries";
import DonorTable from "@/components/donor/donor-table";

export default async function DonorDashboardPage(): Promise<ReactNode> {
  const [donors, error] = await getAllDonors();

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
        alignItems: "center",
      }}
    >
      <DonorTable donors={donors} />
    </Box>
  );
}
