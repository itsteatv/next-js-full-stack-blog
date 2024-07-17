import { BlogPost } from "../types"

export const fetchPosts = async function (): Promise<BlogPost[]> {
    const response = await fetch(`https://newsapi.org/v2/everything?q=reactjs&language=en&sortBy=relevancy&pagesize=10`, { headers: { 'X-Api-Key': `${process.env.NEWS_API_KEY}` }, next: { revalidate: 3600 } })

    if (!response.ok) {
        throw new Error("Failed to fetch posts")
    }

    const data = await response.json()

    return data.articles as BlogPost[];
}