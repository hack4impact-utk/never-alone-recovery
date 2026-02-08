"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledTextField from "@/components/common/forms/controlled-text-box";

import { IntakeFormValues } from "../intake-form-schema";

export default function DemographicForm(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();

  return (
    <Box>
      <Typography variant="h5">Demographics</Typography>

      <ControlledTextField
        control={control}
        errors={errors.demographic?.firstName}
        label="First Name"
        name="demographic.firstName"
      />

      <ControlledTextField
        control={control}
        errors={errors.demographic?.middleName}
        label="Middle Name"
        name="demographic.middleName"
      />

      <ControlledTextField
        control={control}
        errors={errors.demographic?.lastName}
        label="Last Name"
        name="demographic.lastName"
      />
    </Box>
  );
}
