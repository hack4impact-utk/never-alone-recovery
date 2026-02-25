import { z } from "zod";

export const behavioralStandardsFormSchema = z.object({
  signed: z.boolean(),
});

export type BehavioralStandardsFormValues = z.infer<
  typeof behavioralStandardsFormSchema
>;

export const behavioralStandardsFormDefaultValues: BehavioralStandardsFormValues =
  {
    signed: false,
  };
