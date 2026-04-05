"use client";

import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import FormContainer from "@/components/common/forms/form-container";

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
