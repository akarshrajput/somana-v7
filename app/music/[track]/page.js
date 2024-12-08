import MusicGrid from "@/app/_components/musicComponents/MusicGrid";
import MusicPlayer from "@/app/_components/musicComponents/MusicPlayer";

const page = ({ params }) => {
  return (
    <div className="px-2 flex justify-center mt-12">
      <div className="w-[1200px]">
        <div className="grid grid-cols-7 gap-12">
          <div className="col-span-5 flex">
            <div className="flex w-full flex-col gap-4">
              <MusicPlayer musicId={params.track} />
            </div>
          </div>
          <div className="col-span-2 mt-12 border-neutral-200">
            <div className="flex flex-col gap-8">
              <div className="font-medium border-neutral-200 flex-col">
                <MusicGrid api="/api/v1/music?limit=12" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="my-8 px-2">
          <MusicList api="/api/v1/music?limit=20" />
        </div> */}
      </div>
    </div>
  );
};
export default page;
