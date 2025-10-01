import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().regex(emailRegex, "Invalid email format"),
  hashedPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.hashedPassword === data.confirmPassword, {
  path: ["confirmPassword"], // error shown on confirmPassword field
  message: "Passwords do not match",
});


export type SignUpInput = z.infer<typeof SignUpSchema>;

export const SignInSchema = SignUpSchema.pick({
  email: true,
  hashedPassword: true,
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
  userId: z.uuid("Invalid userId"), // if you're also sending userId
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const UpdateUserSchema = SignUpSchema.pick({
  name: true,
  email: true
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
