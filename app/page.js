import Image from "next/image";
import StoryGrid from "./_components/storyComponents/StoryGrid";
import PodcastGrid from "./_components/podcastComponents/PodcastGrid";
import MusicGrid from "./_components/musicComponents/MusicGrid";
import BaseLink from "./_components/buttons/BaseLink";
import SparklesText from "@/components/ui/sparkles-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import MusicList from "./_components/musicComponents/MusicList";
import StoryGridFull from "./_components/storyComponents/StoryGridFull";
import {
  Binoculars,
  HandPalm,
  TrendUp,
  Upload,
} from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <div className="px-2 py-2 flex justify-center mt-20">
      <div className="w-[1200px]">
        <div className="grid grid-cols-7 gap-12">
          <div className="col-span-5 flex">
            <div className="flex flex-col gap-4">
              <StoryGrid />
            </div>
          </div>
          <div className="col-span-2 border-neutral-200">
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2 font-medium text-sm flex-wrap">
                {/* <Link
                  href="/upload"
                  className="py-1.5 px-2 bg-green-600 text-white  rounded-md flex items-center gap-1"
                >
                  Explore <Binoculars weight="bold" />
                </Link> */}
                <Link
                  href="/upload"
                  className="py-1.5 px-2 bg-neutral-200 hover:scale-105 duration-300  rounded-md flex items-center gap-1"
                >
                  Upload <Upload weight="bold" />
                </Link>
                <Link
                  href="/top-10"
                  className="py-1.5 px-2 bg-neutral-200 hover:scale-105 duration-300  rounded-md flex items-center gap-1"
                >
                  Top 10 <TrendUp weight="bold" />
                </Link>
              </div>
              <div className="font-medium flex-col">
                <PodcastGrid api="/api/v1/podcasts?limit=6" />
              </div>
              <div className="font-medium border-neutral-200 flex-col">
                <MusicGrid apiEndpoint="/api/v1/podcasts?limit=6" />
              </div>
            </div>
          </div>
        </div>
        <div className="my-8">
          <StoryGridFull />
        </div>
        <div className="my-8">
          <MusicList />
        </div>
      </div>
    </div>
  );
}
