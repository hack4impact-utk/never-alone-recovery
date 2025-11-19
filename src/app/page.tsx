import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import { Container, Grid } from "@mui/material";
import React, { ReactNode } from "react";

import HomeIcon from "@/components/home-icon";

const ICON_FONT_SIZE = 48;

type Tile = {
  id: string;
  title: string;
  href?: string;
  icon: React.ReactNode;
};

const tiles: Tile[] = [
  {
    id: "tasks",
    title: "Tasks",
    href: "/tasks",
    icon: <CheckCircleOutlineIcon sx={{ fontSize: ICON_FONT_SIZE }} />,
  },
  {
    id: "rent",
    title: "Rent",
    href: "/rent",
    icon: <AttachMoneyIcon sx={{ fontSize: ICON_FONT_SIZE }} />,
  },
  {
    id: "intake",
    title: "Intake Form",
    href: "/intake-form",
    icon: <AssignmentIcon sx={{ fontSize: ICON_FONT_SIZE }} />,
  },
  {
    id: "audits",
    title: "Audits",
    href: "/audit",
    icon: <SecurityIcon sx={{ fontSize: ICON_FONT_SIZE }} />,
  },
  {
    id: "client",
    title: "Client Dashboard",
    href: "/client-dashboard",
    icon: <PeopleIcon sx={{ fontSize: ICON_FONT_SIZE }} />,
  },
  {
    id: "staff",
    title: "Staff Dashboard",
    href: "/staff-dashboard",
    icon: <BadgeIcon sx={{ fontSize: ICON_FONT_SIZE }} />,
  },
];

export default function HomePage(): ReactNode {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        {tiles.map((tile) => HomeIcon(tile))}
      </Grid>
    </Container>
  );
}
