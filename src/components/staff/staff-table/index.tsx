"use client";
import { Box, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { StaffRole } from "@/types/enums";
import { User } from "@/types/schema";

import EditStaffForm from "./edit-staff-form";

type StaffTableProps = {
  staff: User[];
};

type Row = {
  id: string;
  name: string;
  email: string | null;
  role: StaffRole;
  user: User;
};

function getRoleColor(role: StaffRole): "default" | "primary" | "info" {
  switch (role) {
    case "admin": {
      return "primary";
    }
    case "staff": {
      return "info";
    }
    default: {
      return "default";
    }
  }
}

function getRows(staff: User[], searchQuery: string): Row[] {
  const rows = staff.map((member) => {
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      user: member,
    };
  });

  return rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}
export default function StaffTable({ staff }: StaffTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");

  const rows = getRows(staff, searchQuery);

  const columns: GridColDef<Row>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Row>): ReactNode => {
        return (
          <Chip
            label={params.value}
            color={getRoleColor(params.value)}
            variant="filled"
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<Row>): ReactNode => {
        return <EditStaffForm user={params.row.user} />;
      },
    },
  ];

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
        Staff Dashboard
      </Typography>
      <Box display="flex" alignItems="center" sx={{ py: 2 }}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <DataGrid
        rows={rows}
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
  );
}
