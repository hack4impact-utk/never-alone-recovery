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
import React, { ReactNode, useState } from "react";

import { getClientTasksBlueprints } from "@/api/tasks-blueprints/queries";
import { Client, TaskBlueprint } from "@/types/schema";

export type ClientModalProps = {
  client: Client;
};

export default function ClientModal({ client }: ClientModalProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskBlueprint[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: GridColDef<TaskBlueprint>[] = [
    {
      field: "type",
      headerName: "Task",
      flex: 1,
      filterable: false,
      sortable: false,
      disableReorder: true,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      filterable: false,
      sortable: false,
      disableReorder: true,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 120,
      filterable: false,
      sortable: false,
      disableReorder: true,
      disableColumnMenu: true,
      renderCell: () => (
        <div>
          <IconButton size="small" color="info">
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleOpen = async () => {
    setIsOpen(true);

    setLoading(true);

    const [data, error] = await getClientTasksBlueprints(client.id);

    if (error) {
      console.error(error);
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
