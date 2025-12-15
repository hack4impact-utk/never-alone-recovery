"use client";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import { Client } from "@/types/schema";

import { getClientTasks } from "./client-modal.actions.server";

export type ClientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
};

type TaskBlueprint = {
  id: string;
  type: string;
  description: string | null;
};

export default function ClientModal({
  isOpen,
  onClose,
  client,
}: ClientModalProps): React.JSX.Element | null {
  const [tasks, setTasks] = useState<TaskBlueprint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect((): (() => void) | void => {
    if (!isOpen || !client) return;

    let cancelled = false;

    const loadBlueprintTasks = async (): Promise<void> => {
      setLoading(true);
      try {
        const [data, error] = await getClientTasks(client.id);

        if (error) {
          console.error(error);
          return;
        }

        if (!cancelled && data) {
          setTasks(data);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadBlueprintTasks();

    return (): void => {
      cancelled = true;
    };
  }, [isOpen, client?.id]);

  if (!isOpen || !client) return null;

  const columns: GridColDef<TaskBlueprint>[] = [
    { field: "type", headerName: "Task", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "action",
      headerName: "Actions",
      width: 120,
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

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "600px",
          maxWidth: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center", // vertically center
            justifyContent: "space-between", // pushes elements to edges
            marginBottom: "16px",
          }}
        >
          <h2>
            {client.firstName} {client.lastName}'s Weekly Tasks
          </h2>
          <IconButton
            onClick={onClose}
            style={{
              marginTop: "16px",
              borderRadius: "4px",
              border: "none",
              color: "black",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {loading ? (
          <p>Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div style={{ height: 400, width: "100%", marginTop: "16px" }}>
            <DataGrid
              rows={tasks.map((task) => ({
                id: task.id,
                type: task.type,
                description: task.description ?? "",
              }))}
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
      </div>
    </div>
  );
}
