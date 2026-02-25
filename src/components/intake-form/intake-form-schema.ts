import { z } from "zod";

import {
  behavioralStandardsFormDefaultValues,
  behavioralStandardsFormSchema,
} from "./behavioral-standards-form/behavioral-standards-form-schema";
import {
  confidentialityAgreementFormDefaultValues,
  confidentialityAgreementFormSchema,
} from "./confidentiality-agreement-form/confidentiality-agreement-form-schema";
import {
  demographicFormDefaultValues,
  demographicFormSchema,
} from "./demographic-form/demographic-form-schema";
import {
  emergencyContactFormDefaultValues,
  emergencyContactFormSchema,
} from "./emergency-contact-form/emergency-contact-form-schema";
import {
  financialResponsibilityFormDefaultValues,
  financialResponsibilityFormSchema,
} from "./financial-responsibility-form/financial-responsibility-form-schema";
import {
  probationAndParoleFormDefaultValues,
  probationAndParoleFormSchema,
} from "./probation-and-parole-form/probation-and-parole-form-schema";
import {
  releaseOfInformationFormDefaultValues,
  releaseOfInformationFormSchema,
} from "./release-of-information-form/release-of-information-form-schema";
import {
  searchConsentFormDefaultValues,
  searchConsentFormSchema,
} from "./search-consent-form/search-consent-form-schema";
import {
  serviceContractFormDefaultValues,
  serviceContractFormSchema,
} from "./service-contract-form/service-contract-form-schema";
import {
  temporaryResidencyFormDefaultValues,
  temporaryResidencyFormSchema,
} from "./temporary-residency-form/temporary-residency-form-schema";
import {
  transportationReleaseFormDefaultValues,
  transportationReleaseFormSchema,
} from "./transportation-release-form/transportation-release-form-schema";

export const intakeFormSchema = z.object({
  demographic: demographicFormSchema,
  emergencyContact: emergencyContactFormSchema,
  searchConsent: searchConsentFormSchema,
  transportationRelease: transportationReleaseFormSchema,
  probationAndParole: probationAndParoleFormSchema,
  financialResponsibility: financialResponsibilityFormSchema,
  behavioralStandards: behavioralStandardsFormSchema,
  confidentialityAgreement: confidentialityAgreementFormSchema,
  releaseOfInformation: releaseOfInformationFormSchema,
  serviceContract: serviceContractFormSchema,
  temporaryResidency: temporaryResidencyFormSchema,
});

export type IntakeFormValues = z.infer<typeof intakeFormSchema>;

export const intakeFormDefaultValues: IntakeFormValues = {
  demographic: demographicFormDefaultValues,
  searchConsent: searchConsentFormDefaultValues,
  emergencyContact: emergencyContactFormDefaultValues,
  transportationRelease: transportationReleaseFormDefaultValues,
  probationAndParole: probationAndParoleFormDefaultValues,
  financialResponsibility: financialResponsibilityFormDefaultValues,
  behavioralStandards: behavioralStandardsFormDefaultValues,
  confidentialityAgreement: confidentialityAgreementFormDefaultValues,
  releaseOfInformation: releaseOfInformationFormDefaultValues,
  serviceContract: serviceContractFormDefaultValues,
  temporaryResidency: temporaryResidencyFormDefaultValues,
};
