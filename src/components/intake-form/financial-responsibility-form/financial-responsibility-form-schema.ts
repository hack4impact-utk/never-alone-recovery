import { z } from "zod";

export const financialResponsibilityFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type FinancialResponsibilityFormValues = z.infer<
  typeof financialResponsibilityFormSchema
>;

export const financialResponsibilityFormDefaultValues: FinancialResponsibilityFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
