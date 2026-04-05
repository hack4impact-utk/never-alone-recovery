"use client";

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";

import { IntakeFormValues } from "../schema";
import { annotateServiceContractPdf } from "./helper";

export default function ServiceContractForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="serviceContract"
      formTitle="Service Contract Form"
      annotatePdf={annotateServiceContractPdf}
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
