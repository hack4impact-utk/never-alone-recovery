import { z } from "zod";

export const serviceContractFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type ServiceContractFormValues = z.infer<
  typeof serviceContractFormSchema
>;

export const serviceContractFormDefaultValues: ServiceContractFormValues = {
  residentSignature: "",
  staffSignature: "",
};
