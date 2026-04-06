"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import ControlledTextField from "@/components/common/forms/controlled-text-field";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateFinancialResponsibilityPdf } from "./helper";

export default function FinancialResponsibilityForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="financialResponsibility"
      formTitle="Financial Responsibility"
      annotatePdf={annotateFinancialResponsibilityPdf}
    >
      <ControlledDateField
        name="financialResponsibility.entryDate"
        control={control}
        label="Entry Date"
      />

      <ControlledTextField
        name="financialResponsibility.location"
        control={control}
        label="Location"
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="financialResponsibility.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="financialResponsibility.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
