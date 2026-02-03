import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClientBalances } from "@/api/rent/queries";
import RentTable from "@/components/rent/rent-table";

export default async function RentPage(): Promise<ReactNode> {
  const [balances, error] = await getAllClientBalances();

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
      <RentTable clientBalances={balances} />
    </Box>
  );
}
