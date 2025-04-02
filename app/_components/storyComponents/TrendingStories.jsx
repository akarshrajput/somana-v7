"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

const TrendingStories = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const { data } = await axios.get("/api/v1/blogs/trending");
        setBlogs(data?.data?.blogs || []);
      } catch (err) {
        setError("Failed to fetch trending blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBlogs();
  }, []);

  if (loading)
    return <p className="text-gray-500">Loading trending blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="rounded-sm">
      <h2 className="font-medium mb-3 px-2 flex items-center gap-2">
        Trending <TrendingUp size={16} />
      </h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No trending blogs found</p>
      ) : (
        <ul className="">
          {blogs.map((blog) => (
            <Link
              href={`/story/${blog.slug}`}
              key={blog._id}
              className="flex flex-col p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 gap-1.5 rounded-sm"
            >
              <div className="flex gap-1 items-center">
                <img
                  src={blog.author.photo || "/default-avatar.png"}
                  alt={blog.author.name}
                  className="w-5 h-5 rounded-md"
                />
                <div>
                  <p className="font-base">{blog.title}</p>
                  <p className="text-xs">
                    <span className="font-medium">{blog.author.name}</span>
                  </p>
                </div>
              </div>
              <div className="text-xs font-medium truncate">{blog.heading}</div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingStories;
