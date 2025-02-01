import React from "react";
import AddComment from "@/app/_components/storyComponents/AddComment";
import BlogComments from "@/app/_components/storyComponents/BlogComments";
import BlogDate from "@/app/_components/storyComponents/BlogDate";
import DeleteButton from "@/app/_components/storyComponents/DeleteBlog";
import LikeButton from "@/app/_components/storyComponents/LikeButton";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Lora } from "next/font/google";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FacebookIcon, Linkedin, Share2, TwitterIcon } from "lucide-react";
import IframeViewer from "@/app/_components/storyComponents/IframeViewer";

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
const Page = async ({ params }) => {
  const session = await auth();
  const userId = session?.user?.userId || "";
  const { slug } = params;

  const blog = await fetchBlogData(slug);

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

  return (
    <div className="flex justify-center mt-16 py-6 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
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
                <DeleteButton blogId={blog._id} />
              </div>
            )}
          </div>
        )}

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
            <Share2 className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300" />
            <FacebookIcon className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-blue-600" />
            <TwitterIcon className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-blue-500" />
            <Linkedin className="size-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-blue-700" />
          </div>
          <div
            className={` my-10 custom-link text-lg text-gray-800 dark:text-gray-200`}
            dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
          ></div>
        </div>

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
