import { Suspense } from "react";
import PostsList from "@/components/PostsList";
import Spinner from "@/components/Spinner";

const Blog = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <PostsList />
      </Suspense>
    </>
  );
};

export default Blog;
