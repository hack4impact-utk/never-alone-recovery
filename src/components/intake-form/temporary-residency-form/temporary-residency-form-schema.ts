import { z } from "zod";

export const temporaryResidencyFormSchema = z.object({
  signed: z.boolean(),
});

export type TemporaryResidencyFormValues = z.infer<
  typeof temporaryResidencyFormSchema
>;

export const temporaryResidencyFormDefaultValues: TemporaryResidencyFormValues =
  {
    signed: false,
  };
