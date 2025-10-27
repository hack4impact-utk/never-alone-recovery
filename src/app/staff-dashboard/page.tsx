"use client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ReactNode } from "react";

const columns = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
    editable: false,
    sortable: false,
  },

  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
    editable: false,
    sortable: false,
  },

  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: false,
    sortable: false,
  },

  {
    field: "role",
    headerName: "Role",
    width: 150,
    editable: true,
    sortable: false,
    type: "singleSelect",
    valueOptions: ["Admin", "Staff", "Disabled"],
  },
];

// sample for now
const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    role: "Manager",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Aoe",
    email: "john.doe@company.com",
    role: "Manager",
  },
];

export default function StaffDashboardPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: "80%", width: "90%", maxWidth: 1200 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
            sorting: {
              sortModel: [{ field: "lastName", sort: "asc" }],
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
