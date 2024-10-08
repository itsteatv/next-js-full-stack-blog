"use server"

import prisma from "@/lib/db"
import { createPostSchema } from "@/schemas/createPostSchema"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid";

export default async function createPost(formData: unknown) {

    console.log(formData);

    const { isAuthenticated, getUser } = getKindeServerSession()

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }

    const user = await getUser()
    const userId = user?.id;
    const username = user?.username ?? "Unknown Author";

    console.log(userId);

    if (!userId) {
        throw new Error("User ID is required to create a post.");
    }

    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    console.log(existingUser);

    if (!existingUser) {
        await prisma.user.create({
            data: {
                id: userId,
                name: username,
                email: user?.email ?? "unknown@example.com",
            }
        });
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
        const postId = uuidv4();

        await prisma.post.create({
            data: {
                id: postId,
                title: parsed.data.title,
                body: parsed.data.body,
                author: username,
                userId: userId,
                categories: {
                    connect: parsed.data.categoryId?.map(id => ({ id })),
                },
            }
        });
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create the post");
    }

    revalidatePath("/blog")
}
