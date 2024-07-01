import { z } from "zod"

export const emailContactSchema = z.object({
    authorName: z.string().trim().min(5, "Name must be at least 5 characters")
        .max(100, "Name must be at most 100 characters")
        .min(1, "Name is required"),

    authorEmail: z
        .string()
        .email("Invalid email format")
        .refine((email) => /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com)$/i.test(email), {
            message: "Email must be from a valid domain (e.g., @gmail.com)",
        }),

    reviewText: z.string()
        .min(1, "Message is required")
        .max(500, "Message must be at most 500 characters"),
})

export type TEmailContactSchema = z.infer<typeof emailContactSchema>