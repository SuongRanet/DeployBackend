import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.number().nullable().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Please enter your username or email address"),
  password: z.string().min(1, "Please enter your password"),
});
