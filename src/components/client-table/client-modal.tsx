"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { ReactNode, useState } from "react";

import { deleteTaskBlueprint } from "@/api/tasks-blueprints/private-mutations";
import { addOrUpdateTaskBlueprint } from "@/api/tasks-blueprints/public-mutations";
import { getClientTasksBlueprints } from "@/api/tasks-blueprints/queries";
import { Client, TaskBlueprint } from "@/types/schema";

export type ClientModalProps = {
  client: Client;
};

export default function ClientModal({ client }: ClientModalProps): ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskBlueprint[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async (): Promise<void> => {
    setIsOpen(true);
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

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleProcessRowUpdate = async (
    newRow: TaskBlueprint,
  ): Promise<TaskBlueprint> => {
    const [data, error] = await addOrUpdateTaskBlueprint(newRow);

    if (error || !data) {
      enqueueSnackbar("Failed to save task", { variant: "error" });
      throw new Error(error ?? "Update failed"); // keeps old row
    }

    setTasks((prev) => prev.map((task) => (task.id === data.id ? data : task)));

    enqueueSnackbar("Task saved successfully", {
      variant: "success",
    });

    return data;
  };

  const handleDelete = async (id: string): Promise<void> => {
    const [, error] = await deleteTaskBlueprint(id);

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

  const columns: GridColDef<TaskBlueprint>[] = [
    {
      field: "type",
      headerName: "Task",
      flex: 1,
      editable: true,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
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
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <IconButton size="small" color="info">
            <EditIcon />
          </IconButton>
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
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="small"
        style={{ marginRight: 8 }}
      >
        Tasks
      </Button>

      <Dialog open={isOpen} fullWidth maxWidth="md">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          {client.firstName} {client.lastName}'s Weekly Tasks
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <div style={{ height: 400, width: "100%", marginTop: "16px" }}>
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
                />
              </div>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: "45%" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "45%" }}
            onClick={handleClose}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
