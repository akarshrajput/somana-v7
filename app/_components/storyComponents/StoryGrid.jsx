"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { BookOpen, SealCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";
import SpinnerMain from "../main/SpinnerMain";

// Fetch blogs with a simple query
const fetchBlogs = async () => {
  const res = await axios.get(`/api/v1/blogs?limit=9`);
  return res?.data?.data;
};

const StoryGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="dark:bg-black dark:text-white">
      {isLoading ? (
        <SpinnerMain />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data?.blogs?.map((post) => (
            <Link
              href={`/story/${post.slug}`}
              key={post.id}
              className="flex flex-col rounded-lg shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-36 bg-gray-100 dark:bg-neutral-800">
                <img
                  src={post.featuredImage}
                  alt={post.heading}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <BookOpen
                    weight="bold"
                    className="size-5 text-neutral-900 bg-white dark:text-neutral-100 dark:bg-neutral-800 p-1 rounded-md"
                  />
                  {post.usedAI && (
                    <Sparkle
                      weight="fill"
                      className="size-5 text-yellow-500 bg-white dark:bg-neutral-800 p-1 rounded-full"
                    />
                  )}
                </div>
              </div>

              <div className="p-2">
                <h3 className="font-semibold mb-1 text-sm text-gray-800 dark:text-gray-100 truncate">
                  {post.heading}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <img
                    alt="Author"
                    src={post.author.photo}
                    className="h-8 w-8 rounded-md"
                  />
                  <div className="flex flex-col">
                    <Link
                      href={`profile/${post.author.userName}`}
                      className="font-medium hover:underline"
                    >
                      {post.author.name}
                    </Link>
                    <div className="flex items-center gap-1">
                      {post.author.verified && (
                        <SealCheck
                          className="size-4 text-blue-500"
                          weight="fill"
                        />
                      )}
                      <span>in</span>
                      <Link
                        href={`/blogs/topic/${post.genre}`}
                        className="hover:underline"
                      >
                        {post.genre}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryGrid;
