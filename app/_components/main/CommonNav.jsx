import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  Camera,
  DotsThreeOutline,
  EyeSlash,
  FolderLock,
  ImageBroken,
  LinuxLogo,
  MonitorArrowUp,
  MusicNote,
  Newspaper,
  Play,
  Rabbit,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import BaseLink from "../buttons/BaseLink";

const CommonNav = () => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <BaseLink href="/upload">
        Upload
        <MonitorArrowUp weight="bold" />
      </BaseLink>

      <BaseLink href="music/playlist">
        Top 10 <TrendUp weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist" className="bg-red-600">
        Videos <Play weight="fill" />
      </BaseLink>
      <BaseLink href="hello">
        Share <FolderLock weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist">
        Playlist <MusicNote weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist">
        Kids <Rabbit weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist">
        Real Ghost <LinuxLogo weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist">
        Viral <Camera weight="bold" />
      </BaseLink>

      <BaseLink href="music/playlist">
        News <Newspaper weight="bold" />
      </BaseLink>
    </div>
  );
};
export default CommonNav;
