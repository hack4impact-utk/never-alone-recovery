"use client";

import { Box, Button, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { Client } from "@/types/schema";

import Discharge from "./discharge-modal";
import Graduate from "./graduate-modal";

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
  const [openGraduate, setOpenGraduate] = useState(false);
  const [openDischarge, setOpenDischarge] = useState(false);
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            width: "min(90vw, 300px)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="h6" align="center">
              Client Information
            </Typography>

            <Button
              sx={{ mt: 3 }}
              variant="outlined"
              onClick={() => {
                setOpenDischarge(true);
              }}
            >
              Discharge
            </Button>
            <Button
              sx={{ mt: 1 }}
              variant="outlined"
              onClick={() => {
                setOpenGraduate(true);
              }}
            >
              Graduate
            </Button>
          </Box>
        </Box>
      </Modal>
      <Graduate
        open={openGraduate}
        onClose={() => setOpenGraduate(false)}
        client={client}
      />
      <Discharge
        open={openDischarge}
        onClose={() => setOpenDischarge(false)}
        client={client}
      />
    </>
  );
}
