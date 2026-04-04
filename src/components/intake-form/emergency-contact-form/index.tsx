"use client";

import { Divider, Grid, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import ControlledTextField from "@/components/common/forms/controlled-text-field";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import { convertUrlToPdf } from "@/utils/pdf/conversion";

import { IntakeFormValues } from "../schema";

export default function EmergencyContactForm(): ReactNode {
  const { control, getValues } = useFormContext<IntakeFormValues>();
  const { getPdfUrl, savePdf } = useIntakeFormContext();

  const generatePdf = async (): Promise<void> => {
    const pdf = await convertUrlToPdf(
      "neveralonerecovery.emergencycontactform.pdf",
    );

    const form = pdf.getForm();

    for (const [key, value] of Object.entries(getValues().emergencyContact)) {
      form.getTextField(key).setText(value);
    }

    await savePdf("emergencyContact", pdf);
  };

  useEffect(() => {
    void generatePdf();
  }, []);

  return (
    <Grid container spacing={3} onBlurCapture={generatePdf}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Emergency Contact Information
        </Typography>
      </Grid>

      <DocumentDisplay pdfUrl={getPdfUrl("emergencyContact")} />

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
    </Grid>
  );
}
