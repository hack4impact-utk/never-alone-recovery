import { z } from "zod";

export const financialResponsibilityFormSchema = z.object({
  signed: z.boolean(),
});

export type FinancialResponsibilityFormValues = z.infer<
  typeof financialResponsibilityFormSchema
>;

export const financialResponsibilityFormDefaultValues: FinancialResponsibilityFormValues =
  {
    signed: false,
  };
