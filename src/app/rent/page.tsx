import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClientBalances } from "@/api/balances";

export default async function RentPage(): Promise<ReactNode> {
  const [balances, error] = await getAllClientBalances();

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
      {balances?.map(({ client, total }) => (
        <Box key={client.id} sx={{ margin: 2, textAlign: "center" }}>
          <Typography variant="h6">
            {client.firstName} {client.lastName}
          </Typography>
          <Typography variant="body1">Balance: ${total}</Typography>
        </Box>
      ))}
    </Box>
  );
}
