import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllDonorTotals } from "@/api/donor/queries";
import DonorTable from "@/components/donor/donor-table";

export default async function DonorDashboardPage(): Promise<ReactNode> {
  const [donorTotals, error] = await getAllDonorTotals();

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
      <DonorTable donorTotals={donorTotals} />
    </Box>
  );
}
