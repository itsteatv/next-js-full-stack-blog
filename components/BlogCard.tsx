"use client";

import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { truncateText } from "@/lib/truncateText";
import { BlogPost } from "@/lib/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";
import userPostDeletion from "@/actions/userPostDeletion";
import adminPostDeletion from "@/actions/adminPostDeletion";
import Dropdown from "./Dropdown";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  console.log(post);

  const { user, isAuthenticated, getPermission } = useKindeBrowserClient();
  const router = useRouter();

  const isAuthor = isAuthenticated && user && user.id === post.userId;

  const adminDeletePermission = getPermission("all::permissions");
  const canAdminDelete =
    isAuthenticated && user && adminDeletePermission?.isGranted;

  const handleAdminDeletePost = async () => {
    if (confirm("Are you sure you want to delete your post?")) {
      try {
        await adminPostDeletion(post.id);
        toast.success("Post deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the post.");
        console.error("Delete post error:", error);
      }
    }
  };

  const handleUserDeletePost = async () => {
    if (confirm("Are you sure you want to delete your post?")) {
      try {
        await userPostDeletion(post.id);
        toast.success("Post deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the post.");
        console.error("Delete post error:", error);
      }
    }
  };

  const handleEditPost = () => {
    router.push(`/blog/${post.id}/edit`);
  };

  const dropdownItems = [];
  if (canAdminDelete) {
    dropdownItems.push(
      {
        label: "Admin Delete Post",
        onClick: handleAdminDeletePost,
        icon: TrashIcon,
      },
      {
        label: "Admin Edit Post",
        onClick: handleEditPost,
        icon: PencilIcon,
      }
    );
  } else if (isAuthor) {
    dropdownItems.push(
      {
        label: "Delete Your Post",
        onClick: handleUserDeletePost,
        icon: TrashIcon,
      },
      {
        label: "Edit Your Post",
        onClick: handleEditPost,
        icon: PencilIcon,
      }
    );
  }

  return (
    <div className="max-w-[24rem] bg-transparent">
      <div>
        <div className="relative w-full h-[250px] overflow-hidden">
          <Image
            src="https://placehold.co/600x320.svg?text=fallback"
            alt="fallback image"
            fill
          />
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        <p className="dark:text-white font-Archivo">{post.author}</p>
        <p className="dark:text-white font-Archivo">{post.title}</p>
        <p className="dark:text-gray-400 font-Archivo">
          Categories:{" "}
          {post.categories?.length
            ? post.categories.map((category) => category.name).join(", ")
            : "Uncategorized"}
        </p>
        <p className="mt-3 font-light font-FiraSans dark:text-white">
          {truncateText(post.body, 100)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Link href={`/blog/${post.id}`}>
          <Button
            label="Read More"
            type="button"
            className="rounded-md dark:bg-white/10 bg-gray-100 px-3.5 py-2.5 mt-6 text-sm font-semibold dark:text-white"
          />
        </Link>
        {(isAuthor || canAdminDelete) && (
          <div className="flex items-center flex-col justify-center mb-16">
            <Dropdown buttonLabel="Actions" items={dropdownItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
