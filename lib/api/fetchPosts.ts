import { BlogPost } from "../types"
import slugify from 'slugify';

export const fetchPosts = async function (): Promise<BlogPost[]> {
    const response = await fetch(`https://newsapi.org/v2/everything?q=reactjs&language=en&sortBy=relevancy&pagesize=10`, { headers: { 'X-Api-Key': `${process.env.NEWS_API_KEY}` }, next: { revalidate: 3600 } })

    if (!response.ok) {
        throw new Error("Failed to fetch posts")
    }

    const data = await response.json()

    const articles = data.articles.map((article: Omit<BlogPost, 'id'>) => {
        const slug = slugify(article.title, { lower: true, strict: true });
        return { ...article, id: slug };
    });

    console.log(articles);

    return articles as BlogPost[];
}