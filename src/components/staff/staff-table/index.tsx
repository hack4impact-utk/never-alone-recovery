"use client";
import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { User } from "@/types/schema";

import EditStaffForm from "./edit-staff-form";

type StaffTableProps = {
  staff: User[];
};

type Row = {
  id: string;
  name: string;
  email: string | null;
  role: "disabled" | "staff" | "admin";
};

// I am going to make a helper function here for the chip color
function getRoleColor(role: string): "default" | "primary" | "info" {
  switch (role) {
    case "admin": {
      return "primary";
    } // blue
    case "staff": {
      return "info";
    } // light blue
    default: {
      return "default";
    } // grey
  }
}

function getRows(staff: User[], searchQuery: string): Row[] {
  const rows = staff.map((member) => {
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
    };
  });

  return rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.email && row.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
}
export default function StaffTable({ staff }: StaffTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedUser, setSelectedUser] = useState<Row | null>(null);
  const rows = getRows(staff, searchQuery);
  const handleCloseForm = (): void => {
    setSelectedUser(null);
  };

  const columns: GridColDef<Row>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<Row>): ReactNode => {
        return (
          <Chip
            label={params.value}
            color={getRoleColor(params.value as string)}
            variant="filled"
            size="small"
            sx={{ textTransform: "capitalize " }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<Row>): ReactNode => {
        const handleEditClick = (e: React.MouseEvent): void => {
          e.stopPropagation(); // prevents click from selecting the entire row

          // react hook form will open here
          setSelectedUser(params.row);
        };
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        );
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
      <EditStaffForm
        open={!!selectedUser}
        user={selectedUser}
        onClose={handleCloseForm}
      />
    </Box>
  );
}
