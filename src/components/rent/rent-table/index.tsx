"use client";

import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { Balance } from "@/types/balance";

import EditBalanceForm from "./edit-balance-form";

type RentTableProps = {
  clientBalances: Balance[];
};

type Row = {
  id: string;
  total: number;
  firstName: string;
  lastName: string;
  email: string;
};

export default function RentTable({
  clientBalances,
}: RentTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleEditClick = (row: Row): void => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleEditClose = (): void => {
    setEditOpen(false);
    setSelectedRow(null);
  };

  const filteredRows = getRows(clientBalances, searchQuery);

  const columns: GridColDef<Row>[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "total",
      headerName: "Balance",
      flex: 0.5,
      type: "number",
      display: "flex",
      renderCell: formattedBalanceCell,
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 75,
      align: "center",
      display: "flex",
      renderCell: (params) => (
        <Tooltip title="Edit Balance">
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
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
          Rent
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

      {selectedRow && (
        <EditBalanceForm
          open={editOpen}
          onClose={handleEditClose}
          onSuccess={() => setSnackbarOpen(true)}
          client={selectedRow}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Successfully updated balance!
        </Alert>
      </Snackbar>
    </>
  );
}

function formattedBalanceCell(
  params: GridRenderCellParams<Row, number>,
): ReactNode {
  const rentBalance = Number.parseFloat(String(params.row.total));

  return (
    <Typography color={rentBalance < 0 ? "red" : "green"}>
      {rentBalance.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </Typography>
  );
}

function getRows(clientBalances: Balance[], searchQuery: string): Row[] {
  const rows = clientBalances.map((balance) => ({
    id: balance.client.id,
    firstName: balance.client.firstName,
    lastName: balance.client.lastName,
    email: balance.client.email,
    total: balance.total,
  }));

  return rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}
