"use server"

import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function adminPostDeletion(postId: number) {

    const { isAuthenticated, getPermission } = getKindeServerSession()


    if (!isAuthenticated) {
        redirect("/api/auth/login?post_login_redirect_url=/dashboard");
    }

    const adminDeletePermission = await getPermission("admin::post::delete");
    const isAdminAuthorized = adminDeletePermission?.isGranted;

    if (!isAuthenticated || !isAdminAuthorized) {
        throw new Error("Not authorized to delete posts.");
    }

    try {
        await prisma.post.delete({
            where: { id: postId },
        });
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete the post.");
    }

    revalidatePath("/blog")
}