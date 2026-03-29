"use client";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { ReactNode, useEffect, useMemo, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { Donor } from "@/types/schema";

import BulkEmailButton from "./bulk-email-button";

type DonorTableProps = {
  donors: Donor[];
};

type Row = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  email: string | null;
};

function getRows(donors: Donor[], searchQuery: string): Row[] {
  const rows = donors.map((donor) => {
    return {
      id: donor.id,
      firstName: donor.firstName,
      lastName: donor.lastName,
      phoneNumber: donor.phoneNumber,
      email: donor.email,
    };
  });

  return rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}
export default function DonorTable({ donors }: DonorTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>();

  const rows = getRows(donors, searchQuery);

  const columns: GridColDef<Row>[] = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
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

    if (rowSelectionModel.type === "include") {
      return donors.filter((donor) => rowSelectionModel.ids.has(donor.id));
    }

    return donors.filter((donor) => !rowSelectionModel.ids.has(donor.id));
  }, [rowSelectionModel]);

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

        <Box>
          <BulkEmailButton donors={selectedDonors} />
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
