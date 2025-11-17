"use client";

import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { Balance } from "@/types/balance";

type RentTableProps = {
  clientBalances: Balance[];
};

type Row = {
  total: number;
  firstName: string;
  lastName: string;
  email: string;
};

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
    renderCell: getActionButtons,
  },
];

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

function getActionButtons(): ReactNode {
  return (
    <Tooltip title="Edit Balance">
      <IconButton>
        <EditIcon />
      </IconButton>
    </Tooltip>
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

export default function RentTable({
  clientBalances,
}: RentTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRows = getRows(clientBalances, searchQuery);

  return (
    <Box
      sx={{
        height: "75vh",
        width: "75vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography align="center" variant="h6">
        Rent
      </Typography>
      <Box display="flex" alignItems="center" sx={{ py: 2 }}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
