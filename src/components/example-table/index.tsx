"use client";

import Search from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import { User } from "@/types/schema";

type ExampleTableProps = {
  users: User[];
};

type Row = Pick<User, "id" | "name" | "email">;

const columns: GridColDef<Row>[] = [
  { field: "id", headerName: "ID", width: 100, flex: 1 },
  { field: "name", headerName: "Name", width: 150, flex: 1 },
  { field: "email", headerName: "Email", width: 200, flex: 1 },
];

function getRows(users: User[], searchQuery: string): Row[] {
  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  return rows.filter((row) =>
    row?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
}

export default function ExampleTable({ users }: ExampleTableProps): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRows = getRows(users, searchQuery);

  return (
    <Box sx={{ height: "75vh", width: "75vw" }}>
      <Typography align="center" variant="h6">
        Users
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginInline: "auto",
        }}
      >
        <Box display="flex" alignItems="center" sx={{ py: 2 }}>
          <TextField
            id="search-bar"
            className="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search..."
            size="small"
          />
          <Search sx={{ fontSize: 28, m: 1 }} color="primary" />
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
          sx={{
            height: "500px",
          }}
        />
      </Box>
    </Box>
  );
}
