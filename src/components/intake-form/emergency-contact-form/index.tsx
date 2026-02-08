"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledTextField from "@/components/common/forms/controlled-text-box";

import { IntakeFormValues } from "../intake-form-schema";

export default function EmergencyContactForm(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();

  return (
    <Box>
      <Typography variant="h5">Emergency Contact</Typography>

      <ControlledTextField
        control={control}
        errors={errors.emergencyContact?.emergencyContactFirstName}
        label="First Name"
        name="emergencyContact.emergencyContactFirstName"
      />

      <ControlledTextField
        control={control}
        errors={errors.emergencyContact?.emergencyContactMiddleName}
        label="Middle Name"
        name="emergencyContact.emergencyContactMiddleName"
      />

      <ControlledTextField
        control={control}
        errors={errors.emergencyContact?.emergencyContactLastName}
        label="Last Name"
        name="emergencyContact.emergencyContactLastName"
      />
    </Box>
  );
}
