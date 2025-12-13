"use client";

import { Client } from "@/types/schema";
import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ReactNode, useState } from "react";
import SearchBox from "../common/search-box";
import ClientModal from "./client-modal";

type ClientTableProps = {
  clients: Client[];
};

export default function ClientTable({ clients }: ClientTableProps): ReactNode {
  // type Row = Pick<Client, "firstName" | "lastName" | "email" | "status">;
  type Row = Client;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleShowModal = (client: Client): void => {
    setSelectedClient(client);
    setIsModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setIsModalVisible(false);
    setSelectedClient(null);
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
          <Button
            onClick={() => handleShowModal(params.row)}
            variant="outlined"
            size="small"
            style={{ marginRight: 8 }}
          >
            Tasks
          </Button>
          <Button variant="outlined" size="small">
            Info
          </Button>
        </div>
      ),
    },
  ];

  function getRows(clients: Client[], searchQuery: string): Row[] {
    // filter client by Resident, Graduates, Discharged
    // then filter by alphabetical last name
    const lowerQuery = searchQuery.toLowerCase();

    //filters based on searchquery
    const filteredClients = clients.filter((client: Client) => {
      return (
        client.firstName.toLowerCase().includes(lowerQuery) ||
        client.lastName.toLowerCase().includes(lowerQuery) ||
        client.email.toLowerCase().includes(lowerQuery)
      );
    });

    // sorting by last name alphabetically
    const sortedClients = filteredClients.sort((a, b) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();

      const nameA = a.lastName.toLowerCase();
      const nameB = b.lastName.toLowerCase();
      if (statusA == statusB) {
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        if (statusA == "residents") return -1; // a should come first
        if (statusB == "residents") return 1; //b comes first

        if (statusA == "graduates" && statusB == "discharged") return 1; // a comes first
        if (statusB == "graduates" && statusA == "discharged") return -1; // b comes first
      }

      return statusA < statusB ? -1 : 1; //sorting other statuses alphabetically if it doesn't apply to any of above
    });

    return sortedClients.map((client: Client) => ({
      ...client,
    }));
  }

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = getRows(clients, searchQuery);

  return (
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
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
      <ClientModal
        isOpen={isModalVisible}
        onClose={handleCloseModal}
        client={selectedClient}
      />
    </Box>
  );
}
