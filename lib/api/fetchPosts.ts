import prisma from "../db";
import { BlogPost } from "../types";

export const fetchPosts = async function (): Promise<BlogPost[]> {
    try {
        const prismaPosts = await prisma.post.findMany({
            include: {
                category: true,
            },
        });

        const prismaPostsWithUniqueIds = prismaPosts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            author: post.author,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            userId: post.userId,
            categories: post.category ? [{ id: post.category.id, name: post.category.name }] : [], // Include the category if it exists
        }));

        console.log(prismaPostsWithUniqueIds);

        return prismaPostsWithUniqueIds;
    } catch (error) {
        console.error("Failed to fetch Prisma posts:", error);
        throw new Error("Failed to fetch posts from Prisma");
    }
};
