import { z } from "zod";

export const releaseOfInformationFormSchema = z.object({
  signed: z.boolean(),
});

export type ReleaseOfInformationFormValues = z.infer<
  typeof releaseOfInformationFormSchema
>;

export const releaseOfInformationFormDefaultValues: ReleaseOfInformationFormValues =
  {
    signed: false,
  };
