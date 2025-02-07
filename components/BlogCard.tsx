import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { truncateText } from "@/lib/truncateText";
import { calculateReadingTime } from "@/lib/calculateReadingTime";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const readingTime = calculateReadingTime(post.body || "");

  return (
    <article className="flex max-w-xl flex-col  justify-between">
      <div className="card drop-shadow-2xl sm:max-w-sm mb-10">
        <div className="card-body">
          <Link href={`/blog/${post.id}`}>
            <h5 className="dark:text-primary-content text-base-content card-title mb-2.5 font-extrabold">
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
            <p className="font-bold dark:text-primary-content text-base-content">
              {post.author || "Unknown Author"}
            </p>
          </div>
          <div className="mb-4 flex gap-7">
            <time
              dateTime={post.createdAt || ""}
              className="text-gray-500 text-[0.75rem]"
            >
              {new Date(post.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <div className="flex items-center gap-1">
              <span className="icon-[solar--book-2-bold-duotone]"></span>
              <p className="text-gray-500 text-[0.75rem]">{readingTime}</p>
            </div>
          </div>{" "}
          <p>{truncateText(post.body, 150)}</p>
        </div>
        <figure>
          <Image
            src="https://cdn.flyonui.com/fy-assets/components/card/image-7.png"
            alt="headphone"
            width={1000}
            height={1000}
          />
        </figure>
      </div>
    </article>
  );
}
