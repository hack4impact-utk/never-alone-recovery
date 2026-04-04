"use client";

import { PDFDocument } from "pdf-lib";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import { addSignatureToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export default function TransportationReleaseForm(): ReactNode {
  const { control, getValues } = useFormContext<IntakeFormValues>();

  const generatePdf = async (pdf: PDFDocument): Promise<void> => {
    const {
      transportationRelease: { residentSignature, staffSignature },
    } = getValues();

    await addSignatureToPdf(pdf, residentSignature, 0, {
      x: 150,
      y: 390,
      width: 200,
      height: 50,
    });

    await addSignatureToPdf(pdf, staffSignature, 0, {
      x: 150,
      y: 325,
      width: 200,
      height: 50,
    });
  };

  return (
    <FormContainer
      formName="transportationRelease"
      formTitle="Transportation Release Form"
      generatePdf={generatePdf}
    >
      <ControlledSignaturePad
        name="transportationRelease.residentSignature"
        control={control}
        label="Resident Signature"
        gridProps={{ size: 6 }}
      />

      <ControlledSignaturePad
        name="transportationRelease.staffSignature"
        control={control}
        label="Staff Signature"
        gridProps={{ size: 6 }}
      />
    </FormContainer>
  );
}
