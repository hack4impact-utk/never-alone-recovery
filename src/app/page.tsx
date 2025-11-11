import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

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
    icon: <CheckCircleOutlineIcon />,
  },
  { id: "rent", title: "Rent", href: "/rent", icon: <AttachMoneyIcon /> },
  {
    id: "intake",
    title: "Intake Form",
    href: "/intake-form",
    icon: <AssignmentIcon />,
  },
  { id: "audits", title: "Audits", href: "/audit", icon: <SecurityIcon /> },
  {
    id: "client",
    title: "Client Dashboard",
    href: "/client-dashboard",
    icon: <PeopleIcon />,
  },
  {
    id: "staff",
    title: "Staff Dashboard",
    href: "/staff-dashboard",
    icon: <GroupIcon />,
  },
];

export default function HomePage(): ReactNode {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, mb: 4, color: "text.primary" }}
      >
        Home Page
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {tiles.map((t) => (
          <Grid key={t.id} size={{ xs: 12, sm: 4 }}>
            {/* <div> */}
            <div>
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardActionArea
                  component="a"
                  href={t.href || "#"}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: 80,
                      bgcolor: "primary.light",
                      position: "relative",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: "primary.main",
                        color: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: 4,
                        border: "3px solid white",
                      }}
                    >
                      {t.icon}
                    </Avatar>
                  </Box>

                  <CardContent
                    sx={{
                      mt: 4,
                      textAlign: "center",
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      paddingBottom: "24px !important",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        wordBreak: "break-word",
                        width: "100%",
                      }}
                    >
                      {t.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
