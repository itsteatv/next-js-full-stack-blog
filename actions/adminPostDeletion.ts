"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function adminPostDeletion(postId: string) {

    console.log(postId);

    const { isAuthenticated, getPermission } = getKindeServerSession();

    if (!isAuthenticated) {
        redirect("/api/auth/login?post_login_redirect_url=/dashboard");
    }

    const adminDeletePermission = await getPermission("all::permissions");
    const isAdminAuthorized = adminDeletePermission?.isGranted;

    if (!isAuthenticated || !isAdminAuthorized) {
        throw new Error("Not authorized to delete posts.");
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    console.log(post);

    if (!post) {
        throw new Error("Post not found or already deleted.");
    }

    try {
        await prisma.post.delete({
            where: { id: postId },
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete the post.");
    }

    console.log(post, "admin");
    revalidatePath("/blog");
}
