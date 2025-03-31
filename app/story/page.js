import { MonitorArrowUp } from "@phosphor-icons/react/dist/ssr";
import BaseLink from "../_components/buttons/BaseLink";
import StoryGridMain from "../_components/storyComponents/StoryGridMain";
import StoryGrid from "../_components/storyComponents/StoryGrid";

const page = () => {
  return (
    <div className="w-full flex justify-center mt-2">
      <div className="w-[1250px]">
        <div>{/* <CommonNav /> */}</div>
        <div className="grid sm:grid-cols-7 sm:gap-4 gap-0">
          <div className="col-span-full flex">
            <div className="flex flex-col gap-4">
              <StoryGrid />
            </div>
          </div>
          {/* <div className="col-span-2 border-neutral-200">
            <div className="flex flex-col gap-6">
              <div className="font-medium flex-col">
                <PodcastGrid api="/api/v1/podcasts?limit=9" />
              </div>
              <ShareReferral />
              <div className="w-60 border lg:w-full">
                <HorizontalAd />
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="my-8">
          <StoryGridFull />
        </div> */}
      </div>
    </div>
  );
};
export default page;
