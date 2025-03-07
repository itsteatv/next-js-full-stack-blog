import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters");
