import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
