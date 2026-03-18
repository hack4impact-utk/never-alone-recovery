import { z } from "zod";

export const releaseOfInformationFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type ReleaseOfInformationFormValues = z.infer<
  typeof releaseOfInformationFormSchema
>;

export const releaseOfInformationFormDefaultValues: ReleaseOfInformationFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
