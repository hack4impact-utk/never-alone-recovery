import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import {
  confirmationFormDefaultValues,
  confirmationFormSchema,
} from "./confirmation-form/schema";
import {
  behavioralStandardsFormDefaultValues,
  behavioralStandardsFormSchema,
} from "./behavioral-standards-form/schema";
import {
  demographicFormDefaultValues,
  demographicFormSchema,
} from "./demographic-form/schema";
import {
  emergencyContactFormDefaultValues,
  emergencyContactFormSchema,
} from "./emergency-contact-form/schema";
import {
  financialResponsibilityFormDefaultValues,
  financialResponsibilityFormSchema,
} from "./financial-responsibility-form/schema";
import {
  releaseOfInformationFormDefaultValues,
  releaseOfInformationFormSchema,
} from "./release-of-information-form/schema";
import {
  serviceContractFormDefaultValues,
  serviceContractFormSchema,
} from "./service-contract-form/schema";
import {
  transportationReleaseFormDefaultValues,
  transportationReleaseFormSchema,
} from "./transportation-release-form/schema";

export const intakeFormSchema = z.object({
  demographic: demographicFormSchema,
  emergencyContact: emergencyContactFormSchema,
  transportationRelease: transportationReleaseFormSchema,
  serviceContract: serviceContractFormSchema,
  financialResponsibility: financialResponsibilityFormSchema,
  releaseOfInformation: releaseOfInformationFormSchema,
  behavioralStandards: behavioralStandardsFormSchema,
  confirmation: confirmationFormSchema,
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeFormDefaultValues: DefaultValues<IntakeFormValues> = {
  demographic: demographicFormDefaultValues,
  emergencyContact: emergencyContactFormDefaultValues,
  transportationRelease: transportationReleaseFormDefaultValues,
  serviceContract: serviceContractFormDefaultValues,
  financialResponsibility: financialResponsibilityFormDefaultValues,
  releaseOfInformation: releaseOfInformationFormDefaultValues,
  behavioralStandards: behavioralStandardsFormDefaultValues,
  confirmation: confirmationFormDefaultValues,
};

export type FormNames = Exclude<keyof IntakeFormValues, "confirmation">;
