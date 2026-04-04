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

export const intakeFormSchema = z.object({
  demographic: demographicFormSchema,
  emergencyContact: emergencyContactFormSchema,
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeFormDefaultValues: DefaultValues<IntakeFormValues> = {
  demographic: demographicFormDefaultValues,
  emergencyContact: emergencyContactFormDefaultValues,
};
