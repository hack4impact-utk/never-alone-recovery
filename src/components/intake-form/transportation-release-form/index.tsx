"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateTransportationReleasePdf } from "./helper";

export default function TransportationReleaseForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="transportationRelease"
      formTitle="Transportation Release Form"
      annotatePdf={annotateTransportationReleasePdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="transportationRelease.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="transportationRelease.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
