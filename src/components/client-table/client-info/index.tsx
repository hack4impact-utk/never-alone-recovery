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
import ChangeHousingManger from "./housing-manager-modal";
import { HousingManger } from "@/types/housing-manager";

type ClientInfoProps = {
  client: Client;
  housingMangers: HousingManger[] | null;
  onGraduate: (client: Client) => void;
  onDischarge: (client: Client) => void;
};

export default function ClientInfo({
  client,
  housingMangers,
  onGraduate,
  onDischarge,
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
            <ChangeHousingManger client={client} housingManagers={housingMangers} />
            <Graduate client={client} onGraduate={onGraduate} />
            <Discharge client={client} onDischarge={onDischarge} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
