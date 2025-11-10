"use client";

import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useState } from "react";

import { markTaskAsCompleted, markTaskAsIncomplete } from "@/api/tasks";
import SearchBox from "@/components/common/search-box";
import { ClientTasks } from "@/types/client-tasks";
import { Task } from "@/types/schema";

import ClientTaskItem from "./client-task-item";

type ClientTaskListProps = {
  clientTasks: ClientTasks[];
};

const getFilteredClientTasks = (
  clientTasks: ClientTasks[],
  searchQuery: string,
  showCompletedTasks: boolean,
): ClientTasks[] => {
  return clientTasks
    .filter((client) =>
      client.tasks.some((task) => task.completed === showCompletedTasks),
    )
    .filter(
      (client) =>
        client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
};

export default function ClientList({
  clientTasks: initialClientTasks,
}: ClientTaskListProps): ReactNode {
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientTasks, setClientTasks] = useState(initialClientTasks);

  const onCompleteTask = async (
    clientId: string,
    task: Task,
  ): Promise<void> => {
    const [updatedTask, error] = await markTaskAsCompleted(task);

    if (error || !updatedTask) {
      enqueueSnackbar(
        `Failed to mark task "${task.description}" as completed. Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `Task "${updatedTask.description}" marked as completed!`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setClientTasks((prevClientTasks) =>
      prevClientTasks.map((client) => {
        if (client.id === clientId) {
          return {
            ...client,
            tasks: client.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ),
          };
        }
        return client;
      }),
    );
  };

  const onUndoTask = async (clientId: string, task: Task): Promise<void> => {
    const [updatedTask, error] = await markTaskAsIncomplete(task);

    if (error || !updatedTask) {
      enqueueSnackbar(
        `Failed to mark task "${task.description}" as incomplete. Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `Task "${updatedTask.description}" marked as incomplete!`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setClientTasks((prevClientTasks) =>
      prevClientTasks.map((client) => {
        if (client.id === clientId) {
          return {
            ...client,
            tasks: client.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ),
          };
        }
        return client;
      }),
    );
  };

  const filteredClientTasks = getFilteredClientTasks(
    clientTasks,
    searchQuery,
    showCompletedTasks,
  );

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
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ToggleButtonGroup
          value={showCompletedTasks}
          color="primary"
          exclusive
          onChange={() => setShowCompletedTasks(!showCompletedTasks)}
        >
          <ToggleButton value={false}>TODO</ToggleButton>
          <ToggleButton value={true}>Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        {filteredClientTasks.map((client) => (
          <ClientTaskItem
            key={client.id}
            clientTask={client}
            completed={showCompletedTasks}
            onCompleteTask={onCompleteTask}
            onUndoTask={onUndoTask}
          />
        ))}

        {filteredClientTasks.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              mt: 4,
            }}
          >
            <Typography variant="h6" color="textSecondary">
              {showCompletedTasks
                ? "No tasks have been completed yet"
                : "All tasks are completed!"}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
