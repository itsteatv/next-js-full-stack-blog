import { Suspense } from "react";
import PostsList from "@/components/PostsList";
import Loading from "./loading";

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
