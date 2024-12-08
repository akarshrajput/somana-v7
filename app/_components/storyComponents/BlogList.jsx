"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Link from "next/link";
// import { Image, Spinner } from "@chakra-ui/react";
import { BookmarkSimple, Sparkle, StarFour } from "@phosphor-icons/react";
import { Nunito, Nunito_Sans, Rubik } from "next/font/google";
import axios from "axios";
// import LoadingMain from "../main/Loading";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fetchBlogs = async ({ pageParam = 1 }) => {
  const res = await axios.get(`/api/v1/blogs?limit=6&page=${pageParam}`);
  return res.data;
};

const BlogsList = () => {
  const loaderRef = useRef(null); // Ref for the scroll observer

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["blogs"], // Cache key for the query
      queryFn: fetchBlogs,
      getNextPageParam: (lastPage, pages) => {
        // Check if there's more data based on the last page
        if (lastPage.data.blogs.length < 6) {
          return undefined; // No more data
        }
        return pages.length + 1; // Increment page number
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // Load next page
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <div className="dark:bg-black dark:text-stone-50 mx-auto lg:max-w-[90rem] px-6 lg:px-8">
        <div className="mx-auto flex flex-col max-w-2xl gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none">
          {data?.pages.map((page) =>
            page.data.blogs.map((post, index) => (
              <div
                key={`${post.id}-${index}`}
                className="flex items-center gap-4"
              >
                <article className="flex max-w-xl flex-col items-start justify-between">
                  <div className="relative flex items-center gap-x-2">
                    <img
                      alt="Authors"
                      src={post.author.photo}
                      className="h-6 w-6 rounded-full"
                    />
                    <div className="text-sm flex font-medium items-center gap-1">
                      <Link
                        className="hover:underline"
                        href={`p/${post.author.userName}`}
                      >
                        {post.author.name}
                      </Link>
                      in
                      <Link
                        href={`/blogs/topic/${post.genre}`}
                        className="hover:underline"
                      >
                        {post.genre}
                      </Link>
                    </div>
                    {post.usedAI && (
                      <Sparkle className="text-black size-3" weight="fill" />
                    )}
                  </div>

                  <div className="group relative">
                    <h3 className="mt-3 text-xl font-bold leading-6 hover:text-stone-600 dark:group-hover:text-white">
                      <Link
                        href={`/story/${post.slug}`}
                        className={`${rubik.className}`}
                      >
                        <span className="absolute inset-0" />
                        {post.heading}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 ">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-2 flex w-full">
                    <StarFour weight="fill" className="text-yellow-500" />
                    <div className="ml-auto">
                      <BookmarkSimple weight="bold" />
                    </div>
                  </div>
                </article>

                {/* <Image
                  boxSize="200px"
                  src={post?.featuredImage}
                  alt="Featured"
                  objectFit="cover"
                  className="rounded-md ml-auto"
                /> */}
                <img src={post?.featuredImage} className="aspect-square h-32" />
              </div>
            ))
          )}
          {(isLoading || isFetchingNextPage) && <p>Loading</p>}
          <div ref={loaderRef} className="h-10"></div> {/* Loader element */}
        </div>
      </div>
    </div>
  );
};

export default BlogsList;
