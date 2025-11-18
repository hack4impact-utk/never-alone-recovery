import {
  Avatar,
  Box,
  Card,
  CardContent,
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

export default function HomeIcon(props: Tile): ReactNode {
  return (
    <Grid key={props.id} size={{ xs: 12, sm: 4 }}>
      <a href={props.href} style={{ textDecoration: "none" }}>
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
              {props.icon}
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
              {props.title}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Grid>
  );
}
