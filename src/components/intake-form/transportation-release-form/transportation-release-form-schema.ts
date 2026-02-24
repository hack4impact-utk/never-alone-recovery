import { z } from "zod";

export const transportationReleaseFormSchema = z.object({
  signed: z.boolean(),
});

export type TransportationReleaseFormValues = z.infer<
  typeof transportationReleaseFormSchema
>;

export const transportationReleaseFormDefaultValues: TransportationReleaseFormValues =
  {
    signed: false,
  };
