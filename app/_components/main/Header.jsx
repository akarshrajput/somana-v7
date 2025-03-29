import Link from "next/link";
import { ThemeButton } from "../buttons/ThemeBtn";
import Logo from "./Logo";
import { auth } from "@/app/_lib/auth";
import ProfileMenu from "../userComponents/ProfileMenu";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import { ServicesNav } from "./ServicesNav";
import SpecialHeaderLinks from "./SpecialHeaderLinks";
import NavActivity from "./NavActivity";

const Header = async () => {
  const session = await auth();
  return (
    <div className="border-b flex dark:bg-black bg-white justify-center">
      <div className="max-w-[1250px] px-2 w-full py-2 flex flex-col text-sm">
        {/* <HeaderEvent /> */}
        <div className="flex items-center gap-2">
          <div>
            <Logo />
          </div>
          <SearchInput />
          <ServicesNav />
          <SpecialHeaderLinks />
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:block">
              <div className="ml-auto flex items-center gap-2">
                {/* <Link
                  className="hidden lg:block"
                  target="_blank"
                  href="https://forms.gle/mRRhFPSVLmSwNMCs9"
                >
                  <Button variant="outline" className="p-2">
                    Contribute <ForwardIcon />
                  </Button>
                </Link> */}
                {/* <Link href="/story">
                  <Button variant="outline" size="icon">
                    <BookOpen weight="bold" />
                  </Button>
                </Link>
                <Link href="/music">
                  <Button variant="outline" size="icon">
                    <MusicNote weight="bold" />
                  </Button>
                </Link>
                <Link href="/podcast">
                  <Button variant="outline" size="icon">
                    <ApplePodcastsLogo weight="bold" />
                  </Button>
                </Link> */}
                <NavActivity />
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
      </div>
    </div>
  );
};
export default Header;
