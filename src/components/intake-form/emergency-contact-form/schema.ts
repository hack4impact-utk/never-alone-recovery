import { DefaultValues } from "react-hook-form";
import { z } from "zod";

const requiredPhone = (requiredMessage: string): z.ZodString =>
  z
    .string()
    .min(1, requiredMessage)
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Enter a valid phone number");

export const emergencyContactFormSchema = z.object({
  contact1Name: z.string().min(1, "Contact 1 name is required"),
  contact1Relationship: z.string().min(1, "Contact 1 relationship is required"),
  contact1PhoneNumber: requiredPhone("Contact 1 phone number is required"),
  contact1Address: z.string().min(1, "Contact 1 address is required"),
  contact2Name: z.string().min(1, "Contact 2 name is required"),
  contact2Relationship: z.string().min(1, "Contact 2 relationship is required"),
  contact2PhoneNumber: requiredPhone("Contact 2 phone number is required"),
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
