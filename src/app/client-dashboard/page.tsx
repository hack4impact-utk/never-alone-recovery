import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClients } from "@/api/clients";
import ClientTable from "@/components/client-table";

export default async function ClientTablePage(): Promise<ReactNode> {
  const [allClients, error] = await getAllClients();

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
      <ClientTable clients={allClients} />
    </Box>
  );
}
