"use client";

import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { ReactNode } from "react";

import { Audit } from "@/types/audit";

type AuditTableProps = {
  audits: Audit[];
};

// 🟢 Color mapping for each type
const typeColors: Record<
  string,
  "default" | "primary" | "secondary" | "success" | "error" | "warning" | "info"
> = {
  rent_payment: "success",
  rent_charge: "warning",
  client_discharge: "error",
  client_enrollment: "info",
  client_graduation: "primary",
  client_staff_changed: "default",
  client_task_completed: "success",
  staff_role_changed: "warning",
};

const columns: GridColDef<Audit>[] = [
  {
    field: "createdDate",
    headerName: "Date",
    flex: 1,
    valueFormatter: (params): string => {
      const date = new Date(params);
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const hourStr = String(hours).padStart(2, "0");
      return `${hourStr}:${minutes} ${ampm} ${month}-${day}-${year}`;
    },
  },
  { field: "staffName", headerName: "Staff", flex: 1 },
  { field: "clientName", headerName: "Client", flex: 1 },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    type: "singleSelect",
    valueOptions: [
      "rent_payment",
      "rent_charge",
      "client_discharge",
      "client_enrollment",
      "client_graduation",
      "client_staff_changed",
      "client_task_completed",
      "staff_role_changed",
    ],
    renderCell: getAuditTypeCell,
  },
  { field: "message", headerName: "Message", flex: 2 },
];

// 🎨 Render a Chip with color based on the type
function getAuditTypeCell(
  params: GridRenderCellParams<Audit, string>,
): ReactNode {
  const type = params.value ?? "N/A";
  const color = typeColors[type] ?? "default";
  return <Chip label={type} color={color} variant="outlined" />;
}

function getRows(audits: Audit[]): Audit[] {
  return audits.map((audit) => {
    return {
      id: audit.id,
      createdDate: audit.createdDate,
      staffName: audit.staffName,
      clientName: audit.clientName,
      type: audit.type,
      message: audit.message,
    };
  });
}

export default function AuditTable({ audits }: AuditTableProps): ReactNode {
  const filteredRows = getRows(audits);

  return (
    <Box sx={{ height: "75vh", width: "75vw" }}>
      <Typography align="center" variant="h6">
        Activity
      </Typography>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
