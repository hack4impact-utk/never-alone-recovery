import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClients } from "@/api/clients";
import { getValidHousingManagers } from "@/api/staff/queries";
import ClientTable from "@/components/client-table";

export default async function ClientTablePage(): Promise<ReactNode> {
  const [[allClients, clientsError], [housingManagers, housingManagersError]] =
    await Promise.all([getAllClients(), getValidHousingManagers()]);

  if (clientsError !== null || housingManagersError !== null) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {clientsError !== null && (
          <Typography variant="h6">{clientsError}</Typography>
        )}
        {housingManagersError !== null && (
          <Typography variant="h6">{housingManagersError}</Typography>
        )}
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
      <ClientTable
        initialClients={allClients}
        housingManagers={housingManagers}
      />
    </Box>
  );
}
