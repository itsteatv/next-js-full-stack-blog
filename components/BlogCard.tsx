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
        <Image
          src={post.urlToImage}
          alt={post.urlToImage ? post.urlToImage : "fallback image"}
          width={450}
          height={450}
          onError={(event) => {
            event.target.srcset =
              "https://placehold.co/600x320.svg?text=fallback";
          }}
        />
      </CardHeader>
      <CardBody className="flex-grow h-40 overflow-hidden">
        <Typography variant="h5" className="text-white font-Archivo">
          {post.title}
        </Typography>
        <Typography
          variant="paragraph"
          className="mt-3 font-light font-FiraSans text-white"
        >
          {truncateText(post.description, 100)}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Link href="/blog/posts">
            <Button
              content="Read more"
              type="button"
              ripple={true}
              size="sm"
              variant="outlined"
              className="hover:bg-black hover:text-white duration-300 font-Archivo text-white border-white"
            />
          </Link>
        </div>
        <Typography
          variant="small"
          className="font-light font-FiraSans text-white"
        >
          {post.publishedAt}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
