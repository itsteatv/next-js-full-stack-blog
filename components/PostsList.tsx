"use client";

import { useState, useEffect, useCallback } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";
import { fetchPosts } from "@/actions/fetchPosts";
import Loading from "@/app/[locale]/blog/loading";
import toast from "react-hot-toast";
import Image from "next/image";

const PostsList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const fetchedPosts = await fetchPosts(0, 10);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts. Please try again later.");
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="max-w-6xl mx-auto">
      {loading && (
        <div className="text-center font-bold text-white mt-16 flex items-center justify-center min-h-screen">
          <Loading color="white" />
        </div>
      )}

      {!loading && error && (
        <div className="text-center font-bold text-white mt-16">
          <p>Failed to load posts. Please try again later.</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center font-bold text-white mt-16">
          <p>No posts found.</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <main className="px-16 py-16 sm:max-w-lg md:max-w-4xl mx-auto">
          <div className="flex items-center flex-col gap-y-16">
            <div className="gap-y-2">
              {posts.map((post) => (
                <div key={post.id}>
                  <div className="relative w-full h-64 mb-5">
                    <Image
                      src="https://placehold.co/100x200?text=NextJs+Blog&font=source-sans-pro"
                      alt="title"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PostsList;
