import { z } from "zod";

export const emergencyContactFormSchema = z.object({
  emergencyContactFirstName: z
    .string()
    .min(1, { message: "First Name is required" }),
  emergencyContactMiddleName: z
    .string()
    .min(1, { message: "Middle Name is required" }),
  emergencyContactLastName: z
    .string()
    .min(1, { message: "Last Name is required" }),
});

export const emergencyContactFormDefaultValues = {
  emergencyContactFirstName: "",
  emergencyContactMiddleName: "",
  emergencyContactLastName: "",
};
