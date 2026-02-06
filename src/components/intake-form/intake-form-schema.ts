import { z } from "zod";

import {
  demographicFormDefaultValues,
  demographicFormSchema,
} from "@/components/intake-form/demographic-form/demographic-form-schema";
import {
  emergencyContactFormDefaultValues,
  emergencyContactFormSchema,
} from "@/components/intake-form/emergency-contact-form/emergency-contact-form-schema";

export const intakeFormSchema = z.object({
  demographic: demographicFormSchema,
  emergencyContact: emergencyContactFormSchema,
});

export const intakeFormDefaultValues = {
  demographic: demographicFormDefaultValues,
  emergencyContact: emergencyContactFormDefaultValues,
};

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;
