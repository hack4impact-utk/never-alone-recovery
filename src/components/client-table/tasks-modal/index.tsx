"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { ReactNode, useState } from "react";

import {
  createTaskBlueprint,
  removeTaskBlueprint,
  updateDescriptionOnTaskBlueprint,
} from "@/api/tasks-blueprints/public-mutations";
import { getClientTasksBlueprints } from "@/api/tasks-blueprints/queries";
import ButtonModal from "@/components/common/modal";
import { Client, TaskBlueprint } from "@/types/schema";

export type TasksModalProps = {
  client: Client;
};

export default function TasksModal({ client }: TasksModalProps): ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  const [tasks, setTasks] = useState<TaskBlueprint[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async (): Promise<void> => {
    setLoading(true);

    const [data, error] = await getClientTasksBlueprints(client.id);

    if (error) {
      enqueueSnackbar("Failed to load tasks", { variant: "error" });
      setLoading(false);
      return;
    }

    if (data) {
      setTasks(data);
    }

    setLoading(false);
  };

  const handleProcessRowUpdate = async (
    newRow: TaskBlueprint,
  ): Promise<TaskBlueprint> => {
    if (!newRow.description) {
      enqueueSnackbar("Description cannot be empty", { variant: "error" });
      throw new Error("Description cannot be empty");
    }

    const [data, error] = await updateDescriptionOnTaskBlueprint(
      newRow.id,
      newRow.description,
    );

    if (error || !data) {
      enqueueSnackbar("Failed to save task", { variant: "error" });
      throw new Error(error ?? "Update failed");
    }

    setTasks((prev) => prev.map((task) => (task.id === data.id ? data : task)));

    enqueueSnackbar("Task saved successfully", {
      variant: "success",
    });

    return data;
  };

  const handleDelete = async (id: string): Promise<void> => {
    const [, error] = await removeTaskBlueprint(id);

    if (error) {
      enqueueSnackbar("Failed to delete task", {
        variant: "error",
      });
      return;
    }

    setTasks((prev) => prev.filter((task) => task.id !== id));

    enqueueSnackbar("Task deleted successfully", {
      variant: "success",
    });
  };

  const handleAdd = async (): Promise<void> => {
    const [newTask, error] = await createTaskBlueprint({
      description: "New Task",
      clientId: client.id,
    });

    if (error || !newTask) {
      enqueueSnackbar("Failed to create task", {
        variant: "error",
      });
      return;
    }

    setTasks((prev) => [...prev, newTask]);

    enqueueSnackbar("Task created successfully", {
      variant: "success",
    });
  };

  const columns: GridColDef<TaskBlueprint>[] = [
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      editable: true,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <ButtonModal
        buttonTitle="Tasks"
        modalTitle={`${client.firstName} ${client.lastName}'s Weekly Tasks`}
        hasCloseButton={true}
        onOpen={handleOpen}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box style={{ width: "100%" }}>
              <DataGrid
                rows={tasks}
                columns={columns}
                disableRowSelectionOnClick
                processRowUpdate={handleProcessRowUpdate}
                onProcessRowUpdateError={(error) => console.error(error)}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                slots={{
                  toolbar: () => (
                    <Box
                      sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}
                    >
                      <IconButton size="small" onClick={handleAdd}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  ),
                }}
                showToolbar={true}
              />
            </Box>
          )}
        </Box>
      </ButtonModal>
    </>
  );
}
