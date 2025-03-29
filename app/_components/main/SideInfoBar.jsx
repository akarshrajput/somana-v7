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
import TrendingStories from "../storyComponents/TrendingStories";

const SideInfoBar = () => {
  return (
    <nav className="flex text-sm mt-2 flex-col gap-2">
      <TrendingStories />
    </nav>
  );
};
export default SideInfoBar;
