import { z } from "zod";

export const behavioralStandardsFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type BehavioralStandardsFormValues = z.infer<
  typeof behavioralStandardsFormSchema
>;

export const behavioralStandardsFormDefaultValues: BehavioralStandardsFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
