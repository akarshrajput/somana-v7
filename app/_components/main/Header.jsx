import Link from "next/link";
import { ThemeButton } from "../buttons/ThemeBtn";
import Logo from "./Logo";
import { Circle } from "@phosphor-icons/react/dist/ssr";
import { auth } from "@/app/_lib/auth";
import ProfileMenu from "../userComponents/ProfileMenu";

const Header = async () => {
  const session = await auth();
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-black z-50 fixed w-[800px] m-4 rounded-full py-1.5 px-2 flex items-center gap-1 text-sm shadow-sm">
      <div className="mr-4">
        <Logo />
      </div>
      <Link
        href="/story"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm dark:hover:bg-neutral-800"
      >
        Story
      </Link>
      <Link
        href="/music"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm dark:hover:bg-neutral-800"
      >
        Music
      </Link>
      <Link
        href="/podcast"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm dark:hover:bg-neutral-800"
      >
        Podcast
      </Link>
      {/* <Link
        href="/movie"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm"
      >
        Movie
      </Link> */}
      <Link
        href="/anime"
        className="duration-300 flex items-center gap-1 font-medium text-red-700  hover:bg-neutral-100 py-2 px-2 rounded-sm dark:hover:bg-neutral-800 dark:text-red-500"
      >
        Live
        <Circle weight="fill" />
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <input placeholder="Search" className="border rounded-full p-2 px-4" />
        <ThemeButton />
        {/* <Link
          href="/upload"
          className="border hover:bg-neutral-100 rounded-full p-2"
        >
          <ArrowUp className="size-5" />
        </Link> */}
        {session?.user?.userId ? (
          <ProfileMenu session={session} />
        ) : (
          <Link
            href="/login"
            className="bg-black flex items-center gap-1 text-white font-medium py-2 px-3 rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
