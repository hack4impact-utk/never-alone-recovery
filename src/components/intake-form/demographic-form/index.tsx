"use client";

import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledDropdown from "@/components/common/forms/controlled-dropdown";
import ControlledPhoneNumberField from "@/components/common/forms/controlled-phone-number-field";
import ControlledRadioButton from "@/components/common/forms/controlled-radio-button";
import ControlledSocialSecurityField from "@/components/common/forms/controlled-social-security-field";
import ControlledTextField from "@/components/common/forms/controlled-text-field";
import FormContainer from "@/components/common/forms/form-container";
import FormSection from "@/components/common/forms/form-section";

import { IntakeFormValues } from "../schema";
import { annotateDemographicPdf } from "./helper";

const yesNoOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const maritalStatusOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
];

const militaryBranchOptions = [
  { value: "Army", label: "Army" },
  { value: "Navy", label: "Navy" },
  { value: "Air Force", label: "Air Force" },
  { value: "Marines", label: "Marines" },
  { value: "Coast Guard", label: "Coast Guard" },
];

const ethnicityOptions = [
  { value: "White", label: "White" },
  { value: "Black or African American", label: "Black or African American" },
  {
    value: "American Indian or Alaska Native",
    label: "American Indian or Alaska Native",
  },
  { value: "Asian", label: "Asian" },
  {
    value: "Native Hawaiian or Other Pacific Islander",
    label: "Native Hawaiian or Other Pacific Islander",
  },
  { value: "Other", label: "Other" },
];

