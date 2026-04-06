import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const confidentialityAgreementFormSchema = z.object({
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type ConfidentialityAgreementFormValues = z.infer<
  typeof confidentialityAgreementFormSchema
>;

export const confidentialityAgreementFormDefaultValues: DefaultValues<ConfidentialityAgreementFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
  };
