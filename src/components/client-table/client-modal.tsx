"use client";

import { Client } from "@/types/schema";
import { getClientTaskBlueprints } from "./client-modal.actions";
import React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export default function ClientModal({
  isOpen,
  onClose,
  client,
}: ModalProps): React.JSX.Element | null {
  if (!isOpen || !client) return null;
  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)", // dimmed background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // on top of everything
      }}
      onClick={onClose} // click outside to close
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "90%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2>
          {client.firstName}
          {client.lastName}'s Weekly Tasks
        </h2>
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