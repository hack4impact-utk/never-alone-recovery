import { z } from "zod";

export const transportationReleaseFormSchema = z.object({
  residentSignature: z
    .string()
    .min(1, { message: "Resident signature is required" }),
  staffSignature: z.string().min(1, { message: "Staff signature is required" }),
});

export type TransportationReleaseFormValues = z.infer<
  typeof transportationReleaseFormSchema
>;

export const transportationReleaseFormDefaultValues: TransportationReleaseFormValues =
  {
    residentSignature: "",
    staffSignature: "",
  };
