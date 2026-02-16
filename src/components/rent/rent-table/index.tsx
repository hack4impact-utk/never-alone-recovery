"use client";

import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useMemo, useState } from "react";

import { chargeAllClients } from "@/api/rent/public-mutations";
import SearchBox from "@/components/common/search-box";
import { Balance } from "@/types/balance";
import { NewRentTransaction } from "@/types/schema";
import { currencyColor } from "@/utils/money/currency-color";
import { formatCurrency } from "@/utils/money/format-currency";

import EditBalanceForm from "./edit-balance-form";
import IncreaseBalanceForm, {
  IncreaseBalanceFormValues,
} from "./increase-balance-form";

type RentTableProps = {
  initialClientBalances: Balance[];
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
  initialClientBalances,
}: RentTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const [isIncreaseBalanceOpen, setIsIncreaseBalanceOpen] = useState(false);
  const [clientBalances, setClientBalances] = useState(initialClientBalances);

  const filteredRows = useMemo(() => {
    return getRows(clientBalances, searchQuery);
  }, [clientBalances, searchQuery]);

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

  const handleBalanceOpen = (): void => {
    setIsIncreaseBalanceOpen(true);
  };

  const handleBalanceClose = (): void => {
    setIsIncreaseBalanceOpen(false);
  };

  const onSubmit = async (data: IncreaseBalanceFormValues): Promise<void> => {
    const newRentTransactions: NewRentTransaction[] = clientBalances.map(
      (balance) => {
        return {
          staffId: balance.client.staffId,
          type: "charge",
          clientId: balance.client.id,
          amount: data.amount,
        };
      },
    );
    const [success] = await chargeAllClients(newRentTransactions);

    if (!success) {
      enqueueSnackbar(
        `Failed to charge clients of ${data.amount}. Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `Clients charged ${data.amount} successfully!`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setClientBalances((prevBalances) =>
      prevBalances.map((balance) => ({
        ...balance,
        total: Number(balance.total) + Number(data.amount),
      })),
    );

    handleBalanceClose();
  };

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

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2 }}
        >
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBalanceOpen}
          >
            Increase Balance
          </Button>
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

        <IncreaseBalanceForm
          open={isIncreaseBalanceOpen}
          handleClose={handleBalanceClose}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  );
}
