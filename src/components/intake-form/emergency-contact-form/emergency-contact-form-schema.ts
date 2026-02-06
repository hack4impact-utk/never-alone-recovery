import { z } from "zod";

export const emergencyContactFormSchema = z.object({
  emergencyContactFirstName: z
    .string()
    .min(1, { message: "First Name is required" }),
  emergencyContactLastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  emergencyContactRelationship: z.string().min(1, {
    message: "Relationship is required",
  }),
});

export const emergencyContactFormDefaultValues = {
  emergencyContactFirstName: "",
  emergencyContactLastName: "",
  emergencyContactRelationship: "",
};
