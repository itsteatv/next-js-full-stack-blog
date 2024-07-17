import BlogCard from "@/components/BlogCard";
import { fetchPosts } from "@/lib/api/fetchPosts";
import { BlogPost } from "@/lib/types";

const Blog = async () => {
  let posts: BlogPost[] = [];

  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="grid gap-4 px-16 py-16 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.source.id} post={post} />
      ))}
    </main>
  );
};

export default Blog;
