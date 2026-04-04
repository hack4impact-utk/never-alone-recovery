"use client";

import { Divider, Grid, Typography } from "@mui/material";
import { PDFDocument } from "pdf-lib";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledTextField from "@/components/common/forms/controlled-text-field";
import FormContainer from "@/components/common/forms/form-container";

import { IntakeFormValues } from "../schema";

export default function EmergencyContactForm(): ReactNode {
  const { control, getValues } = useFormContext<IntakeFormValues>();

  const generatePdf = (pdf: PDFDocument): void => {
    const form = pdf.getForm();

    for (const [key, value] of Object.entries(getValues().emergencyContact)) {
      form.getTextField(key).setText(value);
    }
  };

  return (
    <FormContainer
      formName="emergencyContact"
      formTitle="Emergency Contact Information"
      generatePdf={generatePdf}
      showPdf={false}
    >
      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Emergency Contact 1
        </Typography>
      </Grid>

      <ControlledTextField
        name="emergencyContact.contact1Name"
        control={control}
        label="Emergency Contact"
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="emergencyContact.contact1Relationship"
        control={control}
        label="Relationship to You"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="emergencyContact.contact1PhoneNumber"
        control={control}
        label="Phone Number"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="emergencyContact.contact1Address"
        control={control}
        label="Address"
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Divider />
      </Grid>

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Emergency Contact 2
        </Typography>
      </Grid>

      <ControlledTextField
        name="emergencyContact.contact2Name"
        control={control}
        label="Emergency Contact"
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="emergencyContact.contact2Relationship"
        control={control}
        label="Relationship to You"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="emergencyContact.contact2PhoneNumber"
        control={control}
        label="Phone Number"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="emergencyContact.contact2Address"
        control={control}
        label="Address"
        gridProps={{ size: 12 }}
      />
    </FormContainer>
  );
}
