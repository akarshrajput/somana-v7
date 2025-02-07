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
import { Button } from "@/components/ui/button";
import ChannelList from "./_components/channelComponents/ChannelList";
import { auth } from "./_lib/auth";
import StoryList from "./_components/storyComponents/StoryList";
import Footer from "./_components/main/Footer";

export default async function Home() {
  const session = await auth();
  return (
    <div className="px-2 py-2 flex justify-center mt-16">
      <div className="w-[1200px]">
        <div className="grid sm:grid-cols-7 sm:gap-8">
          <div className="col-span-5 flex">
            <div className="flex flex-col gap-4">
              <StoryGrid />
            </div>
          </div>
          <div className="col-span-2 border-neutral-200">
            <div className="flex flex-col gap-6">
              {/* <div className="flex items-center gap-2 font-medium text-sm flex-wrap">
              
                <Link href="/upload">
                  <Button>
                    Upload <Upload weight="bold" />
                  </Button>
                </Link>
                <Link href="/top-10">
                  <Button variant="outline">
                    Top 10 <TrendUp weight="bold" />
                  </Button>
                </Link>
              </div> */}

              {/* <div className="font-medium border-neutral-200 flex-col">
                <MusicGrid apiEndpoint="/api/v1/podcasts?limit=6" />
              </div> */}
              <div className="font-medium flex-col">
                <PodcastGrid api="/api/v1/podcasts?limit=9" />
              </div>
            </div>
          </div>
        </div>
        <div className="my-8">
          <StoryGridFull />
        </div>
        <div>
          <ChannelList />
        </div>
        {/* {session ? ( */}
        <div className="mt-6">
          <StoryList session={session} />
        </div>
        {/* ) : null} */}
        {/* <div className="my-8">
          <MusicList />
        </div> */}

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
