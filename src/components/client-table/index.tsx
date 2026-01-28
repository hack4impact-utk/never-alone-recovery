"use client";

import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ReactNode, useState } from "react";

import { Client } from "@/types/schema";

import ClientInfo from "./client-info";
import SearchBox from "../common/search-box";
import ClientModal from "./client-modal";

type ClientTableProps = {
  clients: Client[];
};

type Row = Client;

export default function ClientTable({ clients }: ClientTableProps): ReactNode {
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
        // custom chip based on status
        const status = params.value;
        let color = "error";
        if (status == "resident") {
          color = "warning";
        } else if (status == "graduate") {
          color = "success";
        }

        return (
          <Chip
            label={status}
            sx={{
              backgroundColor: color,
            }}
            size="small"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div>
          <ClientModal client={params.row} />

          <Button variant="outlined" size="small">
            Info
          </Button>
        </div>
      ),
    },
  ];

  function getRows(clients: Client[], searchQuery: string): Row[] {
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
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredRows = getRows(clients, searchQuery);

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
        // custom chip based on status
        const status = params.value;
        let color = "error";
        if (status == "resident") {
          color = "warning";
        } else if (status == "graduate") {
          color = "success";
        }

        return (
          <Chip
            label={status}
            sx={{
              backgroundColor: color,
            }}
            size="small"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div>
          <Button variant="outlined" size="small" style={{ marginRight: 8 }}>
            Tasks
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedClient(params.row as Client);
              setOpenInfo(true);
            }}
          >
            Info
          </Button>
        </div>
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

      <ClientInfo
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        client={selectedClient}
      />
    </>
  );
}
