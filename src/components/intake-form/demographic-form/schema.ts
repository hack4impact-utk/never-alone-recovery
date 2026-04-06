import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import {
  optionalText,
  requiredEmail,
  requiredPhone,
  requiredSsn,
  requiredText,
  yesNo,
} from "@/utils/form/validations";

const hasText = (value?: string): boolean => Boolean(value?.trim());

export const demographicFormSchema = z
  .object({
    firstName: requiredText("First name is required"),
    middleName: optionalText,
    lastName: requiredText("Last name is required"),
    socialSecurityNumber: requiredSsn("Social security number is required"),
    ethnicity: z.enum(
      [
        "White",
        "Black or African American",
        "American Indian or Alaska Native",
        "Asian",
        "Native Hawaiian or Other Pacific Islander",
        "Other",
      ],
      "Ethnicity is required",
    ),
    dateOfBirth: requiredText("Date of birth is required"),
    phoneNumber: requiredPhone("Phone number is required"),
    tomis: requiredText("TOMIS is required"),
    email: requiredEmail("Email is required"),
    lastKnownAddress: optionalText,
    cleanTime: optionalText,
    drugOfChoice: optionalText,
    priorRecoveryExperience: optionalText,
    surgeries: optionalText,
    allergies: optionalText,
    medications: optionalText,
    insurance: optionalText,
    receiveBenefits: yesNo,
    benefitsDesc: optionalText,
    isDisabled: yesNo,
    disabilityDesc: optionalText,
    receivesDisability: yesNo,
    receivesDisabilityReason: optionalText,
    receivedDisabilityAmount: optionalText,
    receivesFoodStamps: yesNo,
    hasMentalHealthRecs: yesNo,
    mentalHealthRecs: optionalText,
    participatingInTreatment: yesNo,
    typeOfTreatment: optionalText,
    howOften: optionalText,
    locationOfTreatment: optionalText,
    maritalStatus: z.enum(["Single", "Married", "Divorced"]).optional(),
    hasChildren: yesNo,
    numberOfChildren: optionalText,
    isPregnant: yesNo,
    currentEmployment: optionalText,
    employmentContactInfo: optionalText,
    employmentStartDate: optionalText,
    employmentEndDate: optionalText,
    servedInMilitary: yesNo,
    militaryBranch: z
      .enum(["Army", "Navy", "Air Force", "Marines", "Coast Guard"])
      .optional(),
    militaryStartDate: optionalText,
    militaryEndDate: optionalText,
    militaryDischarge: optionalText,
    hasHighSchoolDiploma: yesNo,
    hasGED: yesNo,
    hasCollegeDegree: yesNo,
    hasDriversLicense: yesNo,
    driversLicenseNumber: optionalText,
    dlIssueDate: optionalText,
    dlExpDate: optionalText,
    convictedOfDUI: yesNo,
    duiYear: optionalText,
    convictedOfSexOffense: yesNo,
    registeredSexOffender: yesNo,
    sexOffenseNature: optionalText,
    convictedOfFelony: yesNo,
    felonyCharges: optionalText,
    onProbationOrParole: yesNo,
    officerContactInfo: optionalText,
    inRecoveryCourt: yesNo,
    caseManagerContactInfo: optionalText,
    ongoingLegalIssues: optionalText,
  })
  .superRefine((values, ctx) => {
    if (values.receiveBenefits === "Yes" && !hasText(values.benefitsDesc)) {
      ctx.addIssue({
        code: "custom",
        message: "Benefits details are required",
        path: ["benefitsDesc"],
      });
    }

    if (values.isDisabled === "Yes" && !hasText(values.disabilityDesc)) {
      ctx.addIssue({
        code: "custom",
        message: "Disability description is required",
        path: ["disabilityDesc"],
      });
    }
    if (
      values.receivesDisability === "Yes" &&
      !hasText(values.receivesDisabilityReason)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Reason for disability benefits is required",
        path: ["receivesDisabilityReason"],
      });
    }

    if (
      values.receivesDisability === "Yes" &&
      !hasText(values.receivedDisabilityAmount)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Disability benefit amount is required",
        path: ["receivedDisabilityAmount"],
      });
    }

    if (
      values.hasMentalHealthRecs === "Yes" &&
      !hasText(values.mentalHealthRecs)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Mental health details are required",
        path: ["mentalHealthRecs"],
      });
    }

    if (
      values.participatingInTreatment === "Yes" &&
      !hasText(values.typeOfTreatment)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Type of treatment is required",
        path: ["typeOfTreatment"],
      });
    }

    if (
      values.participatingInTreatment === "Yes" &&
      !hasText(values.howOften)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Treatment frequency is required",
        path: ["howOften"],
      });
    }

    if (
      values.participatingInTreatment === "Yes" &&
      !hasText(values.locationOfTreatment)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Treatment location is required",
        path: ["locationOfTreatment"],
      });
    }

    if (values.hasChildren === "Yes" && !hasText(values.numberOfChildren)) {
      ctx.addIssue({
        code: "custom",
        message: "Number of children is required",
        path: ["numberOfChildren"],
      });
    }

    if (values.servedInMilitary === "Yes" && !values.militaryBranch) {
      ctx.addIssue({
        code: "custom",
        message: "Military branch is required",
        path: ["militaryBranch"],
      });
    }

    if (
      values.servedInMilitary === "Yes" &&
      !hasText(values.militaryStartDate)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Military start date is required",
        path: ["militaryStartDate"],
      });
    }

    if (values.servedInMilitary === "Yes" && !hasText(values.militaryEndDate)) {
      ctx.addIssue({
        code: "custom",
        message: "Military end date is required",
        path: ["militaryEndDate"],
      });
    }

    if (
      values.servedInMilitary === "Yes" &&
      !hasText(values.militaryDischarge)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Military discharge information is required",
        path: ["militaryDischarge"],
      });
    }

    if (
      values.hasDriversLicense === "Yes" &&
      !hasText(values.driversLicenseNumber)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Driver's license number is required",
        path: ["driversLicenseNumber"],
      });
    }

    if (values.hasDriversLicense === "Yes" && !hasText(values.dlIssueDate)) {
      ctx.addIssue({
        code: "custom",
        message: "Driver's license issue date is required",
        path: ["dlIssueDate"],
      });
    }

    if (values.hasDriversLicense === "Yes" && !hasText(values.dlExpDate)) {
      ctx.addIssue({
        code: "custom",
        message: "Driver's license expiration date is required",
        path: ["dlExpDate"],
      });
    }

    if (values.convictedOfDUI === "Yes" && !hasText(values.duiYear)) {
      ctx.addIssue({
        code: "custom",
        message: "DUI conviction year is required",
        path: ["duiYear"],
      });
    }

    if (
      values.convictedOfSexOffense === "Yes" &&
      !hasText(values.sexOffenseNature)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Sex offense details are required",
        path: ["sexOffenseNature"],
      });
    }

    if (values.convictedOfFelony === "Yes" && !hasText(values.felonyCharges)) {
      ctx.addIssue({
        code: "custom",
        message: "Felony charge details are required",
        path: ["felonyCharges"],
      });
    }

    if (
      values.onProbationOrParole === "Yes" &&
      !hasText(values.officerContactInfo)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Probation/parole officer contact information is required",
        path: ["officerContactInfo"],
      });
    }

    if (
      values.inRecoveryCourt === "Yes" &&
      !hasText(values.caseManagerContactInfo)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Recovery court case manager contact information is required",
        path: ["caseManagerContactInfo"],
      });
    }
  });

