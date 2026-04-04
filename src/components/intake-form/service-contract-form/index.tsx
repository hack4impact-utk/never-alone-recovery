"use client";

import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import { addSignatureToPdf, addTextToPdf } from "@/utils/pdf/annotations";

import { IntakeFormValues } from "../schema";

export default function ServiceContractForm(): ReactNode {
  const { control, getValues } = useFormContext<IntakeFormValues>();

  const generatePdf = async (pdf: PDFDocument): Promise<void> => {
    const form = pdf.getForm();

    const {
      serviceContract: { entryDate, residentSignature, staffSignature },
    } = getValues();

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
  };

  return (
    <FormContainer
      formName="serviceContract"
      formTitle="Service Contract Form"
      generatePdf={generatePdf}
    >
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
    </FormContainer>
  );
}
