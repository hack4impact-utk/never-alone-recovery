"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import React, { JSX } from "react";

export default function MetricsPage(): JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography align="center" variant="h5" sx={{ mt: 2 }}>
        Metrics
      </Typography>

      <Grid container spacing={4} alignItems="stretch" sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Paper variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                  size="small"
                  label="Start Date"
                  type="date"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
                <Typography color="text.secondary">to</Typography>
                <TextField
                  size="small"
                  label="End Date"
                  type="date"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  sx={{ ml: "auto" }}
                >
                  Update Totals
                </Button>
              </Box>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                p: 3,
                flexGrow: 1,
                minHeight: 600,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" textAlign="center">
                Enrollment & Graduation Status
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ flexGrow: 1, width: "100%" }}>
                <BarChart
                  series={[
                    { data: [80], label: "Total Students", id: "total" },
                    { data: [35], label: "Discharged", id: "discharged" },
                    { data: [55], label: "Graduates", id: "grads" },
                  ]}
                  xAxis={[{ data: ["Program Metrics"], scaleType: "band" }]}
                  margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ flexGrow: 1, width: "100%", textAlign: "center" }}>
              <Typography variant="h6">Ethnicity Distribution</Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 25, label: "White" },
                      { id: 1, value: 30, label: "Black" },
                      { id: 2, value: 25, label: "Asian" },
                      { id: 3, value: 20, label: "Other" },
                    ],
                    outerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "horizontal",
                    position: { vertical: "bottom", horizontal: "center" },
                  },
                }}
                height={250}
              />
            </Box>

            <Divider />

            <Box sx={{ flexGrow: 1, width: "100%", textAlign: "center" }}>
              <Typography variant="h6">Age Groups</Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 15, label: "18-20" },
                      { id: 1, value: 20, label: "21-30" },
                      { id: 2, value: 20, label: "31-40" },
                      { id: 3, value: 15, label: "41-50" },
                      { id: 4, value: 15, label: "50-60" },
                      { id: 5, value: 15, label: "60+" },
                    ],
                    outerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "horizontal",
                    position: { vertical: "bottom", horizontal: "center" },
                  },
                }}
                height={250}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
