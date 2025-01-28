import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { truncateText } from "@/lib/truncateText";

interface BlogCardProps {
  post: BlogPost;
}

const categoryColors: { [key: string]: string } = {
  Technology: "#1E88E5",
  Health: "#E91E63",
  Travel: "#FF9800",
  Education: "#8E24AA",
  Lifestyle: "#4CAF50",
  // Business: "#FF5722",
  // Food: "#795548",
  // Art: "#F44336",
  // Science: "#009688",
  // Fashion: "#9C27B0",
  // Sports: "#3F51B5",
  Uncategorized: "#9E9E9E",
};

export default function BlogCard({ post }: BlogCardProps) {
  console.log(post);

  return (
    <article className="flex max-w-xl flex-col items-start justify-between mb-16">
      <div className="flex items-center flex-col mb-5">
        <div className="relative flex items-center gap-x-2">
          <Image
            src="https://placehold.co/40x40.svg?text=A&font=source-sans-pro"
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
          </div>
        </div>
        <div>
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
        </div>
      </div>

      <div className="group relative mb-6">
        <h3 className="text-lg font-semibold leading-6 dark:text-white group-hover:text-gray-300 duration-300">
          <Link href={`/blog/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="ml-2 mt-2 line-clamp-3 text-[0.75rem] leading-6 dark:text-gray-200">
          {truncateText(post.body, 150)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs mt-5">
        {post.categories?.length ? (
          post.categories.map((category) => (
            <p
              key={category.id}
              style={{
                backgroundColor:
                  categoryColors[category.name] ||
                  categoryColors["Uncategorized"],
              }}
              className="relative z-10 rounded-full px-3 py-1.5 font-medium cursor-pointer duration-300 dark:text-black"
            >
              # {category.name}
            </p>
          ))
        ) : (
          <span
            style={{
              backgroundColor: categoryColors["Uncategorized"],
              color: "#555",
            }}
            className="relative z-10 rounded-full px-3 py-1.5 font-medium"
          >
            Uncategorized
          </span>
        )}
      </div>
    </article>
  );
}
