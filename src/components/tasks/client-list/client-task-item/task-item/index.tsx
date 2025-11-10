"use client";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import { JSX } from "react";

import { Task } from "@/types/schema";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps): JSX.Element {
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
          <IconButton color="error">
            <ClearIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        ) : (
          <IconButton color="success">
            <CheckIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
}
