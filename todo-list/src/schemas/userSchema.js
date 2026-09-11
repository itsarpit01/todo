import { z } from "zod";

// This defines the validation rules for the Add/Edit User form.
// React Hook Form uses this (via zodResolver) to check the data
// before allowing the form to submit.

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .email("Enter a valid email address"),

  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),

  age: z
    .coerce
    .number({ invalid_type_error: "Age must be a number" })
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),

  gender: z
    .enum(["male", "female"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),
});