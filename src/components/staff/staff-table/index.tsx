"use client";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useEffect, useState } from "react";

import SearchBox from "@/components/common/search-box";
import { User } from "@/types/schema";

type StaffTableProps = {
  staff: User[];
};

type Row = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  role: "disabled" | "staff" | "admin";
};

const columns: GridColDef<Row>[] = [
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    type: "singleSelect",
    valueOptions: ["admin", "staff", "disabled"],
    editable: true,
  },
];

function getRows(staff: User[], searchQuery: string): Row[] {
  const rows = staff.map((member) => {
    const nameParts = member.name.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      id: member.id,
      firstName,
      lastName,
      email: member.email,
      role: member.role,
    };
  });

  return rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (row.email && row.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
}
export default function StaffTable({ staff }: StaffTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const rows = getRows(staff, searchQuery);
  const [displayDatagrid, setDisplayDatagrid] = useState(false);

  useEffect(() => {
    setDisplayDatagrid(true);
  }, []);

  return (
    displayDatagrid && (
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
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
    )
  );
}
