import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const behavioralStandardsAgreementFormSchema = z.object({
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type BehavioralStandardsAgreementFormValues = z.infer<
  typeof behavioralStandardsAgreementFormSchema
>;

export const behavioralStandardsAgreementFormDefaultValues: DefaultValues<BehavioralStandardsAgreementFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
  };
