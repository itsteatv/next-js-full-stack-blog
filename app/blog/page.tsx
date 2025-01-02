import { Suspense } from "react";
import PostsList from "@/components/PostsList";
import Loading from "./loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const Blog = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PostsList />
      </Suspense>
    </>
  );
};

export default Blog;
