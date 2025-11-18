"use client";

import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { ReactNode, useEffect, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { AuditWithClientAndStaff } from "@/types/audit-with-client-and-staff";
import { AuditType } from "@/types/enums";

type AuditTableProps = {
  audits: AuditWithClientAndStaff[];
};

type Row = {
  id: string;
  createdDate: Date;
  staffName: string | null;
  clientName: string | null;
  type: AuditType;
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
      return dayjs(params).format("HH:mm A MM-DD-YYYY");
    },
  },
  { field: "staffName", headerName: "Staff", flex: 1 },
  { field: "clientName", headerName: "Client", flex: 1 },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    type: "singleSelect",
    valueOptions: Object.keys(typeColors),
    renderCell: getAuditTypeCell,
  },
  { field: "message", headerName: "Message", flex: 2 },
];

function getAuditTypeCell(
  params: GridRenderCellParams<Row, AuditType>,
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

function getRows(
  audits: AuditWithClientAndStaff[],
  searchQuery: string,
): Row[] {
  const rows = audits.map((audit) => {
    return {
      id: audit.id,
      createdDate: audit.createdDate,
      staffName: audit.staff ? audit.staff.name : "N/A",
      clientName: audit.client
        ? audit.client.firstName + " " + audit.client.lastName
        : "N/A",
      type: audit.type as AuditType,
      message: audit.message,
    };
  });

  const query = searchQuery.toLowerCase();

  return rows.filter((audit) => {
    return (
      audit.staffName.toLowerCase().includes(query) ||
      audit.clientName.toLowerCase().includes(query) ||
      audit.type.toLowerCase().includes(query) ||
      (audit.message && audit.message.toLowerCase().includes(query))
    );
  });
}

export default function AuditTable({ audits }: AuditTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = getRows(audits, searchQuery);
  const [displayDatagrid, setDisplayDatagrid] = useState(false);

  useEffect(() => {
    setDisplayDatagrid(true);
  }, []);

  return (
    displayDatagrid && (
      <Box
        sx={{
          height: "75vh",
          width: "75vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" variant="h5" sx={{ mt: 2 }}>
          Audit Log
        </Typography>
        <Box display="flex" alignItems="center" sx={{ py: 2 }}>
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
        />
      </Box>
    )
  );
}
