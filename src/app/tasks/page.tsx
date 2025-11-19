import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClientTasks } from "@/api/tasks/queries";
import ClientList from "@/components/tasks/client-list";

export default async function TasksPage(): Promise<ReactNode> {
  const [clients, error] = await getAllClientTasks();

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
        p: 2,
      }}
    >
      <ClientList clientTasks={clients} />
    </Box>
  );
}
