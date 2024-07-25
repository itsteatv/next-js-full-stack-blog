import { BlogPost } from "../types"

export const fetchPosts = async function (): Promise<BlogPost[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`);

    if (!response.ok) {
        throw new Error("Failed to fetch posts")
    }

    const data: BlogPost[] = await response.json();

    return data;
}