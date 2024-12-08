import { MonitorArrowUp } from "@phosphor-icons/react/dist/ssr";
import BaseLink from "../_components/buttons/BaseLink";
import StoryGridMain from "../_components/storyComponents/StoryGridMain";

const page = () => {
  return (
    <div className="px-2 mt-24 flex justify-center">
      <div className="grid grid-cols-4 w-[1200px] gap-2">
        <div className="col-span-3 flex justify-center">
          <div>
            <StoryGridMain />
          </div>
        </div>

        <div className="w-72">
          <div className="sticky top-16 font-medium flex-col">
            {/* <SideNav /> */}
            <div className="flex items-center gap-2 flex-wrap">
              <BaseLink href="/upload">
                Upload
                <MonitorArrowUp weight="bold" />
              </BaseLink>
              <BaseLink href="/story/write">Write Story</BaseLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