export default function IntakeForm(): ReactNode {
  const { control } = useFormContext<IntakeFormValues>();
  const [
    receiveBenefits,
    isDisabled,
    hasMentalHealthRecs,
    participatingInTreatment,
    hasChildren,
    servedInMilitary,
    hasDriversLicense,
    convictedOfDUI,
    convictedOfSexOffense,
    convictedOfFelony,
    onProbationOrParole,
    inRecoveryCourt,
    receivesDisability,
  ] = useWatch({
    control,
    name: [
      "demographic.receiveBenefits",
      "demographic.isDisabled",
      "demographic.hasMentalHealthRecs",
      "demographic.participatingInTreatment",
      "demographic.hasChildren",
      "demographic.servedInMilitary",
      "demographic.hasDriversLicense",
      "demographic.convictedOfDUI",
      "demographic.convictedOfSexOffense",
      "demographic.convictedOfFelony",
      "demographic.onProbationOrParole",
      "demographic.inRecoveryCourt",
      "demographic.receivesDisability",
    ],
  });

  return (
    <FormContainer
      formName="demographic"
      formTitle="Demographic Information"
      annotatePdf={annotateDemographicPdf}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Personal Information
      </Typography>

      <FormSection>
        <ControlledTextField
          name="demographic.firstName"
          control={control}
          label="First Name"
        />

        <ControlledTextField
          name="demographic.middleName"
          control={control}
          label="Middle Name"
        />

        <ControlledTextField
          name="demographic.lastName"
          control={control}
          label="Last Name"
        />
      </FormSection>

      <FormSection>
        <ControlledDateField
          name="demographic.dateOfBirth"
          control={control}
          label="Date of Birth"
        />

        <ControlledSocialSecurityField
          name="demographic.socialSecurityNumber"
          control={control}
          label="Social Security Number"
          placeholder="123-45-6789"
        />
      </FormSection>

      <FormSection>
        <ControlledDropdown
          name="demographic.ethnicity"
          control={control}
          label="Ethnicity"
          options={ethnicityOptions}
        />

        <ControlledTextField
          name="demographic.tomis"
          control={control}
          label="TOMIS ID"
        />
      </FormSection>

      <FormSection>
        <ControlledPhoneNumberField
          name="demographic.phoneNumber"
          control={control}
          label="Phone Number"
        />

        <ControlledTextField
          name="demographic.email"
          control={control}
          label="Email"
        />
      </FormSection>

      <ControlledTextField
        name="demographic.lastKnownAddress"
        control={control}
        label="Last Known Address"
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Recovery History
      </Typography>

      <FormSection>
        <ControlledTextField
          name="demographic.cleanTime"
          control={control}
          label="How long have you maintained sobriety?"
        />

        <ControlledTextField
          name="demographic.drugOfChoice"
          control={control}
          label="Drug of Choice"
        />
      </FormSection>

      <ControlledTextField
        name="demographic.priorRecoveryExperience"
        control={control}
        label="Please describe any prior recovery experience"
        multiline
        minRows={3}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Medical History
      </Typography>

      <ControlledTextField
        name="demographic.surgeries"
        control={control}
        label="Please list any past surgeries"
      />

      <ControlledTextField
        name="demographic.allergies"
        control={control}
        label="Please list any allergies"
      />

      <ControlledTextField
        name="demographic.medications"
        control={control}
        label="Please list current medications"
      />

      <ControlledTextField
        name="demographic.insurance"
        control={control}
        label="Insurance provider / coverage"
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Benefits and Disability
      </Typography>

      <ControlledRadioButton
        name="demographic.receiveBenefits"
        control={control}
        label="Do you currently receive any state or federal benefits?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.benefitsDesc"
        control={control}
        label="What benefits do you currently receive?"
        showField={receiveBenefits === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.isDisabled"
        control={control}
        label="Do you have a mental or physical disability?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.disabilityDesc"
        control={control}
        label="Please describe your disability"
        showField={isDisabled === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.receivesDisability"
        control={control}
        label="Do you currently receive disability benefits?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.receivesDisabilityReason"
        control={control}
        label="Reason for Disability Benefits"
        showField={receivesDisability === "Yes"}
      />

      <ControlledTextField
        name="demographic.receivedDisabilityAmount"
        control={control}
        label="Amount of Disability Benefits"
        showField={receivesDisability === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.receivesFoodStamps"
        control={control}
        label="Do you currently receive SNAP/food stamp benefits?"
        options={yesNoOptions}
      />

      <ControlledRadioButton
        name="demographic.hasMentalHealthRecs"
        control={control}
        label="Do you have any mental health diagnoses or recommendations?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.mentalHealthRecs"
        control={control}
        label="Please describe the mental health diagnoses/recommendations"
        multiline
        minRows={3}
        showField={hasMentalHealthRecs === "Yes"}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Treatment and Family
      </Typography>

      <ControlledRadioButton
        name="demographic.participatingInTreatment"
        control={control}
        label="Are you currently participating in mental health treatment?"
        options={yesNoOptions}
      />

      <>
        <ControlledTextField
          name="demographic.typeOfTreatment"
          control={control}
          showField={participatingInTreatment === "Yes"}
          label="What type of treatment are you receiving?"
        />

        <ControlledTextField
          name="demographic.howOften"
          control={control}
          showField={participatingInTreatment === "Yes"}
          label="How often do you attend treatment?"
        />

        <ControlledTextField
          name="demographic.locationOfTreatment"
          control={control}
          showField={participatingInTreatment === "Yes"}
          label="Where do you receive treatment?"
        />
      </>

      <ControlledDropdown
        name="demographic.maritalStatus"
        control={control}
        label="Marital Status"
        options={maritalStatusOptions}
      />

      <ControlledRadioButton
        name="demographic.hasChildren"
        control={control}
        label="Do you have children?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.numberOfChildren"
        control={control}
        showField={hasChildren === "Yes"}
        label="Number of Children"
      />

      <ControlledRadioButton
        name="demographic.isPregnant"
        control={control}
        label="Are you currently pregnant?"
        options={yesNoOptions}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Employment and Military
      </Typography>

      <ControlledTextField
        name="demographic.currentEmployment"
        control={control}
        label="Current employer / employment status"
      />

      <ControlledTextField
        name="demographic.employmentContactInfo"
        control={control}
        label="Employment contact information"
      />

      <FormSection>
        <ControlledDateField
          name="demographic.employmentStartDate"
          control={control}
          label="Employment Start Date"
        />

        <ControlledDateField
          name="demographic.employmentEndDate"
          control={control}
          label="Employment End Date"
        />
      </FormSection>

      <ControlledRadioButton
        name="demographic.servedInMilitary"
        control={control}
        label="Have you served in the military?"
        options={yesNoOptions}
      />

      {servedInMilitary === "Yes" && (
        <FormSection>
          <ControlledDropdown
            name="demographic.militaryBranch"
            control={control}
            label="Military Branch"
            options={militaryBranchOptions}
          />

          <ControlledDateField
            name="demographic.militaryStartDate"
            control={control}
            label="Military Start Date"
          />

          <ControlledDateField
            name="demographic.militaryEndDate"
            control={control}
            label="Military End Date"
          />
        </FormSection>
      )}

      <ControlledTextField
        name="demographic.militaryDischarge"
        control={control}
        label="Discharge status / type"
        showField={servedInMilitary === "Yes"}
      />

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Education, License, and Legal
      </Typography>

      <ControlledRadioButton
        name="demographic.hasHighSchoolDiploma"
        control={control}
        label="Do you have a high school diploma?"
        options={yesNoOptions}
      />

      <ControlledRadioButton
        name="demographic.hasGED"
        control={control}
        label="Do you have a GED?"
        options={yesNoOptions}
      />

      <ControlledRadioButton
        name="demographic.hasCollegeDegree"
        control={control}
        label="Do you have a college degree?"
        options={yesNoOptions}
      />

      <ControlledRadioButton
        name="demographic.hasDriversLicense"
        control={control}
        label="Do you currently have a driver's license?"
        options={yesNoOptions}
      />

      {hasDriversLicense === "Yes" && (
        <FormSection>
          <ControlledTextField
            name="demographic.driversLicenseNumber"
            control={control}
            label="Driver's License Number"
          />

          <ControlledDateField
            name="demographic.dlIssueDate"
            control={control}
            label="DL Issue Date"
          />

          <ControlledDateField
            name="demographic.dlExpDate"
            control={control}
            label="DL Expiration Date"
          />
        </FormSection>
      )}

      <ControlledRadioButton
        name="demographic.convictedOfDUI"
        control={control}
        label="Have you ever been convicted of a DUI?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.duiYear"
        control={control}
        label="What year was the DUI conviction?"
        showField={convictedOfDUI === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.convictedOfSexOffense"
        control={control}
        label="Have you ever been convicted of a sex offense?"
        options={yesNoOptions}
      />

      <ControlledRadioButton
        name="demographic.registeredSexOffender"
        control={control}
        label="Are you currently required to register as a sex offender?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.sexOffenseNature"
        control={control}
        label="Please describe the nature of the sex offense"
        showField={convictedOfSexOffense === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.convictedOfFelony"
        control={control}
        label="Have you ever been convicted of a felony?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.felonyCharges"
        control={control}
        label="Please list felony charge(s)"
        showField={convictedOfFelony === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.onProbationOrParole"
        control={control}
        label="Are you currently on probation or parole?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.officerContactInfo"
        control={control}
        label="Probation/parole officer contact information"
        showField={onProbationOrParole === "Yes"}
      />

      <ControlledRadioButton
        name="demographic.inRecoveryCourt"
        control={control}
        label="Are you currently participating in recovery court?"
        options={yesNoOptions}
      />

      <ControlledTextField
        name="demographic.caseManagerContactInfo"
        control={control}
        label="Recovery court case manager contact information"
        showField={inRecoveryCourt === "Yes"}
      />

      <ControlledTextField
        name="demographic.ongoingLegalIssues"
        control={control}
        label="Please describe any ongoing legal issues"
        multiline
        minRows={3}
      />
    </FormContainer>
  );
}
