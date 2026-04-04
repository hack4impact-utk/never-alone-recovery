import { FormNames } from "@/components/intake-form/schema";

export const INTAKE_FORM_PDF_FILE_NAMES: Record<FormNames, string> = {
  demographic: "neveralonerecovery.applicantdemographics.pdf",
  serviceContract: "neveralonerecovery.servicecontract.pdf",
  transportationRelease: "neveralonerecovery.transportationreleaseform.pdf",
  emergencyContact: "neveralonerecovery.emergencycontactform.pdf",
} as const;
