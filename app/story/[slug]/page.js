import React from "react";
import AddComment from "@/app/_components/storyComponents/AddComment";
import BlogComments from "@/app/_components/storyComponents/BlogComments";
import BlogDate from "@/app/_components/storyComponents/BlogDate";
import DeleteButton from "@/app/_components/storyComponents/DeleteBlog";
import LikeButton from "@/app/_components/storyComponents/LikeButton";
import { Pen, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Lora } from "next/font/google";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FacebookIcon, Linkedin, Share2, TwitterIcon } from "lucide-react";
import IframeViewer from "@/app/_components/storyComponents/IframeViewer";
import StoryAdsHeader from "@/app/_components/googleads/story_ads_header";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

// Fetch blog data
const fetchBlogData = async (slug) => {
  const session = await auth();
  const userId = session?.user?.userId;
  let api = session?.user
    ? `${process.env.HOSTNAME}/api/v1/blogs/slug/${slug}?userId=${userId}`
    : `${process.env.HOSTNAME}/api/v1/blogs/slug/${slug}`;

  try {
    const res = await fetch(api, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch blog data");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
};

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const blog = await fetchBlogData(slug);

  if (!blog) {
    return {
      title: "Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: `${blog.heading} - My Blog`,
    description: blog.description,
    openGraph: {
      title: blog.heading,
      description: blog.description,
      images: [blog.featuredImage],
      url: `${process.env.HOSTNAME}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.heading,
      description: blog.description,
      image: blog.featuredImage,
    },
  };
}

// Main Page Component
const Page = async ({ params, searchParams }) => {
  const session = await auth();
  const userId = session?.user?.userId || "";
  const { slug } = params;

  const blog = await fetchBlogData(slug);

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  const pathname = Object.values(params).join("/");
  const queryString = new URLSearchParams(searchParams).toString();

  const pageURL = `${protocol}://${host}/${pathname}${
    queryString ? `?${queryString}` : ""
  }`;
  console.log(pageURL);

  if (!blog) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p className="text-gray-500">
          The blog you are looking for does not exist.
        </p>
      </div>
    );
  }

  const contentWithLineBreaks = blog.content;
  const modifiedContent = contentWithLineBreaks.replace(/target="_blank"/g, "");

  return (
    <div className="flex justify-center mt-16 py-6 px-4">
      <div className="w-[700px]">
        {blog.genre !== "top-10" && (
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="font-semibold text-lg text-gray-700 dark:text-gray-300">
                    {blog?.genre}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This story belongs to the {blog?.genre} category.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="ml-auto">
              <BlogDate
                className="font-semibold text-xs text-gray-600 dark:text-gray-400"
                blogDate={blog.createdAt}
              />
            </div>
          </div>
        )}

        <div className="my-4">
          <h1 className="font-bold text-3xl leading-tight text-gray-900 dark:text-gray-100">
            {blog.heading}
          </h1>
        </div>

        {blog.genre === "top-10" ? (
          <div className="ml-2 flex gap-2 items-center">
            <p className="font-semibold bg-gray-100 dark:bg-gray-800 p-1 px-2 rounded-md text-sm">
              {blog.numberOfViews} views
            </p>
            {(userId === blog.author._id ||
              session?.user?.role === "admin") && (
              <div className="flex ml-auto items-center gap-2">
                <Link href={`/story/edit/${blog?._id}`}>
                  <Button variant="outline">
                    <Pen weight="bold" />
                    Edit
                  </Button>
                </Link>
                <DeleteButton blogId={blog._id} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <img
              className="w-8 h-8 rounded-md"
              src={blog.author.photo}
              alt={`${blog.author.name} profile`}
            />
            <Link href={`/profile/${blog?.author?.userName}`}>
              <Button className="px-1 text-sm" variant="link">
                {blog.author.name}
              </Button>
            </Link>
            {blog.author.verified && (
              <SealCheck weight="fill" className="text-blue-500" />
            )}
            <div className="ml-2 flex gap-3 items-center">
              {blog?.genre === "Notes" ? (
                ""
              ) : (
                <LikeButton
                  blogId={slug}
                  initialLikes={blog.likes}
                  userId={userId}
                />
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm font-medium  dark:text-gray-400">
                      {blog?.numberOfViews} views
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{blog?.numberOfViews} people have viewed this story.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm font-medium  dark:text-gray-400">
                      {blog?.readTime} min read
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You can read this story in {blog?.readTime} minutes.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {(userId === blog.author._id ||
              session?.user?.role === "admin") && (
              <div className="flex ml-auto items-center gap-2">
                {blog?._id ? (
                  <Link href={`/story/edit/${blog?._id}`}>
                    <Button variant="outline">
                      <Pen weight="bold" />
                      Edit
                    </Button>
                  </Link>
                ) : null}
                <DeleteButton blogId={blog?._id} />
              </div>
            )}
          </div>
        )}

        <div>
          <StoryAdsHeader />
        </div>

        {blog?.genre === "Notes" ? (
          ""
        ) : (
          <div className="mt-4 flex justify-center">
            <img
              src={blog.featuredImage}
              className="w-full rounded-md shadow-md"
              alt="Featured"
            />
          </div>
        )}
        {blog?.genre === "Notes" ? (
          ""
        ) : (
          <div className="my-4 text-gray-700 dark:text-gray-300">
            {blog?.description}
          </div>
        )}

        {blog?.fileLinks?.length > 0 ? (
          <IframeViewer fileLinks={blog.fileLinks} />
        ) : (
          ""
        )}

        <div className="flex gap-10">
          <div className="flex flex-col gap-4 mt-10">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                pageURL
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300 cursor-pointer" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                pageURL
              )}&text=Check this out!`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300 cursor-pointer" />
            </a>

            <a
              href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                pageURL
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300 cursor-pointer" />
            </a>

            {/* <button
              onClick={() => {
                navigator.clipboard.writeText(pageURL);
                alert("Link copied to clipboard!");
              }}
              className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              <Share2 />
            </button> */}
          </div>
          <div
            className={` my-10 custom-link text-lg text-gray-800 dark:text-gray-200`}
            dangerouslySetInnerHTML={{ __html: modifiedContent }}
          ></div>
        </div>

        <div id="container-2a23f44d708874fffe31b49e3f5cd5d5"></div>

        <div className="mt-20">
          {session?.user ? (
            <AddComment
              session={session}
              hostname={process.env.HOSTNAME}
              blogId={blog._id}
              authorId={userId}
            />
          ) : (
            <p className="text-gray-500">Log in to comment on this blog.</p>
          )}
          <BlogComments hostname={process.env.HOSTNAME} blogId={blog._id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
