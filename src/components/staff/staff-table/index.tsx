"use client";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

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

function getRows(staff: User[]): Row[] {
  return staff.map((member) => {
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
}

export default function StaffTable({ staff }: StaffTableProps): ReactNode {
  const rows = getRows(staff);

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
        Staff Dashboard
      </Typography>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </Box>
  );
}
