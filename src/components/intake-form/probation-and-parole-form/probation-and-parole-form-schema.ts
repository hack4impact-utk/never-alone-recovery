import { z } from "zod";

export const probationAndParoleFormSchema = z.object({
  signed: z.boolean(),
});

export type ProbationAndParoleFormValues = z.infer<
  typeof probationAndParoleFormSchema
>;

export const probationAndParoleFormDefaultValues: ProbationAndParoleFormValues =
  {
    signed: false,
  };
