import Link from "next/link";
import { ThemeButton } from "../buttons/ThemeBtn";
import Logo from "./Logo";
import {
  ApplePodcastsLogo,
  Book,
  BookOpen,
  Circle,
  MusicNote,
  MusicNotes,
} from "@phosphor-icons/react/dist/ssr";
import { auth } from "@/app/_lib/auth";
import ProfileMenu from "../userComponents/ProfileMenu";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ServicesNav } from "./ServicesNav";
import SpecialHeaderLinks from "./SpecialHeaderLinks";

const Header = async () => {
  const session = await auth();
  return (
    <div className="bg-white dark:bg-black z-50 fixed w-full py-2 px-2 flex items-center gap-2 text-sm">
      <div>
        <Logo />
      </div>

      <SearchInput />
      <ServicesNav />
      <SpecialHeaderLinks />
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:block">
          <div className="ml-auto flex items-center gap-2">
            <Link href="/story">
              <Button variant="outline" size="icon">
                <BookOpen weight="bold" />
              </Button>
            </Link>
            {/* <Link href="/music">
              <Button variant="outline" size="icon">
                <MusicNote weight="bold" />
              </Button>
            </Link> */}
            <Link href="/podcast">
              <Button variant="outline" size="icon">
                <ApplePodcastsLogo weight="bold" />
              </Button>
            </Link>
            <Link href="/upload">
              <Button variant="outline" className="px-2">
                Upload
              </Button>
            </Link>
            <ThemeButton />
          </div>
        </div>
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
