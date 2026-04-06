import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const behavioralStandardsFormSchema = z.object({
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type BehavioralStandardsFormValues = z.infer<
  typeof behavioralStandardsFormSchema
>;

export const behavioralStandardsFormDefaultValues: DefaultValues<BehavioralStandardsFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
  };
