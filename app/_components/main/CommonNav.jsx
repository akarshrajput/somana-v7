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
        Buy Web Projects
        <TrendUp weight="bold" />
      </BaseLink>

      <BaseLink href="music/playlist">
        SRS <TrendUp weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist">
        Custom Projects <TrendUp weight="bold" />
      </BaseLink>
      <BaseLink href="music/playlist">
        Join our Team <TrendUp weight="bold" />
      </BaseLink>
    </div>
  );
};
export default CommonNav;
