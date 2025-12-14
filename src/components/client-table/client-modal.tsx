"use client";

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

  useEffect(() => {
    if (!isOpen || !client) return;

    let cancelled = false;

    const loadBlueprintTasks = async (): Promise<void> => {
      setLoading(true);
      try {
        const [data, error] = await getClientTasks(client.id);

        if (error) {
          console.error("Failed to load tasks:", error);
          return;
        }

        if (!cancelled && data) {
          setTasks(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadBlueprintTasks();

    return (): void => {
      cancelled = true;
    };
  }, [isOpen, client?.id]);

  if (!isOpen || !client) return null;

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
        <h2>
          {client.firstName} {client.lastName}'s Weekly Tasks
        </h2>

        {loading ? (
          <p>Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.type}</strong>
                {task.description && ` — ${task.description}`}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
