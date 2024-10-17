"use client";

import { useState, useEffect, useRef } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";
import Input from "./Input";
import { fetchPosts } from "@/actions/fetchPosts";
import Loading from "@/app/blog/loading";
import Button from "./Button";

const PostsList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const take = 10;

  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const newPosts = await fetchPosts(skip, take);

      setPosts((prevPosts) => {
        const allPosts = [...prevPosts, ...newPosts];
        const uniquePosts = Array.from(new Set(allPosts.map((post) => post.id)))
          .map((id) => allPosts.find((post) => post.id === id));
        return uniquePosts as BlogPost[];
      });

      if (newPosts.length < take) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, [skip]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + take);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-24 max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPosts([]);
            setSkip(0);
            setSearchQuery(e.target.value);
            setHasMore(true);
          }}
          className="w-full px-5 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {posts.length === 0 ? (
        <div className="text-center font-bold text-white mt-16">
          <p>No posts found.</p>
        </div>
      ) : (
        <main className="px-16 py-16 sm:max-w-lg md:max-w-4xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard
                ref={index === posts.length - 1 ? lastPostRef : null}
                key={post.id}
                post={post}
              />
            ))}
          </div>
        </main>
      )}
      {hasMore && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded"
            label={loading ? <Loading /> : "Load More Posts"}
          />
        </div>
      )}

      {!hasMore && <p className="text-center mt-8">No more posts available.</p>}
    </div>
  );
};

export default PostsList;
