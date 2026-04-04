"use client";

import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { ReactNode, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import DocumentDisplay from "@/components/common/document-display/document-display";
import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import { useIntakeFormContext } from "@/providers/intake-form-provider";
import {
  addDateToPdf,
  addNameToPdf,
  addSignatureToPdf,
  addTextToPdf,
} from "@/utils/pdf/annotations";
import { fetchPdf } from "@/utils/pdf/conversion";

import { IntakeFormValues } from "../schema";

export default function ServiceContractForm(): ReactNode {
  const { getPdfUrl, savePdf } = useIntakeFormContext();
  const { control, getValues } = useFormContext<IntakeFormValues>();
  const watch = useWatch({ name: "serviceContract" });

  const generatePdf = async (): Promise<void> => {
    const pdf = await fetchPdf("serviceContract");
    const form = pdf.getForm();

    const {
      demographic: { firstName, middleName, lastName },
      serviceContract: { residentSignature, staffSignature, entryDate },
    } = getValues();

    addDateToPdf(form);
    addNameToPdf(form, firstName, middleName, lastName);

    const signDate = dayjs();

    addTextToPdf(form, "signDay", signDate.format("DD"));
    addTextToPdf(form, "signMonth", signDate.format("MMMM"));
    addTextToPdf(form, "signYear", signDate.format("YY"));

    if (entryDate) {
      const entryDateJs = dayjs(entryDate);

      addTextToPdf(form, "entryDay", entryDateJs.format("DD"));
      addTextToPdf(form, "entryMonth", entryDateJs.format("MMMM"));
      addTextToPdf(form, "entryYear", entryDateJs.format("YY"));
    }

    await addSignatureToPdf(pdf, residentSignature, 6, {
      x: 50,
      y: 475,
      width: 200,
      height: 50,
    });

    await addSignatureToPdf(pdf, staffSignature, 6, {
      x: 50,
      y: 390,
      width: 200,
      height: 50,
    });

    await savePdf("serviceContract", pdf);
  };

  useEffect(() => {
    void generatePdf();
  }, [watch]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Service Contract Form
        </Typography>
      </Grid>

      <DocumentDisplay pdfUrl={getPdfUrl("serviceContract")} />

      <ControlledDateField
        name="serviceContract.entryDate"
        control={control}
        label="Entry Date"
        gridProps={{ size: 12 }}
      />

      <ControlledSignaturePad
        name="serviceContract.residentSignature"
        control={control}
        label="Resident Signature"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledSignaturePad
        name="serviceContract.staffSignature"
        control={control}
        label="Staff Signature"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />
    </Grid>
  );
}
