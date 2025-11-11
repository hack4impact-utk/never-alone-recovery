import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

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
        {tiles.map((tile) => (
          <Grid key={tile.id} size={{ xs: 12, sm: 4 }}>
            <a href={tile.href} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Box
                  sx={{
                    height: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "black",
                    color: "white",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      p: 2,
                      width: 64,
                      height: 64,
                    }}
                  >
                    {tile.icon}
                  </Avatar>
                </Box>

                <CardContent
                  sx={{
                    textAlign: "center",
                    bgcolor: "white",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {tile.title}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
