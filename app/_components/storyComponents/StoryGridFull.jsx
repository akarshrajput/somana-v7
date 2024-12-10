"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Book, BookmarkSimple, Sparkle, StarFour } from "@phosphor-icons/react";
import { Rubik } from "next/font/google";
import axios from "axios";
import { ArrowBigRight } from "lucide-react";
import {
  BookOpen,
  Pen,
  SealCheck,
  Spinner,
} from "@phosphor-icons/react/dist/ssr";
import LoadingSmall from "../main/LoadingSmall";
import CommonNav from "../main/CommonNav";
import SpinnerMain from "../main/SpinnerMain";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Fetch blogs with a simple query
const fetchBlogs = async () => {
  const res = await axios.get(`/api/v1/blogs?limit=10`);
  // console.log(res.data.data.blogs);
  return res?.data?.data;
};

const StoryGridFull = () => {
  // Update to use single argument object format for useQuery
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["blogs2"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="dark:bg-black dark:text-stone-50 mx-auto">
      {/* {isSuccess ? <CommonNav /> : ""} */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {isLoading ? (
          <SpinnerMain />
        ) : (
          data?.blogs?.map((post) => (
            <Link
              href={`/story/${post.slug}`}
              key={post.id}
              className="flex cursor-pointer hover:bg-neutral-100 duration-300 p-2 gap-1 rounded-lg dark:hover:bg-neutral-800"
            >
              <div>
                <div className="flex items-center gap-2">
                  <img
                    alt="Author"
                    src={post.author.photo}
                    className="h-6 w-6 rounded-full"
                  />
                  <div className="text-xs font-medium flex items-center gap-1">
                    <Link
                      href={`p/${post.author.userName}`}
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

                <Link
                  href={`/story/${post.slug}`}
                  className={`${rubik.className}`}
                >
                  <h3 className="font-semibold text-sm mb-1 leading-5">
                    {post.heading.length > 40
                      ? `${post.heading.substring(0, 40)}...`
                      : post.heading}
                  </h3>
                  <p className="text-xs">
                    {post.description.length > 80
                      ? `${post.description.substring(0, 80)}...`
                      : post.description}
                  </p>
                </Link>
              </div>

              {/* <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 line-clamp-3">
                {post.description.substring(0, 100)}...
              </p> */}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StoryGridFull;
