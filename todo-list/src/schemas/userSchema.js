import { z } from "zod";

const nameRegex = /^[A-Za-z\s]+$/;

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .regex(nameRegex, "First name can only contain letters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .regex(nameRegex, "Last name can only contain letters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number")
    .refine((val) => /\d/.test(val), "Phone number must contain digits"),

  age: z
    .coerce
    .number({ invalid_type_error: "Age must be a number" })
    .int("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),

  gender: z
    .enum(["male", "female"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters"),
});