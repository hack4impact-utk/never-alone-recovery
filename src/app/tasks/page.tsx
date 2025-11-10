import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClientTasks } from "@/api/tasks";
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
        p: 2,
      }}
    >
      <ClientList clientTasks={clients} />
    </Box>
  );
}
