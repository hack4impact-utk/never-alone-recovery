import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getAllUsers } from "@/api/users";
import ExampleTable from "@/components/example-table";

export default async function ExampleTablePage(): Promise<ReactNode> {
  const [allUsers, error] = await getAllUsers();

  if (error !== null) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          marginTop: "10vh",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        marginTop: "10vh",
      }}
    >
      <ExampleTable users={allUsers} />
    </Box>
  );
}
