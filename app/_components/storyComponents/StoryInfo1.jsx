import { BookOpen, SealCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const StoryInfo1 = ({ post }) => {
  const time = new Date(post.createdAt);
  const diffInMs = Date.now() - time.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return (
    <Link
      href={`/story/${post.slug}`}
      key={post.id}
      className="flex w-full flex-col rounded-sm overflow-hidden transition-shadow duration-300"
    >
      <div className="relative h-32 bg-neutral-100 dark:bg-neutral-800">
        <img
          src={post.featuredImage}
          alt={post.heading}
          className="w-full h-full object-cover"
        />

        {diffInHours < 12 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-sm shadow-md">
            <span>New</span>
          </div>
        )}

        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          <BookOpen
            weight="bold"
            className="text-white w-5 h-5 bg-gradient-to-r from-red-400 to-red-600 p-1 shadow-sm rounded-sm"
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
            className="h-7 w-7 rounded-sm"
          />
          <div className="flex flex-col">
            <Link
              href={`profile/${post.author.userName}`}
              className="font-medium text-xs hover:underline"
            >
              {post.author.name}
            </Link>
            <div className="flex items-center gap-1">
              {post.author.verified && (
                <SealCheck className="size-4 text-blue-500" weight="fill" />
              )}
              <span className="text-xs">in</span>
              <Link
                href={`/blogs/topic/${post.genre}`}
                className="hover:underline text-xs font-medium"
              >
                {post.genre}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default StoryInfo1;
