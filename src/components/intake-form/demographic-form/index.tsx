"use client";

import { Divider, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledDropdown from "@/components/common/forms/controlled-dropdown";
import ControlledTextField from "@/components/common/forms/controlled-text-field";

import { IntakeFormValues } from "../schema";

export default function IntakeForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Demographic Information
        </Typography>
      </Grid>

      <ControlledTextField
        name="demographic.firstName"
        control={control}
        label="First Name"
        gridProps={{ size: { xs: 12, sm: 4 } }}
      />

      <ControlledTextField
        name="demographic.middleName"
        control={control}
        label="Middle Name"
        gridProps={{ size: { xs: 12, sm: 4 } }}
      />

      <ControlledTextField
        name="demographic.lastName"
        control={control}
        label="Last Name"
        gridProps={{ size: { xs: 12, sm: 4 } }}
      />

      <ControlledDateField
        name="demographic.dateOfBirth"
        control={control}
        label="Date of Birth"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.socialSecurityNumber"
        control={control}
        label="SSN"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledDropdown
        name="demographic.ethnicity"
        control={control}
        label="Ethnicity"
        options={[
          { value: "White", label: "White" },
          {
            value: "Black or African American",
            label: "Black or African American",
          },
          {
            value: "American Indian or Alaska Native",
            label: "American Indian or Alaska Native",
          },
          { value: "Asian", label: "Asian" },
          {
            value: "Native Hawaiian or Other Pacific Islander",
            label: "Native Hawaiian or Other Pacific Islander",
          },
          { value: "Other", label: "Other" },
        ]}
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.tomis"
        control={control}
        label="TOMIS ID"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.phoneNumber"
        control={control}
        label="Phone Number"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.email"
        control={control}
        label="Email"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <Grid size={12}>
        <Divider />
      </Grid>
    </Grid>
  );
}
