"use client";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { ReactNode, useEffect, useMemo, useState } from "react";

import SearchBox from "@/components/common/search-box";
import AddDonorForm from "@/components/donor/add-donor-form";
import { useDonorContext } from "@/providers/donor-provider";
import { DonorTotal } from "@/types/donor-total";
import { currencyColor } from "@/utils/money/currency-color";
import { formatCurrency } from "@/utils/money/format-currency";

import AddDonationForm from "./add-donations-form";
import BulkEmailButton from "./bulk-email-button";

type Row = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  email: string | null;
  total: number;
  donorTotal: DonorTotal;
};

function getRows(donorTotals: DonorTotal[], searchQuery: string): Row[] {
  const rows = donorTotals.map(({ donor, total }) => ({
    id: donor.id,
    firstName: donor.firstName,
    lastName: donor.lastName,
    phoneNumber: donor.phoneNumber,
    email: donor.email,
    total,
    donorTotal: { donor, total },
  }));

  return rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}

export default function DonorTable(): ReactNode {
  const { donorTotals } = useDonorContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>();

  const rows = getRows(donorTotals, searchQuery);

  const columns: GridColDef<Row>[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "total",
      headerName: "Total Donated",
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
      renderCell: (params) => <AddDonationForm total={params.row.donorTotal} />,
    },
  ];

  const [displayDataGrid, setDisplayDataGrid] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayDataGrid(true);
    });
  }, []);

  const selectedDonors = useMemo(() => {
    if (!rowSelectionModel) {
      return [];
    }

    const donors = donorTotals.map(({ donor }) => donor);

    if (rowSelectionModel.type === "include") {
      return donors.filter((donor) => rowSelectionModel.ids.has(donor.id));
    }

    return donors.filter((donor) => !rowSelectionModel.ids.has(donor.id));
  }, [rowSelectionModel, donorTotals]);

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
        Donor Dashboard
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2 }}
      >
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Box sx={{ display: "flex", gap: 1 }}>
          <BulkEmailButton donors={selectedDonors} />
          <AddDonorForm />
        </Box>
      </Box>

      {displayDataGrid && (
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          checkboxSelection
          onRowSelectionModelChange={(newModel) =>
            setRowSelectionModel(newModel)
          }
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
        />
      )}
    </Box>
  );
}
