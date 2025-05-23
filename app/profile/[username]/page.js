import { UserProfileTabSwitcher } from "@/app/_components/userComponents/UserProfileTabSwitcher";

const Page = async ({ params }) => {
  return (
    <div className="flex flex-col items-center mt-2">
      <div className="w-full">
        <UserProfileTabSwitcher username={params.username} />
      </div>
    </div>
  );
};

export default Page;
