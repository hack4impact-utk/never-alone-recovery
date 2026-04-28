"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu } from "@mui/material";
import React, { ReactNode, useState } from "react";

import type { HousingManager } from "@/types/housing-manager";
import { Client } from "@/types/schema";

import DischargeModal from "./discharge-modal";
import GraduateModal from "./graduate-modal";
import HousingManageModal from "./housing-manager-modal";
import IntakeFormModal from "./intake-form-modal";
import TasksModal from "./tasks-modal";

type ClientActionsMenuProps = {
  client: Client;
  housingManagers: HousingManager[];
  onUpdateHousingManager: (client: Client) => void;
  onGraduate: (client: Client) => void;
  onDischarge: (client: Client) => void;
};

export default function ClientActionsMenu({
  client,
  housingManagers,
  onUpdateHousingManager,
  onGraduate,
  onDischarge,
}: ClientActionsMenuProps): ReactNode {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = (): void => {
    setMenuAnchor(null);
  };

  return (
    <>
      <IconButton
        aria-label="Open client actions"
        size="small"
        onClick={handleOpenMenu}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <TasksModal client={client} />
        <IntakeFormModal client={client} />
        <HousingManageModal
          client={client}
          housingManagers={housingManagers}
          onUpdateHousingManager={onUpdateHousingManager}
        />
        <GraduateModal client={client} onGraduate={onGraduate} />
        <DischargeModal client={client} onDischarge={onDischarge} />
      </Menu>
    </>
  );
}
