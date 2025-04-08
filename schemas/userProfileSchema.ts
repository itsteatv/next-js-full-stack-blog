import { z } from "zod";

export const userProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

export type TUserProfileSchema = z.infer<typeof userProfileSchema>;
