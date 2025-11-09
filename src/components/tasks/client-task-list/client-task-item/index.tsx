"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { JSX } from "react";

import { ClientTasks } from "@/types/client-tasks";

import TaskItem from "./task-item";

type ClientTaskItemProps = {
  clientTask: ClientTasks;
};

const getChipText = (clientTask: ClientTasks): string => {
  const taskCount = clientTask.tasks.length;

  return `${taskCount}/${taskCount}`;
};

export default function ClientTaskItem({
  clientTask,
}: ClientTaskItemProps): JSX.Element {
  return (
    <Accordion sx={{ mb: "1rem" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            {clientTask.firstName} {clientTask.lastName}
          </Typography>
          <Chip label={getChipText(clientTask)} sx={{ ms: "1rem" }} />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {clientTask.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
