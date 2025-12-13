"use client";

import { Client } from "@/types/schema";
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
    // modal
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Tasks Modal</h2>
        <p>
          <strong>Name:</strong> {client.firstName}
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}