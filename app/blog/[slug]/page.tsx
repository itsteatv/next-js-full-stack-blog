import { fetchPosts } from "@/lib/api/fetchPosts";
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
    return <p className="text-white text-center">Post not found</p>;
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
        <h3 className="text-white mt-6 font-Archivo">{post.author}</h3>
        <h1 className="text-white mt-6 font-Archivo">{post.title}</h1>
        <div className="mt-6 text-white">
          <p>{post.body}</p>
        </div>
        <div className="mt-6 text-white">
          {/* <p>{formateDate(posts.publishedAt)}</p> */}
        </div>
      </div>
    </section>
  );
};

export default SinglePost;
