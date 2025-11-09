"use client";

import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

import { Audit } from "@/types/schema";

type AuditTableProps = {
  audits: Audit[];
};

type Row = {
  id: string;
  createdDate: Date;
  staff: string | null;
  client: string | null;
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

const columns: GridColDef<Row>[] = [
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
  { field: "staff", headerName: "Staff", flex: 1 },
  { field: "client", headerName: "Client", flex: 1 },
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
  },
  { field: "message", headerName: "Message", flex: 2 },
];

function getRows(audits: Audit[]): Row[] {
  return audits.map((audit) => {
    // Get the names of the staff and client here using their IDs

    return {
      id: audit.id,
      createdDate: audit.createdDate,
      staff: audit.staffId,
      client: audit.clientId,
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
        initialState={{
          sorting: { sortModel: [{ field: "createdDate", sort: "desc" }] },
        }}
      />
    </Box>
  );
}
