"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateConfidentialityAgreementPdf } from "./helper";

export default function ConfidentialityAgreementForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="confidentialityAgreement"
      formTitle="Confidentiality Agreement Form"
      annotatePdf={annotateConfidentialityAgreementPdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="confidentialityAgreement.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="confidentialityAgreement.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
