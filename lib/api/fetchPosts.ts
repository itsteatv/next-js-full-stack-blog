import prisma from "../db";
import { BlogPost } from "../types";

export const fetchPosts = async function (): Promise<BlogPost[]> {
    try {
        // Fetch only the Prisma posts
        const prismaPosts = await prisma.post.findMany();

        // Map the Prisma posts to match the BlogPost type
        const prismaPostsWithUniqueIds = prismaPosts.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
            author: post.author,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            userId: post.userId,
        }));

        console.log(prismaPostsWithUniqueIds);

        return prismaPostsWithUniqueIds;
    } catch (error) {
        console.error("Failed to fetch Prisma posts:", error);
        throw new Error("Failed to fetch posts from Prisma");
    }
};
