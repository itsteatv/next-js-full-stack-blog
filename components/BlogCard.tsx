"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { truncateText } from "@/lib/truncateText";
import { BlogPost } from "@/lib/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";
import userPostDeletion from "@/actions/userPostDeletion";
import adminPostDeletion from "@/actions/adminPostDeletion";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { user, isAuthenticated, getPermission } =
    useKindeBrowserClient();

  const isAuthor = isAuthenticated && user && user.id === post.userId;

  const adminDeletePermission = getPermission("admin::post::delete");
  const canAdminDelete =
    isAuthenticated && user && adminDeletePermission?.isGranted;

  console.log(post);
  console.log(canAdminDelete);

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

  return (
    <Card className="max-w-[24rem] overflow-hidden bg-transparent">
      <CardHeader floated={false} shadow={false} color="transparent">
        <div className="relative w-full h-[250px] overflow-hidden">
          <Image
            src="https://placehold.co/600x320.svg?text=fallback"
            alt="fallback image"
            fill
            onError={(event) => {
              event.target.src =
                "https://placehold.co/600x320.svg?text=fallback";
            }}
          />
        </div>
      </CardHeader>
      <CardBody className="flex-grow overflow-hidden">
        <Typography variant="h5" className="text-white font-Archivo">
          {post.author}
        </Typography>
        <Typography variant="h5" className="text-white font-Archivo">
          {post.title}
        </Typography>
        <Typography
          variant="paragraph"
          className="mt-3 font-light font-FiraSans text-white"
        >
          {truncateText(post.body, 100)}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Link href={`/blog/${post.id}`}>
          <Button
            label="Read More"
            type="button"
            className="rounded-md bg-white/10 px-3.5 py-2.5 mt-6 text-sm font-semibold text-white"
          />
        </Link>
        {!canAdminDelete && isAuthor && (
          <Button
            label="Delete"
            type="button"
            className="rounded-md bg-red-500 px-3.5 py-2.5 mt-6 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
            onClick={handleUserDeletePost}
          />
        )}

        {canAdminDelete && (
          <Button
            label="Delete"
            type="button"
            className="rounded-md bg-red-500 px-3.5 py-2.5 mt-6 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
            onClick={handleAdminDeletePost}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
