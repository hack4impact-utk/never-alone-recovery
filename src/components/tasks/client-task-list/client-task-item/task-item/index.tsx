"use client";

import CheckIcon from "@mui/icons-material/Check";
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

        <IconButton color="success" aria-label="mark task as complete">
          <CheckIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Stack>
    </Card>
  );
}
