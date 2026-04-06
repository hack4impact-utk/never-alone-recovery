"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateBehavioralStandardsPdf } from "./helper";

export default function BehavioralStandardsForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="behavioralStandards"
      formTitle="Behavioral Standards Form"
      annotatePdf={annotateBehavioralStandardsPdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="behavioralStandards.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="behavioralStandards.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
