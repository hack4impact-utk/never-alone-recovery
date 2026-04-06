import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const temporaryResidencyFormSchema = z.object({
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type TemporaryResidencyFormValues = z.infer<
  typeof temporaryResidencyFormSchema
>;

export const temporaryResidencyFormDefaultValues: DefaultValues<TemporaryResidencyFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
  };
