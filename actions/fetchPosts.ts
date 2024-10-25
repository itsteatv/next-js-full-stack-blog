"use server"

import prisma from "../lib/db";
import { BlogPost } from "../lib/types";

export const fetchPosts = async function (
    skip: number = 0,
    take: number = 0,
    id?: string
): Promise<BlogPost[]> {
    try {
        const prismaPosts = id
            ? await prisma.post.findMany({
                where: { id },
                include: { categories: true },
            })
            : await prisma.post.findMany({
                skip,
                take,
                include: { categories: true },
            });

        const prismaPostsWithUniqueIds = prismaPosts.map((post) => ({
            id: post.id,
            title: post.title,
            body: post.body,
            author: post.author,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            userId: post.userId,
            categories: post.categories.map((category) => ({
                id: category.id,
                name: category.name,
            })),
        }));

        return prismaPostsWithUniqueIds;
    } catch (error) {
        console.error("Failed to fetch Prisma posts:", error);
        throw new Error("Failed to fetch posts from Prisma");
    }
};

