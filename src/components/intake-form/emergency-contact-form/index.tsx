"use client";

import { Divider, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import ControlledPhoneNumberField from "@/components/common/forms/controlled-phone-number-field";
import ControlledTextField from "@/components/common/forms/controlled-text-field";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateEmergencyContactPdf } from "./helper";

export default function EmergencyContactForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();

  return (
    <FormContainer
      formName="emergencyContact"
      formTitle="Emergency Contact Information"
      annotatePdf={annotateEmergencyContactPdf}
      showPdf={false}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Emergency Contact 1
      </Typography>

      <ControlledTextField
        name="emergencyContact.contact1Name"
        control={control}
        label="Emergency Contact"
      />

      <FormSection>
        <ControlledTextField
          name="emergencyContact.contact1Relationship"
          control={control}
          label="Relationship to You"
        />

        <ControlledPhoneNumberField
          name="emergencyContact.contact1PhoneNumber"
          control={control}
          label="Phone Number"
        />
      </FormSection>

      <ControlledTextField
        name="emergencyContact.contact1Address"
        control={control}
        label="Address"
      />

      <Divider />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Emergency Contact 2
      </Typography>

      <ControlledTextField
        name="emergencyContact.contact2Name"
        control={control}
        label="Emergency Contact"
      />

      <FormSection>
        <ControlledTextField
          name="emergencyContact.contact2Relationship"
          control={control}
          label="Relationship to You"
        />

        <ControlledPhoneNumberField
          name="emergencyContact.contact2PhoneNumber"
          control={control}
          label="Phone Number"
        />
      </FormSection>

      <ControlledTextField
        name="emergencyContact.contact2Address"
        control={control}
        label="Address"
      />
    </FormContainer>
  );
}
