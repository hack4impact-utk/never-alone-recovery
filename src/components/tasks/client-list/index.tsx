"use client";

import ClearIcon from "@mui/icons-material/Clear";
import Search from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ReactNode, useState } from "react";

import { ClientTasks } from "@/types/client-tasks";

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
  clientTasks,
}: ClientTaskListProps): ReactNode {
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        <Box display="flex" alignItems="center">
          <TextField
            id="search-bar"
            className="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search..."
            size="small"
            sx={{ width: "450px" }}
            slotProps={{
              input: {
                endAdornment: (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {searchQuery && (
                      <IconButton
                        onClick={() => setSearchQuery("")}
                        edge="end"
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Box>
                ),
              },
            }}
          />
          <Search sx={{ fontSize: 35, ml: 1 }} color="primary" />
        </Box>
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
        {filteredClientTasks
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
