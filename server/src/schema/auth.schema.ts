import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().regex(emailRegex, "Invalid email format"),
  hashedPassword: z.string().min(8, "Password must be at least 8 characters"),
})

export const SignInSchema = SignUpSchema.pick({
  email: true,
  hashedPassword: true,
});

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
  userId: z.uuid("Invalid userId"), // if you're also sending userId
});

