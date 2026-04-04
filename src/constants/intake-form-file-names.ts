import { FormNames } from "@/components/intake-form/schema";

export const INTAKE_FORM_PDF_FILE_NAMES: Record<FormNames, string> = {
  serviceContract: "neveralonerecovery.servicecontract.pdf",
  transportationRelease: "neveralonerecovery.transportationrelease.pdf",
  demographic: "neveralonerecovery.demographicform.pdf",
  emergencyContact: "neveralonerecovery.emergencycontactform.pdf",
} as const;
