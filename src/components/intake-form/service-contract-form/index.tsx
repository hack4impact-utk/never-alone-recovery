"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

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
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Contract Details
      </Typography>

      <ControlledDateField
        name="serviceContract.entryDate"
        control={control}
        label="Entry Date"
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="serviceContract.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="serviceContract.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
