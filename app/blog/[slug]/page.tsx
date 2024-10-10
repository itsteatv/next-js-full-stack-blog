import { fetchPosts } from "@/lib/api/fetchPosts";
import { formatDate } from "@/lib/formatDate";
import { BlogPost } from "@/lib/types";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const posts: BlogPost[] = await fetchPosts();

  const post = posts.find((post) => post.id === params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: `${post.author}'s post - ${post.title}`,
    description: post.body.slice(0, 150),
  };
};

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const posts: BlogPost[] = await fetchPosts();

  const post = posts.find((post) => post.id === params.slug);

  if (!post) {
    return (
      <p className="dark:text-white text-center text-bold">Post not found</p>
    );
  }

  return (
    <section className="p-8">
      <div className="text-center flex items-center justify-center flex-col">
        <Image
          src={"https://placehold.co/600x400.svg?text=fallback"}
          alt={post.title || "fallback image"}
          width={480}
          height={480}
          className="mt-20 rounded-md"
        />
        <div className="flex flex-row items-center mt-7 mb-7 gap-x-10">
          <p>{formatDate(post.createdAt)}</p>
          <h3 className="dark:text-white font-Archivo">{post.author}</h3>
        </div>
        <h1 className="dark:text-white mt-6 font-Archivo">{post.title}</h1>
        <div className="mt-4">
          <p className="dark:text-white text-lg font-bold">Categories:</p>
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.categories.map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 dark:text-white">
          <p>{post.body}</p>
        </div>
      </div>
    </section>
  );
};

export default SinglePost;
