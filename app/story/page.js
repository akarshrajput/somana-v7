import BlogsList from "../_components/storyComponents/BlogList";

const page = () => {
  return (
    <div className="px-2 flex justify-center mt-4">
      <div className="grid grid-cols-4 w-[1200px] gap-2">
        <div className="col-span-3 flex justify-center">
          <div>
            <BlogsList />
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
