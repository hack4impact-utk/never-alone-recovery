import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const serviceContractFormSchema = z.object({
  entryDate: requiredText("Entry date is required"),
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type ServiceContractFormValues = z.infer<
  typeof serviceContractFormSchema
>;

export const serviceContractFormDefaultValues: DefaultValues<ServiceContractFormValues> =
  {
    entryDate: "",
    residentSignature: "",
    staffSignature: "",
  };
