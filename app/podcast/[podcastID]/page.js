import PodcastPlayer from "@/app/_components/podcastComponents/PodcastPlayer";

const page = ({ params }) => {
  return (
    <div className="px-2 flex justify-center mt-2">
      <div className="w-full">
        <div className="grid grid-cols-7 gap-12">
          <div className="col-span-7 flex">
            <div className="flex w-full flex-col gap-4">
              <PodcastPlayer params={params} />
            </div>
          </div>
          {/* <div className="col-span-2 mt-12 border-neutral-200">
            <div className="flex flex-col gap-8">
              <div className="font-medium border-neutral-200 flex-col">
                <MusicGrid api="/api/v1/music?limit=12" />
                Test
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default page;
