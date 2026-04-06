import { DefaultValues } from "react-hook-form";
import { z } from "zod";

import { requiredText } from "@/utils/form/validations";

export const financialResponsibilityFormSchema = z.object({
  entryDate: requiredText("Entry date is required"),
  location: requiredText("Location is required"),
  residentSignature: requiredText("Resident signature is required"),
  staffSignature: requiredText("Staff signature is required"),
});

export type FinancialResponsibilityFormValues = z.infer<
  typeof financialResponsibilityFormSchema
>;

export const financialResponsibilityFormDefaultValues: DefaultValues<FinancialResponsibilityFormValues> =
  {
    entryDate: "",
    location: "",
    residentSignature: "",
    staffSignature: "",
  };
