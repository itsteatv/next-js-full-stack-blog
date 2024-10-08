import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
    body: z.string().min(1, "Body is required").max(1000, "Body cannot exceed 1000 characters"),
    categoryId: z.array(z.string()),
});

export type TCreatePostSchema = z.infer<typeof createPostSchema>;
