"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { BookOpen, Sparkle, SealCheck } from "@phosphor-icons/react";
import { Rubik } from "next/font/google";
import SpinnerMain from "../main/SpinnerMain";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const StoryList = ({ session }) => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/api/v1/blogs?authorID=${session.user.userId}`
        );
        setBlogs(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <SpinnerMain />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="dark:bg-black dark:text-stone-50 mx-auto">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {blogs?.blogs?.map((post) => (
          <Link
            href={`/story/${post.slug}`}
            key={post.id}
            className="flex border rounded-md cursor-pointer flex-col duration-300 p-1.5 gap-1"
          >
            <div className="flex items-center gap-2">
              <img
                alt="Author"
                src={post.author.photo}
                className="h-6 w-6 rounded-md"
              />
              <div className="text-xs font-medium flex items-center gap-1">
                <Link
                  href={`profile/${post.author.userName}`}
                  className="hover:underline"
                >
                  {post.author.name}
                </Link>
                {post.author.verified && (
                  <SealCheck className="text-black size-3" weight="fill" />
                )}
                in
                <Link
                  href={`/blogs/topic/${post.genre}`}
                  className="hover:underline"
                >
                  {post.genre}
                </Link>
              </div>
            </div>

            <Link href={`/story/${post.slug}`} className={`${rubik.className}`}>
              <h3 className="font-semibold text-sm truncate mb-1 leading-5">
                {post.heading}
              </h3>
            </Link>

            <div className="relative">
              <div className="flex justify-center w-full overflow-hidden h-40 md:h-40 rounded-md">
                <img
                  src={post?.featuredImage}
                  className="w-full hover:scale-105 duration-300 h-full object-cover rounded-md"
                  alt="Featured Image"
                />
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <BookOpen
                  weight="bold"
                  className="size-6 text-black bg-neutral-100 p-1 rounded-md"
                />
                {post.usedAI && (
                  <Sparkle
                    className="size-6 text-yellow-700 bg-neutral-100 p-1 rounded-md"
                    weight="fill"
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
