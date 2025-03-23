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

const SideInfoBar = () => {
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
    </nav>
  );
};
export default SideInfoBar;
