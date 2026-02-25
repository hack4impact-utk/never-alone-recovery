import { z } from "zod";

export const confidentialityAgreementFormSchema = z.object({
  signed: z.boolean(),
});

export type ConfidentialityAgreementFormValues = z.infer<
  typeof confidentialityAgreementFormSchema
>;

export const confidentialityAgreementFormDefaultValues: ConfidentialityAgreementFormValues =
  {
    signed: false,
  };
