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

    const combinedPosts = [...jsonPlaceholderPosts, ...prismaPosts];

    console.log(combinedPosts);

    return combinedPosts;
}