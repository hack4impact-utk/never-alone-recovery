"use client";

import { Box, Button, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

import { Client } from "@/types/schema";

type Props = {
  open: boolean;
  onClose: () => void;
  client: Client | null;
};

export default function ClientInfo({
  open,
  onClose,
  client,
}: Props): ReactNode {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" align="center">
            Client Information
          </Typography>

          <Button sx={{ mt: 3 }} variant="outlined" onClick={onClose}>
            Discharge
          </Button>
          <Button sx={{ mt: 1 }} variant="outlined" onClick={onClose}>
            Graduate
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
