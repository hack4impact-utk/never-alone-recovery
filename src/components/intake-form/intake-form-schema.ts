import { z } from "zod";

import {
  demographicFormDefaultValues,
  demographicFormSchema,
} from "./demographic-form/demographic-form-schema";
import {
  emergencyContactFormDefaultValues,
  emergencyContactFormSchema,
} from "./emergency-contact-form/emergency-contact-form-schema";
import {
  searchConsentFormDefaultValues,
  searchConsentFormSchema,
} from "./search-consent-form/search-consent-form-schema";

export const intakeFormSchema = z.object({
  demographic: demographicFormSchema,
  emergencyContact: emergencyContactFormSchema,
  searchConsent: searchConsentFormSchema,
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeFormDefaultValues: IntakeFormValues = {
  demographic: demographicFormDefaultValues,
  searchConsent: searchConsentFormDefaultValues,
  emergencyContact: emergencyContactFormDefaultValues,
};
