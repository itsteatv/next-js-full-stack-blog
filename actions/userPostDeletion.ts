"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export default async function userPostDeletion(postId: string) { // Ensure postId is a string
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!isAuthenticated) {
        throw new Error("Not authenticated.");
    }

    const user = await getUser();

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        throw new Error("Post not found.");
    }

    if (post.userId !== user?.id) {
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
