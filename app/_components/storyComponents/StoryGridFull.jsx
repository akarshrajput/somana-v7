"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import StoryGridFullSkeleton from "./StoryGridFullSkeleton";

// Fetch blogs with a simple query
const fetchBlogs = async () => {
  const res = await axios.get(`/api/v1/blogs?limit=20`);
  return res?.data?.data;
};

const StoryGridFull = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs2"],
    queryFn: fetchBlogs,
  });

  // If loading, show the skeleton loader
  if (isLoading) {
    return (
      <div className="dark:bg-black w-full dark:text-stone-50">
        <StoryGridFullSkeleton />
      </div>
    );
  }

  return (
    <div className="dark:bg-black w-full dark:text-stone-50">
      <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {data?.blogs?.map((post) => (
          <Link
            href={`/story/${post.slug}`}
            key={post.id}
            className="block rounded-md border bg-white dark:bg-neutral-900 p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Author and Genre Section */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-2">
                <img
                  alt="Author"
                  src={post.author.photo}
                  className="h-4 w-4 rounded-md"
                />
                <span className="text-sm font-medium">
                  <Link
                    href={`profile/${post.author.userName}`}
                    className="hover:underline text-xs"
                  >
                    {post.author.name}
                  </Link>
                </span>
                {post.author.verified && (
                  <SealCheck className="text-blue-500 w-4 h-4" weight="fill" />
                )}
              </div>
              <span className="text-xs font-medium text-gray-500">in</span>
              <Link
                href={`/blogs/topic/${post.genre}`}
                className="text-xs font-medium text-black hover:underline"
              >
                {post.genre}
              </Link>
            </div>

            {/* Title and Description */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
              {post.heading}
            </h3>
            <p className="text-xs text-gray-700 dark:text-gray-400 line-clamp-3">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoryGridFull;
