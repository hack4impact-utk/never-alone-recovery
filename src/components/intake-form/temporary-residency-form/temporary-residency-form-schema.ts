import { z } from "zod";

export const temporaryResidencyFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type TemporaryResidencyFormValues = z.infer<
  typeof temporaryResidencyFormSchema
>;

export const temporaryResidencyFormDefaultValues: TemporaryResidencyFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
