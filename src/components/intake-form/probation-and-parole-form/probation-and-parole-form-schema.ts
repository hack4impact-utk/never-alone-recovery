import { z } from "zod";

export const probationAndParoleFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type ProbationAndParoleFormValues = z.infer<
  typeof probationAndParoleFormSchema
>;

export const probationAndParoleFormDefaultValues: ProbationAndParoleFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
