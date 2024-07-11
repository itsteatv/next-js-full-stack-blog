import { BlogPost } from "../types"

export const fetchPosts = async function (limit: number): Promise<BlogPost[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)

    if (!response.ok) {
        throw new Error("Failed to fetch posts")
    }

    return response.json()
}