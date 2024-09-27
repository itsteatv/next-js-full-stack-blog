"use server";

import prisma from "@/lib/db";
import { updatePostSchema } from "@/schemas/updatePostSchema";

export default async function userUpdatePost(formData: unknown, id: string) {
  const parsed = updatePostSchema.safeParse(formData);

  if (!parsed.success) {
    const errors = parsed.error.errors.reduce((acc, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {});
    return { errors };
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: parsed.data.title,
        body: parsed.data.body,
        updatedAt: new Date(),
      },
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update the post");
  }
}
