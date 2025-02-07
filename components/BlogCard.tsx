import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { truncateText } from "@/lib/truncateText";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  console.log(post);

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="card sm:max-w-sm mb-10">
        <div className="card-body">
          <Link href={`/blog/${post.id}`}>
            <h5 className="text-white card-title mb-2.5 font-extrabold">
              {post.title}
            </h5>
          </Link>
          <div className="avatar flex items-center gap-2 mb-4">
            <div className="size-10 rounded-full">
              <Image
                width={1000}
                height={1000}
                className="w-auto"
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                alt="avatar"
              />
            </div>
            <p className="font-bold text-white">
              {post.author || "Unknown Author"}
            </p>
          </div>
          <div className="mb-4">
            <time
              dateTime={post.createdAt || ""}
              className="text-gray-500 text-[0.75rem] relative -top-1"
            >
              {new Date(post.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>{" "}
          <p>{truncateText(post.body, 150)}</p>
        </div>
        <figure>
          <Image
            src="https://cdn.flyonui.com/fy-assets/components/card/image-7.png"
            alt="headphone"
            width={1000}
            height={1000}
            className="w-auto"
          />
        </figure>
      </div>
    </article>
  );
}