export type DemographicFormValues = z.infer<typeof demographicFormSchema>;

export const demographicFormDefaultValues: DefaultValues<DemographicFormValues> =
  {
    firstName: "",
    middleName: "",
    lastName: "",
    socialSecurityNumber: "",
    ethnicity: undefined,
    dateOfBirth: "",
    phoneNumber: "",
    tomis: "",
    email: "",
    lastKnownAddress: "",
    cleanTime: "",
    drugOfChoice: "",
    priorRecoveryExperience: "",
    surgeries: "",
    allergies: "",
    medications: "",
    insurance: "",
    receiveBenefits: undefined,
    benefitsDesc: "",
    isDisabled: undefined,
    disabilityDesc: "",
    receivesDisability: undefined,
    receivesDisabilityReason: "",
    receivedDisabilityAmount: "",
    receivesFoodStamps: undefined,
    hasMentalHealthRecs: undefined,
    mentalHealthRecs: "",
    participatingInTreatment: undefined,
    typeOfTreatment: "",
    howOften: "",
    locationOfTreatment: "",
    maritalStatus: undefined,
    hasChildren: undefined,
    numberOfChildren: "",
    isPregnant: undefined,
    currentEmployment: "",
    employmentContactInfo: "",
    employmentStartDate: "",
    employmentEndDate: "",
    servedInMilitary: undefined,
    militaryBranch: undefined,
    militaryStartDate: "",
    militaryEndDate: "",
    militaryDischarge: "",
    hasHighSchoolDiploma: undefined,
    hasGED: undefined,
    hasCollegeDegree: undefined,
    hasDriversLicense: undefined,
    driversLicenseNumber: "",
    dlIssueDate: "",
    dlExpDate: "",
    convictedOfDUI: undefined,
    duiYear: "",
    convictedOfSexOffense: undefined,
    registeredSexOffender: undefined,
    sexOffenseNature: "",
    convictedOfFelony: undefined,
    felonyCharges: "",
    onProbationOrParole: undefined,
    officerContactInfo: "",
    inRecoveryCourt: undefined,
    caseManagerContactInfo: "",
    ongoingLegalIssues: "",
  };
