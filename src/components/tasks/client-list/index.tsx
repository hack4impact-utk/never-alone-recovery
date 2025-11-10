"use client";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ReactNode, useState } from "react";

import { ClientTasks } from "@/types/client-tasks";

import ClientTaskItem from "./client-task-item";

type ClientTaskListProps = {
  clientTasks: ClientTasks[];
};

export default function ClientList({
  clientTasks,
}: ClientTaskListProps): ReactNode {
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  return (
    <Box
      sx={{
        height: "75vh",
        width: "75vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "1rem" }}
      >
        <ToggleButtonGroup
          value={showCompletedTasks}
          color="primary"
          exclusive
          onChange={(e, newStatus) => setShowCompletedTasks(newStatus)}
        >
          <ToggleButton value={false}>TODO</ToggleButton>
          <ToggleButton value={true}>Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        {clientTasks
          .filter((client) =>
            client.tasks.some((task) => task.completed === showCompletedTasks),
          )
          .map((client) => (
            <ClientTaskItem
              key={client.id}
              clientTask={client}
              completed={showCompletedTasks}
            />
          ))}
      </Box>
    </Box>
  );
}
