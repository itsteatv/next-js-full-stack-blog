"use server"

import prisma from "@/lib/db"
import { createPostSchema } from "@/schemas/createPostSchema"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function createPost(formData: unknown) {

    const { isAuthenticated } = getKindeServerSession()

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }

    const parsed = createPostSchema.safeParse(formData);

    if (!parsed.success) {
        const errors = parsed.error.errors.reduce((acc, error) => {
            acc[error.path[0]] = error.message;
            return acc;
        }, {});
        return { errors };
    }

    try {
        await prisma.post.create({
            data: parsed.data
        })
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create the post");
    }

    revalidatePath("/blog")
}
