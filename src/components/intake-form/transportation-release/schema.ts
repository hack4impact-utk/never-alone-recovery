import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const transportationReleaseFormSchema = z.object({
  residentSignature: z.string().min(1, "Resident signature is required"),
  staffSignature: z.string().min(1, "Staff signature is required"),
});

export type TransportationReleaseFormValues = z.infer<
  typeof transportationReleaseFormSchema
>;

export const transportationReleaseFormDefaultValues: DefaultValues<TransportationReleaseFormValues> =
  {
    residentSignature: "",
    staffSignature: "",
  };
