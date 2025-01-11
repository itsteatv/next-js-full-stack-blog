  import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { truncateText } from "@/lib/truncateText";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.createdAt || ""} className="text-gray-500">
          {new Date(post.createdAt || "").toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        {post.categories?.length ? (
          <p className="relative z-10 rounded-full dark:bg-gray-50 bg-gray-200 px-3 py-1.5 font-medium dark:text-black dark:hover:bg-gray-300 hover:bg-gray-300 duration-300">
            {post.categories[0].name}
          </p>
        ) : (
          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
            Uncategorized
          </span>
        )}
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 dark:text-white group-hover:text-gray-300 duration-300">
          <Link href={`/blog/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 dark:text-gray-200">
          {truncateText(post.body, 150)}
        </p>
      </div>

      <div className="relative mt-8 flex items-center gap-x-4">
        <Image
          src="https://placehold.co/40x40.svg?text=Author"
          alt={post.author || "Unknown Author"}
          width={40}
          height={40}
          className="h-8 w-8 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold dark:text-white">
            <Link href={`/authors/${post.userId}`}>
              <span className="absolute inset-0" />
              {post.author || "Unknown Author"}
            </Link>
          </p>
          {/* <p className="text-gray-600">{post.authorRole || "Contributor"}</p> */}
        </div>
      </div>
    </article>
  );
}
