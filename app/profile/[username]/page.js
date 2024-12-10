import UserProfile from "@/app/_components/userComponents/UserProfile";

const Page = async ({ params }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1200px] px-2 mt-4">
        <UserProfile username={params.username} />
      </div>
    </div>
  );
};

export default Page;
