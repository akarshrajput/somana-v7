import AddComment from "@/app/_components/storyComponents/AddComment";
// import AlertDialogComponent from "@/app/_components/storyComponents/AlertDialog";
import BlogComments from "@/app/_components/storyComponents/BlogComments";
import BlogDate from "@/app/_components/storyComponents/BlogDate";
import LikeButton from "@/app/_components/storyComponents/LikeButton";
import { auth } from "@/app/_lib/auth";
import { LineVertical, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Rubik } from "next/font/google";
import React from "react";

const hostname = process.env.HOSTNAME;

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

const fetchBlogData = async (slug) => {
  try {
    const res = await fetch(
      `${process.env.HOSTNAME}/api/v1/blogs/slug/${slug}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch blog data");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
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
      url: `${hostname}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.heading,
      description: blog.description,
      image: blog.featuredImage,
    },
  };
}

const Page = async ({ params }) => {
  const session = await auth();
  let userId = session ? session.user.userId : "";

  const ipResponse = await fetch(`${process.env.HOSTNAME}/api/v1/ip`, {
    cache: "no-store",
  });
  const { slug } = await params;
  const blog = await fetchBlogData(slug);

  const contentWithLineBreaks = blog.content;

  const dateString = blog.createdAt;
  const dateObj = new Date(dateString);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear());
  const oneThirdContent = blog.content.substring(0, blog.content.length / 3);

  return (
    <>
      <div className="flex justify-center mt-20 py-6 px-4 dark:bg-black dark:text-stone-50">
        <div className="w-[700px]">
          <div>
            {/* <BlogInfoPopUp session={session} blog={blog} /> */}
            <div className="flex items-center gap-1 ">
              <p className="font-bold text-green-600">{blog.genre}</p>
              <LineVertical weight="bold" />
              <BlogDate
                className="font-bold text-sm"
                blogDate={blog.createdAt}
              />
            </div>

            <div className="my-4 font-medium">
              <p className={`font-bold text-3xl leading-tight`}>
                {blog.heading}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <img
              className="w-8 h-8 rounded-full"
              src={blog?.author?.photo}
              alt={`${blog.author.name} profile image`}
            />
            <p className="font-semibold">{blog.author.name}</p>
            {blog.author.verified && (
              <SealCheck
                className="text-black dark:bg-black dark:text-stone-50"
                weight="fill"
              />
            )}
            <div className="ml-2 flex flex-wrap gap-0 items-center">
              <LikeButton
                blogId={slug}
                initialLikes={blog.likes}
                userId={userId}
              />
              <LineVertical weight="bold" />
              <p className="font-semibold text-sm">
                {blog.numberOfViews} views
              </p>
              <LineVertical weight="bold" />
              <p className="font-semibold text-sm">{blog.readTime} min read</p>
            </div>
            {userId === blog.author._id && (
              <div className="md:ml-auto flex items-center gap-2">
                {/* <UpdateBlogButton blog={blog} /> */}

                {/* <AlertDialogComponent blogId={blog._id} /> */}
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <img
              src={blog.featuredImage}
              className="w-full max-w-8xl rounded-sm"
              alt="Featured image"
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="my-4  lg:w-full dark:bg-black dark:text-stone-50 border-stone-700 text-stone-600">
              {blog.description}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm underline">Photo Stock</p>
            {blog.collectedImages && blog.collectedImages.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {blog.collectedImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Collected image ${index + 1}`}
                    className="w-full max-w-xs rounded-sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div
              className={`hyphens-auto  text-sm md:text-lg overflow-hidden leading-loose mt-10 tracking-wider dark:bg-black dark:text-stone-50 text-stone-700  antialiased mb-10`}
              dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
            ></div>
          </div>
          <div className="lg:px-40 flex flex-col items-center"></div>
        </div>
      </div>
      <div className="flex mt-20 justify-center">
        <div className="w-full max-w-3xl pt-10 flex flex-col gap-4"></div>
      </div>
      <div className="flex mt-20 justify-center">
        <div className="w-[700px] pt-10 flex flex-col gap-4">
          {session?.user ? (
            <AddComment
              session={session}
              hostname={hostname}
              blogId={blog._id}
              authorId={userId}
            />
          ) : (
            // <UserLoginError>
            //   <p>Login to comment on this blog.</p>
            //   <LoginButton />
            // </UserLoginError>
            <p>Hi</p>
          )}
          <BlogComments hostname={hostname} blogId={blog._id} />
        </div>
      </div>
      {/* <div>
        <Footer />
      </div> */}
    </>
  );
};

export default Page;
