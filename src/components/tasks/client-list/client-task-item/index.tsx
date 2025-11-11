"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { JSX } from "react";

import { ClientTasks } from "@/types/client-tasks";
import { Task } from "@/types/schema";

import TaskItem from "./task-item";

type ClientTaskItemProps = {
  clientTask: ClientTasks;
  completed: boolean;
  onCompleteTask: (clientId: string, task: Task) => Promise<void>;
  onUndoTask: (clientId: string, task: Task) => Promise<void>;
};

const getChipText = (clientTask: ClientTasks, completed: boolean): string => {
  const taskCount = clientTask.tasks.filter(
    (task) => task.completed === completed,
  ).length;

  if (completed) {
    return `${taskCount}/${clientTask.tasks.length} Completed`;
  }

  return `${taskCount} tasks remaining`;
};

const getClientTask = (clientTask: ClientTasks, completed: boolean): Task[] => {
  return clientTask.tasks.filter((task) => task.completed === completed);
};

export default function ClientTaskItem({
  clientTask,
  completed,
  onCompleteTask,
  onUndoTask,
}: ClientTaskItemProps): JSX.Element {
  const filteredTasks = getClientTask(clientTask, completed);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          sx={{ mr: "0.5rem" }}
        >
          <Typography>
            {clientTask.firstName} {clientTask.lastName} - {clientTask.email}
          </Typography>
          <Chip label={getChipText(clientTask, completed)} />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            clientTask={clientTask}
            onCompleteTask={onCompleteTask}
            onUndoTask={onUndoTask}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
