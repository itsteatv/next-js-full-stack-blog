import prisma from "../db";
import { BlogPost } from "../types"

export const fetchPosts = async function (): Promise<BlogPost[]> {
    const jsonPlaceholderPromise = fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
        next: { revalidate: 3600 }
    });

    const prismaPromise = prisma.post.findMany();

    const [jsonPlaceholderResponse, prismaPosts] = await Promise.all([jsonPlaceholderPromise, prismaPromise]);

    if (!jsonPlaceholderResponse.ok) {
        throw new Error("Failed to fetch posts from JSONPlaceholder");
    }

    const jsonPlaceholderPosts: BlogPost[] = await jsonPlaceholderResponse.json();

    const jsonPlaceholderPostsWithUniqueIds = jsonPlaceholderPosts.map(post => ({
        ...post,
        id: `json-${post.id}`
    }));

    const prismaPostsWithUniqueIds = prismaPosts.map(post => ({
        id: `prisma-${post.id}`,
        title: post.title,
        body: post.body,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }));

    const combinedPosts = [...jsonPlaceholderPostsWithUniqueIds, ...prismaPostsWithUniqueIds];

    return combinedPosts;
}