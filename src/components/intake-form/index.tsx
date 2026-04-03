"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ControlledDateField from "../common/forms/controlled-date-field";
import ControlledDropdown from "../common/forms/controlled-dropdown";
import ControlledTextField from "../common/forms/controlled-text-field";

const demographicFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((value) => value === "male" || value === "female", {
      message: "Gender is required",
    }),
  date: z.string().min(1, "Date is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  socialSecurityNumber: z.string().min(1, "Social security number is required"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  tomis: z.string().min(1, "TOMIS is required"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  lastKnownAddress: z.string().min(1, "Last known address is required"),
  amountOfCleanTime: z.string().min(1, "Amount of clean time is required"),
  drugOfChoice: z.string().min(1, "Drug of choice is required"),
  priorRecoveryExperience: z
    .string()
    .min(1, "Prior recovery experience is required"),
});

type DemographicFormValues = z.infer<typeof demographicFormSchema>;

export default function IntakeForm(): ReactNode {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DemographicFormValues>({
    resolver: zodResolver(demographicFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      date: "",
      dateOfBirth: "",
      socialSecurityNumber: "",
      ethnicity: "",
      phoneNumber: "",
      tomis: "",
      email: "",
      lastKnownAddress: "",
      amountOfCleanTime: "",
      drugOfChoice: "",
      priorRecoveryExperience: "",
      gender: "",
    },
  });

  const onSubmit = (data: DemographicFormValues): void => {
    void data;
    // Submit action will be wired to API mutation in a follow-up change.
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Demographic Information
            </Typography>
          </Grid>

          <ControlledTextField
            name="firstName"
            control={control}
            label="First Name"
            gridProps={{ size: { xs: 12, sm: 4 } }}
          />

          <ControlledTextField
            name="middleName"
            control={control}
            label="Middle Name"
            gridProps={{ size: { xs: 12, sm: 4 } }}
          />

          <ControlledTextField
            name="lastName"
            control={control}
            label="Last Name"
            gridProps={{ size: { xs: 12, sm: 4 } }}
          />

          <ControlledDropdown
            name="gender"
            control={control}
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          <ControlledDateField
            name="dateOfBirth"
            control={control}
            label="Date of Birth"
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          <ControlledTextField
            name="socialSecurityNumber"
            control={control}
            label="SSN"
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          <ControlledTextField
            name="email"
            control={control}
            label="Email"
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "Processing..." : "Submit Application"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
