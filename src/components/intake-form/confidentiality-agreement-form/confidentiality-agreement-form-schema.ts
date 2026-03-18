import { z } from "zod";

export const confidentialityAgreementFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type ConfidentialityAgreementFormValues = z.infer<
  typeof confidentialityAgreementFormSchema
>;

export const confidentialityAgreementFormDefaultValues: ConfidentialityAgreementFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
