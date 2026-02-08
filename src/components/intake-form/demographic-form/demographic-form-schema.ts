import { z } from "zod";

export const demographicFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  middleName: z.string().min(1, { message: "Middle Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
});

export const demographicFormDefaultValues = {
  firstName: "",
  middleName: "",
  lastName: "",
};
