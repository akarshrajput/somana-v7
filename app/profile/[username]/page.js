import { UserProfileTabSwitcher } from "@/app/_components/userComponents/UserProfileTabSwitcher";

const Page = async ({ params }) => {
  return (
    <div className="flex flex-col items-center mt-16">
      <div className="w-[1200px] py-2">
        <UserProfileTabSwitcher username={params.username} />
      </div>
    </div>
  );
};

export default Page;
