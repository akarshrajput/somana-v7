import Link from "next/link";
import { ThemeButton } from "../buttons/ThemeBtn";
import SparklesText from "@/components/ui/sparkles-text";
import Logo from "./Logo";
import { Circle, Keyhole } from "@phosphor-icons/react/dist/ssr";
import { auth } from "@/app/_lib/auth";
import ProfileMenu from "../userComponents/ProfileMenu";

const Header = async () => {
  const session = await auth();
  return (
    <div className="border border-neutral-200 bg-white z-50 fixed w-[800px] m-4 rounded-2xl py-1.5 px-2 flex items-center gap-1 text-sm shadow-sm">
      <div className="mr-4">
        <Logo />
      </div>
      <Link
        href="/story"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm"
      >
        Story
      </Link>
      <Link
        href="/music"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm"
      >
        Music
      </Link>
      <Link
        href="/podcast"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm"
      >
        Podcast
      </Link>
      <Link
        href="/movie"
        className="duration-300 font-medium hover:bg-neutral-100 py-2 px-2 rounded-sm"
      >
        Movie
      </Link>
      <Link
        href="/anime"
        className="duration-300 flex items-center gap-1 font-medium text-red-700  hover:bg-neutral-100 py-2 px-2 rounded-sm"
      >
        Live
        <Circle weight="fill" />
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <ThemeButton />
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
