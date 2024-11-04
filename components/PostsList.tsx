"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";
import Input from "./Input";
import { fetchPosts } from "@/actions/fetchPosts";
import Loading from "@/app/blog/loading";
import Button from "./Button";
import { searchPosts } from "@/actions/searchPosts";
import debounce from "lodash/debounce";
import toast from "react-hot-toast";

const PostsList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const take = 10;

  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      let newPosts: BlogPost[];

      if (searchQuery) {
        newPosts = await searchPosts(searchQuery, skip, take);
      } else {
        newPosts = await fetchPosts(skip, take);
      }

      setPosts((prevPosts) => {
        const allPosts = [...prevPosts, ...newPosts];
        const uniquePosts = Array.from(
          new Set(allPosts.map((post) => post.id))
        ).map((id) => allPosts.find((post) => post.id === id));
        return uniquePosts as BlogPost[];
      });

      if (newPosts.length < take) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts. Please try again later.");
      setError(true);
    }
    setLoading(false);
  }, [searchQuery, skip, take]);

  useEffect(() => {
    if (posts.length === 0 && !searchQuery) {
      loadPosts();
    }
  }, [loadPosts, searchQuery, posts.length]);

  const handleSearch = () => {
    setSkip(0);
    setPosts([]);
    setHasMore(true);
    loadPosts();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + take);
    loadPosts();
  };

  useEffect(() => {
    if (!searchQuery) {
      loadPosts();
    }
  }, [searchQuery, loadPosts]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-24 max-w-2xl mx-auto flex items-center gap-6">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded"
          label="Search"
        />
      </div>

      {loading && posts.length === 0 && (
        <div className="text-center font-bold text-white mt-16 flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      )}

      {!loading && posts.length === 0 && !error && (
        <div className="text-center font-bold text-white mt-16">
          <p>No posts found.</p>
        </div>
      )}

      {!error && posts.length > 0 && (
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

      {hasMore && !loading && !error && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded"
            label={loading ? <Loading /> : "Load More Posts"}
          />
        </div>
      )}

      {!hasMore && !loading && !error && (
        <p className="text-center mt-8">No more posts available.</p>
      )}
    </div>
  );
};

export default PostsList;
