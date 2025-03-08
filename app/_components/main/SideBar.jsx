import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ApplePodcastsLogo,
  BookOpen,
  House,
  MagnifyingGlass,
  MusicNotesSimple,
  Upload,
  User,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const SideBar = () => {
  return (
    <nav className="flex text-sm mt-2  font-medium flex-col gap-2">
      <Link href="/">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <House weight="fill" />
          Home
        </Button>
      </Link>
      <Link href="/story">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <BookOpen weight="fill" />
          Story
        </Button>
      </Link>
      <Link href="/music">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <MusicNotesSimple weight="fill" />
          Music
        </Button>
      </Link>
      <Link href="/podcast">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <ApplePodcastsLogo weight="fill" />
          Podcast
        </Button>
      </Link>

      <Separator className="my-2" />
      <Link href="/me">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <User weight="fill" />
          Profile
        </Button>
      </Link>
      <Link href="/">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <MagnifyingGlass weight="bold" />
          User
        </Button>
      </Link>
      <Separator className="my-2" />
      <Link href="/upload">
        <Button
          variant="ghost"
          className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 justify-start bg-neutral-50"
        >
          <Upload weight="fill" />
          Upload
        </Button>
      </Link>
      {/* <p className="text-xs text-end mt-4">@somana</p> */}
    </nav>
  );
};
export default SideBar;
