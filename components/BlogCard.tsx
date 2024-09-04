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
import { formateDate } from "@/lib/formateDate";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="max-w-[24rem] overflow-hidden bg-transparent">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
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
        <div className="flex items-center -space-x-3">
          <Link href={`/blog/${post.id}`}>
            <Button
              label="Read More"
              type="button"
              className="rounded-md bg-white/10 px-3.5 py-2.5 mt-6 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
            />
          </Link>
        </div>
        {/* <Typography
          variant="small"
          className="font-light font-FiraSans text-white"
        >
          {formateDate(post.publishedAt)}
        </Typography> */}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
