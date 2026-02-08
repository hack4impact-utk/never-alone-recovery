"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledDatePicker from "@/components/common/forms/controlled-date-picker";
import ControlledRadioButtons from "@/components/common/forms/controlled-radio-buttons";
import ControlledTextField from "@/components/common/forms/controlled-text-box";

import { IntakeFormValues } from "../intake-form-schema";

export default function DemographicForm(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<IntakeFormValues>();

  return (
    <Box sx={{ padding: 2, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Demographics
      </Typography>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Personal Information
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
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

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.demographic?.ssn}
            label="SSN"
            name="demographic.ssn"
          />

          <ControlledDatePicker
            control={control}
            errors={errors.demographic?.dateOfBirth}
            label="Date of Birth"
            name="demographic.dateOfBirth"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledRadioButtons
            control={control}
            errors={errors.demographic?.gender}
            label="Gender"
            name="demographic.gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.demographic?.tomis}
            label="TOMIS"
            name="demographic.tomis"
          />

          <ControlledTextField
            control={control}
            errors={errors.demographic?.email}
            label="Email"
            name="demographic.email"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.demographic?.lastKnownAddress}
            label="Last Known Address"
            name="demographic.lastKnownAddress"
            multiline
            rows={3}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.demographic?.cleanTime}
            label="Amount of Clean Time"
            name="demographic.cleanTime"
          />

          <ControlledTextField
            control={control}
            errors={errors.demographic?.drugOfChoice}
            label="Drug of Choice"
            name="demographic.drugOfChoice"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ControlledTextField
            control={control}
            errors={errors.demographic?.priorRecoveryExperience}
            label="Prior Recovery Experience"
            name="demographic.priorRecoveryExperience"
            multiline
            rows={3}
          />
        </Box>
      </Box>
    </Box>
  );
}
