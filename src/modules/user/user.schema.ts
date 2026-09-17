import { z } from "zod";
import { Role } from "../../constants/enums";

export const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").nullable(),
  role: z.enum(Role).optional(),
});