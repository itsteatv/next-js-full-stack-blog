import { z } from "zod";

export const downloadUserData = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  email: z.string().email(),
  username: z.string().min(1),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
});

export type TDownloadUserData = z.infer<typeof downloadUserData>;
