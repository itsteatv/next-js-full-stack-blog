import { fetchPosts } from "@/lib/api/fetchPosts";
import { BlogPost } from "@/lib/types";
import Image from "next/image";
import { formateDate } from "@/lib/formateDate";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  );

  if (!response.ok) {
    console.error("Failed to fetch posts", response.status, response.text);
  }

  const post: BlogPost = await response.json();

  if (!post) return <p className="text-white text-center">post not found</p>;

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
