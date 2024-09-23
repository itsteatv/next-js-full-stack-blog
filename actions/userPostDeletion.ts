"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export default async function userPostDeletion(postId: string) {
    const { isAuthenticated, getUser, getPermission } = getKindeServerSession();

    if (!isAuthenticated) {
        throw new Error("Not authenticated.");
    }

    const user = await getUser();

    if (!user) {
        throw new Error("User not found.");
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        throw new Error("Post not found.");
    }

    const isUserPostAuthor = post.userId === user?.id
    const userDeletePermission = await getPermission("basic::permissions");

    if (!isUserPostAuthor && !userDeletePermission?.isGranted) {
        throw new Error("You are not authorized to delete this post.");
    }

    try {
        await prisma.post.delete({
            where: { id: postId },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete the post.");
    }
    revalidatePath("/blog")
}
