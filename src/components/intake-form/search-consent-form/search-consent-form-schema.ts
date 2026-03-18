import { z } from "zod";

export const searchConsentFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type SearchConsentFormValues = z.infer<typeof searchConsentFormSchema>;

export const searchConsentFormDefaultValues: SearchConsentFormValues = {
  residentSignature: "",
  staffSignature: "",
};
