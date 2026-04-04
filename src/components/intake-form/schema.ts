import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import {
  demographicFormDefaultValues,
  demographicFormSchema,
} from "./demographic-form/schema";
import {
  emergencyContactFormDefaultValues,
  emergencyContactFormSchema,
} from "./emergency-contact-form/schema";
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
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeFormDefaultValues: DefaultValues<IntakeFormValues> = {
  demographic: demographicFormDefaultValues,
  emergencyContact: emergencyContactFormDefaultValues,
  transportationRelease: transportationReleaseFormDefaultValues,
  serviceContract: serviceContractFormDefaultValues,
};

export type FormNames = keyof IntakeFormValues;
