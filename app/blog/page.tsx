import BlogCard from "@/components/blogCard/BlogCard";

const Blog = () => {
  return (
    <main className="grid gap-4 px-16 py-16 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </main>
  );
};

export default Blog;
