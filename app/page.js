import Image from "next/image";
import StoryGrid from "./_components/storyComponents/StoryGrid";
import PodcastGrid from "./_components/podcastComponents/PodcastGrid";
import MusicGrid from "./_components/musicComponents/MusicGrid";
import BaseLink from "./_components/buttons/BaseLink";
import SparklesText from "@/components/ui/sparkles-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import MusicList from "./_components/musicComponents/MusicList";

export default function Home() {
  return (
    <div className="px-2 flex justify-center mt-24">
      <div className="w-[1200px]">
        <div className="grid grid-cols-7 gap-12">
          <div className="col-span-5 flex">
            <div className="flex flex-col gap-4">
              <StoryGrid />
            </div>
          </div>
          <div className="col-span-2 border-neutral-200">
            <div className="flex flex-col gap-8">
              <div className="font-medium flex-col">
                <PodcastGrid api="/api/v1/podcasts?limit=6" />
              </div>
              <div className="font-medium border-neutral-200 flex-col">
                <MusicGrid apiEndpoint="/api/v1/podcasts?limit=6" />
              </div>
            </div>
          </div>
        </div>
        <div className="my-8 px-2">
          <MusicList api="/api/v1/music?limit=20" />
        </div>
      </div>
    </div>
  );
}
