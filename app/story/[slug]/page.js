import React from "react";
import AddComment from "@/app/_components/storyComponents/AddComment";
import BlogComments from "@/app/_components/storyComponents/BlogComments";
import BlogDate from "@/app/_components/storyComponents/BlogDate";
import DeleteButton from "@/app/_components/storyComponents/DeleteBlog";
import LikeButton from "@/app/_components/storyComponents/LikeButton";
import { auth } from "@/app/_lib/auth";
import { LineVertical, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Lora, Rubik } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
});

// Fetch blog data
const fetchBlogData = async (slug) => {
  try {
    const res = await fetch(
      `${process.env.HOSTNAME}/api/v1/blogs/slug/${slug}`,
      { cache: "no-store" }
    );
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
    <div className="flex justify-center mt-20 py-6 px-4 dark:bg-black dark:text-stone-50">
      <div className="w-[700px]">
        {/* Blog Header */}
        <div className="flex items-center gap-1">
          <p className="font-semibold text-green-600">{blog.genre}</p>
          <LineVertical weight="bold" />
          <BlogDate
            className="font-semibold text-sm"
            blogDate={blog.createdAt}
          />
        </div>
        <div className="my-4 font-medium">
          <h1 className={`font-semibold  text-3xl leading-tight`}>
            {blog.heading}
          </h1>
        </div>

        {/* Author Info */}
        <div className="flex flex-wrap items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={blog.author.photo}
            alt={`${blog.author.name} profile`}
          />
          <p className="font-semibold">{blog.author.name}</p>
          {blog.author.verified && <SealCheck weight="fill" />}
          <div className="ml-2 flex gap-2 items-center">
            <LikeButton
              blogId={slug}
              initialLikes={blog.likes}
              userId={userId}
            />

            <p className="font-semibold bg-neutral-100 p-1 px-2 rounded-md text-sm">
              {blog.numberOfViews} views
            </p>

            <p className="font-semibold bg-neutral-100 p-1 px-2 rounded-md text-sm">
              {blog.readTime} min read
            </p>
          </div>
          {userId === blog.author._id && (
            <div className="flex items-center gap-2">
              <DeleteButton blogId={blog._id} />
            </div>
          )}
        </div>

        {/* Featured Image */}
        <div className="mt-4 flex justify-center">
          <img
            src={blog.featuredImage}
            className="w-full max-w-8xl rounded-sm"
            alt="Featured"
          />
        </div>

        {/* Blog Content */}
        <div
          className="my-10 text-lg dark:text-stone-50 text-stone-700"
          dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
        ></div>

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