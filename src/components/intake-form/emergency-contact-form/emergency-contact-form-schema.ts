import { z } from "zod";

export const emergencyContactFormSchema = z.object({
  person1FirstName: z.string().min(1, { message: "First Name is required" }),
  person1LastName: z.string().min(1, { message: "Last Name is required" }),
  person1Relationship: z
    .string()
    .min(1, { message: "Relationship is required" }),
  person1PhoneNumber: z
    .string()
    .min(1, { message: "Phone Number is required" }),
  person1Address: z.string().min(1, { message: "Address is required" }),
  person2FirstName: z.string().min(1, { message: "First Name is required" }),
  person2LastName: z.string().min(1, { message: "Last Name is required" }),
  person2Relationship: z
    .string()
    .min(1, { message: "Relationship is required" }),
  person2PhoneNumber: z
    .string()
    .min(1, { message: "Phone Number is required" }),
  person2Address: z.string().min(1, { message: "Address is required" }),
});

export type EmergencyContactFormValues = z.infer<
  typeof emergencyContactFormSchema
>;

export const emergencyContactFormDefaultValues: EmergencyContactFormValues = {
  person1FirstName: "",
  person1LastName: "",
  person1Relationship: "",
  person1PhoneNumber: "",
  person1Address: "",
  person2FirstName: "",
  person2LastName: "",
  person2Relationship: "",
  person2PhoneNumber: "",
  person2Address: "",
};
