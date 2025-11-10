"use client";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import { JSX } from "react";

import { ClientTasks } from "@/types/client-tasks";
import { Task } from "@/types/schema";

type TaskItemProps = {
  task: Task;
  clientTask: ClientTasks;
  onCompleteTask: (clientId: string, task: Task) => Promise<void>;
  onUndoTask: (clientId: string, task: Task) => Promise<void>;
};

export default function TaskItem({
  task,
  clientTask,
  onCompleteTask,
  onUndoTask,
}: TaskItemProps): JSX.Element {
  return (
    <Card variant="outlined" sx={{ mb: "0.5rem", p: "0.5rem" }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>{task.description}</Typography>

        {task.completed ? (
          <IconButton
            color="error"
            onClick={() => onUndoTask(clientTask.id, task)}
          >
            <ClearIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        ) : (
          <IconButton
            color="success"
            onClick={() => onCompleteTask(clientTask.id, task)}
          >
            <CheckIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
}
