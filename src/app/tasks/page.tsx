import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllClientTasks } from "@/api/tasks";

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
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 1,
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          overflow: "auto",
          maxHeight: "80vh",
          width: "100%",
          maxWidth: 800,
          textAlign: "left",
        }}
      >
        {JSON.stringify(clients, null, 2)}
      </Box>
    </Box>
  );
}
