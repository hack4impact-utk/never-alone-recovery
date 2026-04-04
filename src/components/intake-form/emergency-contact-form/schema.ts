import { DefaultValues } from "react-hook-form";
import { z } from "zod";

export const emergencyContactFormSchema = z.object({
  contact1Name: z.string().min(1, "Contact 1 name is required"),
  contact1Relationship: z.string().min(1, "Contact 1 relationship is required"),
  contact1PhoneNumber: z.string().min(1, "Contact 1 phone number is required"),
  contact1Address: z.string().min(1, "Contact 1 address is required"),
  contact2Name: z.string().min(1, "Contact 2 name is required"),
  contact2Relationship: z.string().min(1, "Contact 2 relationship is required"),
  contact2PhoneNumber: z.string().min(1, "Contact 2 phone number is required"),
  contact2Address: z.string().min(1, "Contact 2 address is required"),
});

export type EmergencyContactFormValues = z.infer<
  typeof emergencyContactFormSchema
>;

export const emergencyContactFormDefaultValues: DefaultValues<EmergencyContactFormValues> =
  {
    contact1Name: "",
    contact1Relationship: "",
    contact1PhoneNumber: "",
    contact1Address: "",
    contact2Name: "",
    contact2Relationship: "",
    contact2PhoneNumber: "",
    contact2Address: "",
  };
