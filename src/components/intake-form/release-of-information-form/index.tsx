"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledPhoneNumberField from "@/components/common/forms/controlled-phone-number-field";
import ControlledSignaturePad from "@/components/common/forms/controlled-signature-pad";
import ControlledTextField from "@/components/common/forms/controlled-text-field";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateReleaseOfInformationPdf } from "./helper";

export default function ReleaseOfInformationForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="releaseOfInformation"
      formTitle="Release of Information Form"
      annotatePdf={annotateReleaseOfInformationPdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Agency Information
      </Typography>

      <ControlledTextField
        name="releaseOfInformation.holdingAgency"
        control={control}
        label="Holding Agency"
      />

      <ControlledTextField
        name="releaseOfInformation.address"
        control={control}
        label="Address"
      />

      <FormSection>
        <ControlledPhoneNumberField
          name="releaseOfInformation.phoneNumber"
          control={control}
          label="Phone Number"
        />

        <ControlledTextField
          name="releaseOfInformation.email"
          control={control}
          label="Email"
        />
      </FormSection>

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Signatures
      </Typography>

      <FormSection>
        <ControlledSignaturePad
          name="releaseOfInformation.residentSignature"
          control={control}
          label="Resident Signature"
        />

        <ControlledSignaturePad
          name="releaseOfInformation.staffSignature"
          control={control}
          label="Staff Signature"
        />
      </FormSection>
    </FormContainer>
  );
}
