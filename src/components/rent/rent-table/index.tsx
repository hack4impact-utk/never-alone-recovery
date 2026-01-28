"use client";

import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { Balance } from "@/types/balance";
import { currencyColor } from "@/utils/money/currency-color";
import { formatCurrency } from "@/utils/money/format-currency";

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
  balance: Balance;
};

function getRows(clientBalances: Balance[], searchQuery: string): Row[] {
  const rows = clientBalances.map((balance) => ({
    id: balance.client.id,
    firstName: balance.client.firstName,
    lastName: balance.client.lastName,
    email: balance.client.email,
    total: balance.total,
    balance: balance,
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
      renderCell: (params) => (
        <Typography color={currencyColor(params.row.total)}>
          {formatCurrency(params.row.total)}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 75,
      align: "center",
      display: "flex",
      renderCell: (params) => <EditBalanceForm balance={params.row.balance} />,
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
    </>
  );
}
