"use server";

import prisma from "@/lib/db";
import { updatePostSchema } from "@/schemas/updatePostSchema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function userUpdatePost(
  formData: unknown,
  id: string,
  postUserId: string
) {
  const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

  if (!isAuthenticated) {
    throw new Error("Not authenticated.");
  }

  const user = await getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const isUserPostAuthor = postUserId === user?.id;
  const userDeletePermission = await getPermission("basic::permissions");

  console.log(isUserPostAuthor);

  if (!isUserPostAuthor && !userDeletePermission?.isGranted) {
    throw new Error("You are not authorized to update this post.");
  }

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
