"use client";

import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { ReactNode } from "react";

import { AuditWithClientAndStaff } from "@/types/audit-with-client-and-staff";

type AuditTableProps = {
  audits: AuditWithClientAndStaff[];
};

type Row = {
  id: string;
  createdDate: Date;
  staffName: string | null;
  clientName: string | null;
  type:
    | "rent_payment"
    | "rent_charge"
    | "client_discharge"
    | "client_enrollment"
    | "client_graduation"
    | "client_staff_changed"
    | "client_task_completed"
    | "staff_role_changed"
    | null;
  message: string | null;
};

const typeColors: Record<string, string> = {
  rent_payment: "#1d9e16",
  rent_charge: "#d11730",
  client_discharge: "#c42fa9",
  client_enrollment: "#f28200",
  client_graduation: "#007bd8",
  client_staff_changed: "#595958",
  client_task_completed: "#782ac2",
  staff_role_changed: "#96572f",
};

const columns: GridColDef<Row>[] = [
  {
    field: "createdDate",
    headerName: "Date",
    flex: 1,
    valueFormatter: (params): string => {
      return dayjs(params).format("HH:MM A MM-DD-YYYY");
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

function getAuditTypeCell(
  params: GridRenderCellParams<Row, string>,
): ReactNode {
  const type = params.value ?? "N/A";
  const color = typeColors[type] ?? "default";
  return (
    <Chip
      label={type}
      variant="outlined"
      sx={{ color, borderColor: color, fontWeight: 500 }}
    />
  );
}

function getRows(audits: AuditWithClientAndStaff[]): Row[] {
  return audits.map((audit) => {
    return {
      id: audit.id,
      createdDate: audit.createdDate,
      staffName: audit.staff ? audit.staff.name : "N/A",
      clientName: audit.client
        ? audit.client.firstName + " " + audit.client.lastName
        : "N/A",
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
