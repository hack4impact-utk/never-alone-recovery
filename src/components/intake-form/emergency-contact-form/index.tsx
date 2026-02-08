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
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Emergency Contacts
      </Typography>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Emergency Contact Person 1
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.emergencyContact?.person1FirstName}
            label="First Name"
            name="emergencyContact.person1FirstName"
          />

          <ControlledTextField
            control={control}
            errors={errors.emergencyContact?.person1LastName}
            label="Last Name"
            name="emergencyContact.person1LastName"
          />
        </Box>

        <ControlledTextField
          control={control}
          errors={errors.emergencyContact?.person1Relationship}
          label="Relationship"
          name="emergencyContact.person1Relationship"
        />

        <ControlledTextField
          control={control}
          errors={errors.emergencyContact?.person1PhoneNumber}
          label="Phone Number"
          name="emergencyContact.person1PhoneNumber"
        />

        <ControlledTextField
          control={control}
          errors={errors.emergencyContact?.person1Address}
          label="Address"
          name="emergencyContact.person1Address"
          multiline
          rows={3}
        />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Emergency Contact Person 2
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.emergencyContact?.person2FirstName}
            label="First Name"
            name="emergencyContact.person2FirstName"
          />

          <ControlledTextField
            control={control}
            errors={errors.emergencyContact?.person2LastName}
            label="Last Name"
            name="emergencyContact.person2LastName"
          />
        </Box>

        <ControlledTextField
          control={control}
          errors={errors.emergencyContact?.person2Relationship}
          label="Relationship"
          name="emergencyContact.person2Relationship"
        />

        <ControlledTextField
          control={control}
          errors={errors.emergencyContact?.person2PhoneNumber}
          label="Phone Number"
          name="emergencyContact.person2PhoneNumber"
        />

        <ControlledTextField
          control={control}
          errors={errors.emergencyContact?.person2Address}
          label="Address"
          name="emergencyContact.person2Address"
          multiline
          rows={3}
        />
      </Box>
    </Box>
  );
}
