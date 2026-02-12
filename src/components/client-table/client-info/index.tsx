"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ReactNode, useState } from "react";

import { Client } from "@/types/schema";

import Discharge from "./discharge-modal";
import Graduate from "./graduate-modal";

type ClientInfoProps = {
  client: Client;
  setClientList: React.Dispatch<React.SetStateAction<Client[]>>;
};

export default function ClientInfo({
  client,
  setClientList,
}: ClientInfoProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        Info
      </Button>

      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          Client Information
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Graduate client={client} setClientList={setClientList} />
            <Discharge client={client} setClientList={setClientList} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
