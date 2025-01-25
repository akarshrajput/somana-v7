import MusicListMain from "../_components/musicComponents/MusicListMain";

const page = () => {
  return (
    <div className="px-2 mt-24 flex justify-center">
      <div className="grid grid-cols-4 w-[1200px] gap-2">
        <div className="col-span-3 flex justify-center">
          <div>
            <MusicListMain />
          </div>
        </div>

        <div className="w-72">
          <div className="sticky top-16 font-medium flex-col">
            {/* <SideNav /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
