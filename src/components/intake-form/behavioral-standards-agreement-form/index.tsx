"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateBehavioralStandardsAgreementPdf } from "./helper";

export default function BehavioralStandardsAgreementForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="behavioralStandardsAgreement"
      formTitle="Behavioral Standards Agreement Form"
      annotatePdf={annotateBehavioralStandardsAgreementPdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="behavioralStandardsAgreement.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="behavioralStandardsAgreement.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
