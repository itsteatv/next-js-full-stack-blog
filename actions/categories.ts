"use server"

import prisma from "@/lib/db";
import { Category } from "@/lib/types";
import { upsertDefaultCategories } from "@/lib/UpsertDefaultCategories";

export async function getCategories() {
    await upsertDefaultCategories();
    return await prisma.category.findMany();
}

export async function createCategory(id: string, name: string): Promise<Category> {
    try {
        return await prisma.category.upsert({
            where: { id },
            update: {},
            create: { id, name },
        });
    } catch (error) {
        console.error("Error upserting category:", error);
        throw error;
    }
}

export async function updatePostWithCategory(postId: string, categoryId: string) {
    return await prisma.post.update({
        where: { id: postId },
        data: { categoryId },
    });
}

