"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
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
  socialSecurityNumber: z.string().min(1, "Social security number is required"),
  ethnicity: z.enum(
    [
      "White",
      "Black or African American",
      "American Indian or Alaska Native",
      "Asian",
      "Native Hawaiian or Other Pacific Islander",
      "Other",
    ],
    "Ethnicity is required",
  ),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  tomis: z.string().min(1, "TOMIS is required"),
  email: z.email("Invalid email address").min(1, "Email is required"),
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
      socialSecurityNumber: "",
      dateOfBirth: "",
      ethnicity: undefined,
      phoneNumber: "",
      tomis: "",
      email: "",
    },
  });

  const onSubmit = (data: DemographicFormValues): void => {
    console.log("Form submitted with data:", data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 800, mt: 4 }}
    >
      <Paper sx={{ p: 4 }}>
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

          <ControlledDropdown
            name="ethnicity"
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

          {/* ADDED FIELD: TOMIS */}
          <ControlledTextField
            name="tomis"
            control={control}
            label="TOMIS ID"
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          {/* ADDED FIELD: Phone Number */}
          <ControlledTextField
            name="phoneNumber"
            control={control}
            label="Phone Number"
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          <ControlledTextField
            name="email"
            control={control}
            label="Email"
            gridProps={{ size: { xs: 12, sm: 6 } }}
          />

          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Application"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
