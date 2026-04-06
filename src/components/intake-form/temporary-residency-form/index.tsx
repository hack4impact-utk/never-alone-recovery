"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateTemporaryResidencyPdf } from "./helper";

export default function TemporaryResidencyForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="temporaryResidency"
      formTitle="Temporary Residency Form"
      annotatePdf={annotateTemporaryResidencyPdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="temporaryResidency.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="temporaryResidency.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
