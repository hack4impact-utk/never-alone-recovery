"use client";

import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import ControlledDateField from "@/components/common/forms/controlled-date-field";
import ControlledDropdown from "@/components/common/forms/controlled-dropdown";
import ControlledTextField from "@/components/common/forms/controlled-text-field";
import FormContainer from "@/components/common/forms/form-container";

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
      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Personal Information
        </Typography>
      </Grid>

      <ControlledTextField
        name="demographic.firstName"
        control={control}
        label="First Name"
        gridProps={{ size: { xs: 12, sm: 4 } }}
      />

      <ControlledTextField
        name="demographic.middleName"
        control={control}
        label="Middle Name"
        gridProps={{ size: { xs: 12, sm: 4 } }}
      />

      <ControlledTextField
        name="demographic.lastName"
        control={control}
        label="Last Name"
        gridProps={{ size: { xs: 12, sm: 4 } }}
      />

      <ControlledDateField
        name="demographic.dateOfBirth"
        control={control}
        label="Date of Birth"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.socialSecurityNumber"
        control={control}
        label="SSN"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledDropdown
        name="demographic.ethnicity"
        control={control}
        label="Ethnicity"
        options={[
          { value: "White", label: "White" },
          {
            value: "Black or African American",
            label: "Black or African American",
          },
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
        ]}
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.tomis"
        control={control}
        label="TOMIS ID"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.phoneNumber"
        control={control}
        label="Phone Number"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.email"
        control={control}
        label="Email"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.lastKnownAddress"
        control={control}
        label="Last Known Address"
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Recovery History
        </Typography>
      </Grid>

      <ControlledTextField
        name="demographic.cleanTime"
        control={control}
        label="Clean Time"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.drugOfChoice"
        control={control}
        label="Drug of Choice"
        gridProps={{ size: { xs: 12, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.priorRecoveryExperience"
        control={control}
        label="Prior Recovery Experience"
        multiline
        minRows={3}
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Medical History
        </Typography>
      </Grid>

      <ControlledTextField
        name="demographic.surgeries"
        control={control}
        label="Surgeries"
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.allergies"
        control={control}
        label="Allergies"
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.medications"
        control={control}
        label="Medications"
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.insurance"
        control={control}
        label="Insurance"
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Benefits and Disability
        </Typography>
      </Grid>

      <ControlledDropdown
        name="demographic.receiveBenefits"
        control={control}
        label="Receive Benefits"
        options={yesNoOptions}
        gridProps={{ size: { xs: 12, sm: 6 }, offset: { xs: 0, sm: 6 } }}
      />

      <ControlledTextField
        name="demographic.benefitsDesc"
        control={control}
        label="Benefits Description"
        showField={receiveBenefits === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.isDisabled"
        control={control}
        label="Disabled"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.disabilityDesc"
        control={control}
        label="Disability Description"
        showField={isDisabled === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.receivesDisability"
        control={control}
        label="Receives Disability"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.receivesDisabilityReason"
        control={control}
        label="Reason for Disability Benefits"
        showField={receivesDisability === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.receivedDisabilityAmount"
        control={control}
        label="Amount of Disability Benefits"
        showField={receivesDisability === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.receivesFoodStamps"
        control={control}
        label="Receives Food Stamps"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.hasMentalHealthRecs"
        control={control}
        label="Mental Health Recommendations"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.mentalHealthRecs"
        control={control}
        label="Mental Health Recommendations Details"
        multiline
        minRows={3}
        showField={hasMentalHealthRecs === "Yes"}
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Treatment and Family
        </Typography>
      </Grid>

      <ControlledDropdown
        name="demographic.participatingInTreatment"
        control={control}
        label="Participating in Treatment"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <>
        <ControlledTextField
          name="demographic.typeOfTreatment"
          control={control}
          showField={participatingInTreatment === "Yes"}
          label="Type of Treatment"
          gridProps={{ size: 12 }}
        />

        <ControlledTextField
          name="demographic.howOften"
          control={control}
          showField={participatingInTreatment === "Yes"}
          label="How Often"
          gridProps={{ size: 12 }}
        />

        <ControlledTextField
          name="demographic.locationOfTreatment"
          control={control}
          showField={participatingInTreatment === "Yes"}
          label="Location of Treatment"
          gridProps={{ size: 12 }}
        />
      </>

      <ControlledDropdown
        name="demographic.maritalStatus"
        control={control}
        label="Marital Status"
        options={maritalStatusOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.hasChildren"
        control={control}
        label="Has Children"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.numberOfChildren"
        control={control}
        showField={hasChildren === "Yes"}
        label="Number of Children"
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.isPregnant"
        control={control}
        label="Pregnant"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Employment and Military
        </Typography>
      </Grid>

      <ControlledTextField
        name="demographic.currentEmployment"
        control={control}
        label="Current Employment"
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.employmentContactInfo"
        control={control}
        label="Employment Contact Info"
        gridProps={{ size: 12 }}
      />

      <ControlledDateField
        name="demographic.employmentStartDate"
        control={control}
        label="Employment Start Date"
        gridProps={{ size: 12 }}
      />

      <ControlledDateField
        name="demographic.employmentEndDate"
        control={control}
        label="Employment End Date"
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.servedInMilitary"
        control={control}
        label="Served in Military"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.militaryBranch"
        control={control}
        label="Military Branch"
        options={militaryBranchOptions}
        showField={servedInMilitary === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDateField
        name="demographic.militaryStartDate"
        control={control}
        label="Military Start Date"
        showField={servedInMilitary === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDateField
        name="demographic.militaryEndDate"
        control={control}
        label="Military End Date"
        showField={servedInMilitary === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.militaryDischarge"
        control={control}
        label="Military Discharge"
        showField={servedInMilitary === "Yes"}
        gridProps={{ size: 12 }}
      />

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Education, License, and Legal
        </Typography>
      </Grid>

      <ControlledDropdown
        name="demographic.hasHighSchoolDiploma"
        control={control}
        label="High School Diploma"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.hasGED"
        control={control}
        label="GED"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.hasCollegeDegree"
        control={control}
        label="College Degree"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.hasDriversLicense"
        control={control}
        label="Driver's License"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.driversLicenseNumber"
        control={control}
        label="Driver's License Number"
        showField={hasDriversLicense === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDateField
        name="demographic.dlIssueDate"
        control={control}
        label="DL Issue Date"
        showField={hasDriversLicense === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDateField
        name="demographic.dlExpDate"
        control={control}
        label="DL Expiration Date"
        showField={hasDriversLicense === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.convictedOfDUI"
        control={control}
        label="Convicted of DUI"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.duiYear"
        control={control}
        label="DUI Year"
        showField={convictedOfDUI === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.convictedOfSexOffense"
        control={control}
        label="Convicted of Sex Offense"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.registeredSexOffender"
        control={control}
        label="Registered Sex Offender"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.sexOffenseNature"
        control={control}
        label="Sex Offense Nature"
        showField={convictedOfSexOffense === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.convictedOfFelony"
        control={control}
        label="Convicted of Felony"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.felonyCharges"
        control={control}
        label="Felony Charges"
        showField={convictedOfFelony === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.onProbationOrParole"
        control={control}
        label="On Probation or Parole"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.officerContactInfo"
        control={control}
        label="Officer Contact Info"
        showField={onProbationOrParole === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledDropdown
        name="demographic.inRecoveryCourt"
        control={control}
        label="In Recovery Court"
        options={yesNoOptions}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.caseManagerContactInfo"
        control={control}
        label="Case Manager Contact Info"
        showField={inRecoveryCourt === "Yes"}
        gridProps={{ size: 12 }}
      />

      <ControlledTextField
        name="demographic.ongoingLegalIssues"
        control={control}
        label="Ongoing Legal Issues"
        multiline
        minRows={3}
        gridProps={{ size: 12 }}
      />
    </FormContainer>
  );
}
