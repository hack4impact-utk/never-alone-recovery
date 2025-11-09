"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

import { ClientTasks } from "@/types/client-tasks";

import ClientTaskItem from "./client-task-item";

type ClientTaskListProps = {
  clientTasks: ClientTasks[];
};

export default function ClientTaskList({
  clientTasks,
}: ClientTaskListProps): ReactNode {
  return (
    <Box
      sx={{
        height: "75vh",
        width: "75vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {clientTasks.map((client) => (
        <ClientTaskItem key={client.id} clientTask={client} />
      ))}
    </Box>
  );
}
