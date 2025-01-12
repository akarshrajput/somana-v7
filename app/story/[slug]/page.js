import React from "react";
import AddComment from "@/app/_components/storyComponents/AddComment";
import BlogComments from "@/app/_components/storyComponents/BlogComments";
import BlogDate from "@/app/_components/storyComponents/BlogDate";
import DeleteButton from "@/app/_components/storyComponents/DeleteBlog";
import LikeButton from "@/app/_components/storyComponents/LikeButton";
import {
  LineVertical,
  SealCheck,
  ShareNetwork,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Lora, Rubik } from "next/font/google";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FacebookIcon,
  Linkedin,
  Share,
  Share2,
  Twitter,
  TwitterIcon,
} from "lucide-react";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

// Fetch blog data
const fetchBlogData = async (slug) => {
  const session = await auth();
  const userId = session?.user?.userId;
  let api = "";
  if (
    session?.user
      ? (api = `${process.env.HOSTNAME}/api/v1/blogs/slug/${slug}?userId=${userId}`)
      : (api = `${process.env.HOSTNAME}/api/v1/blogs/slug/${slug}`)
  )
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
  const blogDate = new Date(blog.createdAt);

  return (
    <div className="flex justify-center mt-16 py-6 px-4 dark:bg-black dark:text-stone-50">
      <div className="w-[700px]">
        {blog.genre === "top-10" ? (
          ""
        ) : (
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="px-0 font-semibold text-lg">{blog?.genre}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>There story belongs to {blog?.genre} category.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="ml-auto">
              <BlogDate
                className="font-semibold text-xs"
                blogDate={blog.createdAt}
              />
            </div>
          </div>
        )}
        <div className="my-4 font-medium">
          <h1 className={`font-semibold  text-3xl leading-tight`}>
            {blog.heading}
          </h1>
        </div>

        {/* Author Info */}
        {blog.genre === "top-10" ? (
          <div className="ml-2 flex gap-2 items-center">
            <p className="font-semibold bg-neutral-100 p-1 px-2 rounded-md text-sm">
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
              <Button className="px-1" variant="link">
                {blog.author.name}
              </Button>
            </Link>
            {blog.author.verified && <SealCheck weight="fill" />}
            <div className="ml-2 flex gap-3 items-center">
              <LikeButton
                blogId={slug}
                initialLikes={blog.likes}
                userId={userId}
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="px-0 font-medium text-sm">
                      {blog?.numberOfViews} views
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{blog?.numberOfViews} people view this story.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="px-0 font-medium text-sm">
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

        {/* Featured Image */}
        <div className="mt-4 flex justify-center">
          <img
            src={blog.featuredImage}
            className="w-full max-w-8xl rounded-sm"
            alt="Featured"
          />
        </div>
        <div className="my-4">{blog.description}</div>

        {/* Blog Content */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-4 mt-10 ">
            <Share2
              weight="bold"
              className="size-8 p-1.5 bg-neutral-100 rounded-sm"
            />
            <FacebookIcon
              weight="bold"
              className="size-8 p-1.5 bg-neutral-100 rounded-sm"
            />
            <TwitterIcon
              weight="bold"
              className="size-8 p-1.5 bg-neutral-100 rounded-sm"
            />
            <Linkedin className="size-8 p-1.5 bg-neutral-100 rounded-sm" />
          </div>
          <div
            className="my-10 custom-link text-lg dark:text-stone-50 text-stone-700"
            dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
          ></div>
        </div>

        {/* Comments Section */}
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
