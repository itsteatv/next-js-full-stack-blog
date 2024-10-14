"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";
import { searchPosts } from "@/actions/searchPosts";
import Input from "./Input";

const PostsList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await searchPosts(searchQuery);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {posts.length === 0 ? (
        <div className="text-center font-bold text-white mt-16">
          <p>No posts found.</p>
        </div>
      ) : (
        <main className="px-16 py-16 sm:max-w-lg md:max-w-4xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default PostsList;
