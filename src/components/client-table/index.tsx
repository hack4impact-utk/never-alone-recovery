"use client";

import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ReactNode, useState } from "react";

import { Client } from "@/types/schema";

import SearchBox from "../common/search-box";
import ClientInfo from "./client-info";
import TasksModal from "./tasks-modal";

type ClientTableProps = {
  initialClients: Client[];
};

type Row = Client;

export default function ClientTable({
  initialClients,
}: ClientTableProps): ReactNode {
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState("");

  const getRows = (): Row[] => {
    const lowerQuery = searchQuery.toLowerCase();

    const filteredClients = clients.filter((client: Client) => {
      return (
        client.firstName.toLowerCase().includes(lowerQuery) ||
        client.lastName.toLowerCase().includes(lowerQuery) ||
        client.email.toLowerCase().includes(lowerQuery)
      );
    });

    const roleOrder = {
      resident: 1,
      graduated: 2,
      discharged: 3,
    };

    const sortedClients = filteredClients.sort((a, b) => {
      if (roleOrder[a.status] !== roleOrder[b.status]) {
        return roleOrder[a.status] - roleOrder[b.status];
      }

      return a.lastName.localeCompare(b.lastName);
    });

    return sortedClients;
  };

  const filteredRows = getRows();

  const updateClients = (updatedClient: Client): void => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client,
      ),
    );
  };

  const columns: GridColDef<Row>[] = [
    { field: "firstName", headerName: "First Name", width: 50, flex: 1 },
    { field: "lastName", headerName: "Last Name", width: 50, flex: 1 },
    { field: "email", headerName: "Email", width: 200, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      flex: 1,
      renderCell: (params): React.ReactNode => {
        const status = params.value;
        return <Chip label={status} size="small" />;
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <TasksModal client={params.row} />

          <ClientInfo
            client={params.row}
            onDischarge={updateClients}
            onGraduate={updateClients}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: "75vh",
          width: "75vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography align="center" variant="h5" sx={{ mt: 2 }}>
          Client Dashboard
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
    </>
  );
}
