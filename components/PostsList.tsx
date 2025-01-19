"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";
import Input from "./Input";
import { fetchPosts } from "@/actions/fetchPosts";
import Loading from "@/app/[locale]/blog/loading";
import Button from "./Button";
import { searchPosts } from "@/actions/searchPosts";
import toast from "react-hot-toast";

const PostsList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const take = 10;

  const initialLoad = useRef(true);
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
    if (initialLoad.current && !searchQuery) {
      loadPosts();
      initialLoad.current = false;
    }
  }, [loadPosts, searchQuery]);

  const handleSearch = () => {
    setIsSearching(true);
    setSkip(0);
    setPosts([]);
    setHasMore(true);
    loadPosts();
    setIsSearching(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    if (newQuery === "") {
      setSkip(0);
      setPosts([]);
      setHasMore(true);
      initialLoad.current = true;
    }
  };

  const handleClear = async () => {
    setIsClearing(true);
    try {
      setSearchQuery("");
      setSkip(0);
      setPosts([]);
      setHasMore(true);
      initialLoad.current = true;
      await loadPosts();
    } catch (error) {
      console.error("Error clearing posts:", error);
      toast.error("Failed to clear posts. Please try again.");
    } finally {
      setIsClearing(false);
    }
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-24 mb-14 max-w-2xl mx-auto flex items-center gap-2 justify-center 450>=:flex 450>=:flex-col">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="block rounded-md border-0 px-5 py-2 pl-3 dark:text-white bg-transparent ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:focus:ring-2 dark:focus:ring-inset dark:focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div className="flex 450>=:flex gap-2">
          <Button
            className="inline-flex 
          rounded-lg bg-blue-500 px-5 py-[0.6rem] text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleSearch}
            label="Search"
            disabled={isSearching}
            isLoading={isSearching}
            pendingContent="Searching..."
            loadingComponent={
              <div className="relative w-6 h-6">
                <Loading />
              </div>
            }
          />
          {searchQuery && (
            <Button
              className="inline-flex items-center justify-center rounded-lg bg-gray-500 px-5 py-[0.6rem] text-sm font-medium text-white shadow-lg transition duration-300 ease-in-out transform hover:bg-gray-600 hover:scale-105 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75 disabled:cursor-not-allowed disabled:bg-gray-400"
              onClick={handleClear}
              label="Clear"
              disabled={isClearing}
              isLoading={isClearing}
              pendingContent="Clearing..."
              loadingComponent={
                <div className="relative w-6 h-6">
                  <Loading />
                </div>
              }
            />
          )}
        </div>
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
          <div className="flex items-center flex-col gap-y-16">
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
        <p className="text-center mt-8 mb-8">No more posts available.</p>
      )}
    </div>
  );
};

export default PostsList;
