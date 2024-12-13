import Link from "next/link";
import { ThemeButton } from "../buttons/ThemeBtn";
import Logo from "./Logo";
import {
  ApplePodcastsLogo,
  Book,
  Circle,
  MusicNote,
  MusicNotes,
} from "@phosphor-icons/react/dist/ssr";
import { auth } from "@/app/_lib/auth";
import ProfileMenu from "../userComponents/ProfileMenu";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const Header = async () => {
  const session = await auth();
  return (
    <div className="bg-white dark:bg-black z-50 fixed w-full py-2 px-2 flex items-center gap-1 text-sm">
      <div className="mr-2">
        <Logo />
      </div>

      <SearchInput />
      <div className="ml-auto flex items-center gap-2">
        {/* <Link
          href="/story"
          className="duration-300 p-1 px-2 border rounded-md hover:bg-neutral-100 flex items-center gap-1"
        >
          Story
          <Book className="size-4" />
        </Link>
        <Link
          href="/music"
          className="duration-300 p-1 px-2 border rounded-md hover:bg-neutral-100 flex items-center gap-1"
        >
          Music
          <MusicNotes className="size-4" />
        </Link>
        <Link
          href="/podcast"
          className="duration-300 p-1 px-2 border rounded-md hover:bg-neutral-100 flex items-center gap-1"
        >
          Podcast
          <ApplePodcastsLogo className="size-4" />
        </Link>
        <Link
          href="/anime"
          className="duration-300 p-1 border rounded-md hover:bg-neutral-100 flex items-center gap-1"
        >
          Live
          <Circle weight="fill" />
        </Link> */}
        <Link href="/upload">
          <Button variant="outline" className="px-3">
            Upload <Upload />
          </Button>
        </Link>
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
          <Link href="/login">
            <Button> Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
