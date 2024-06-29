"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";

const BlogCard = () => {
  return (
    <Card className="max-w-[24rem] overflow-hidden bg-transparent">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
          width={450}
          height={450}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="text-white font-Archivo">
          UI/UX Review Check
        </Typography>
        <Typography
          variant="paragraph"
          className="mt-3 font-light font-FiraSans text-white"
        >
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others.
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
          January 10
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
