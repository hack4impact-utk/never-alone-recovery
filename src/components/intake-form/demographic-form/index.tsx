"use client";

import { Box, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { IntakeFormValues } from "../intake-form-schema";

export default function DemographicForm(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();

  return (
    <Box>
      <Typography variant="h5">Demographics</Typography>
      <Box>
        <Controller
          control={control}
          name="demographic.firstName"
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.demographic?.firstName}
              helperText={errors.demographic?.firstName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="demographic.middleName"
          render={({ field }) => (
            <TextField
              {...field}
              label="Middle Name"
              error={!!errors.demographic?.middleName}
              helperText={errors.demographic?.middleName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          control={control}
          name="demographic.lastName"
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!errors.demographic?.lastName}
              helperText={errors.demographic?.lastName?.message}
              fullWidth
            />
          )}
        />
      </Box>
    </Box>
  );
}
